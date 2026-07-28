'use client';

/**
 * Carte interactive OpenStreetMap via Leaflet.
 * Leaflet est chargé depuis un CDN au moment de l'affichage : aucune
 * dépendance npm à installer, et aucune clé d'API requise.
 *
 * Fonctions : marqueur de l'atelier, géolocalisation en direct de l'utilisateur,
 * distance à vol d'oiseau, temps de trajet estimé et lien d'itinéraire.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { site, mapsHref, directionsHref, telHref, displayPhone } from '@/lib/site';
import { SYMBOL_PATHS, SYMBOL_STROKE } from '@/lib/logo';
import { useLanguage } from './LanguageProvider';
import { IconArrow, IconBolt, IconPhone, IconPin } from './Icons';

const LEAFLET_VERSION = '1.9.4';
const CSS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
const JS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;

/** Charge Leaflet une seule fois, quel que soit le nombre de cartes */
function loadLeaflet() {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.L) return Promise.resolve(window.L);
  if (window.__leafletPromise) return window.__leafletPromise;

  window.__leafletPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_URL;
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = JS_URL;
    script.async = true;
    script.onload = () => (window.L ? resolve(window.L) : reject(new Error('Leaflet absent')));
    script.onerror = () => reject(new Error('Chargement Leaflet impossible'));
    document.head.appendChild(script);
  });

  return window.__leafletPromise;
}

/** Distance à vol d'oiseau en km (formule de haversine) */
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export default function LocationMap() {
  const { t, locale } = useLanguage();
  const m = t.contact.map;

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const userLayerRef = useRef(null);

  const [status, setStatus] = useState('loading'); // loading | ready | failed
  const [geoState, setGeoState] = useState('idle'); // idle | locating | done | error
  const [geoError, setGeoError] = useState('');
  const [userPos, setUserPos] = useState(null);

  /* ——— Initialisation de la carte ——— */
  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
          center: [site.geo.lat, site.geo.lng],
          zoom: site.geo.zoom,
          scrollWheelZoom: false,
          attributionControl: true,
        });
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap',
        }).addTo(map);

        // Marqueur de l'atelier — pastille rouge pulsée
        const key = SYMBOL_PATHS.map(
          (d) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${SYMBOL_STROKE}" stroke-linecap="round" stroke-linejoin="round"/>`
        ).join('');

        const icon = L.divIcon({
          className: '',
          html: `
            <span style="position:relative;display:block;width:40px;height:40px">
              <span style="position:absolute;inset:-8px;border-radius:14px;background:rgba(228,3,46,.26);animation:ksc-ping 2.2s cubic-bezier(.24,0,.38,1) infinite"></span>
              <span style="position:absolute;inset:0;border-radius:12px;background:#E4032E;border:2.5px solid #fff;box-shadow:0 8px 22px rgba(228,3,46,.5);display:flex;align-items:center;justify-content:center">
                <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">${key}</svg>
              </span>
            </span>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        L.marker([site.geo.lat, site.geo.lng], { icon, title: site.name })
          .addTo(map)
          .bindPopup(
            `<strong style="font-size:13px">${site.name}</strong><br/>
             <span style="font-size:12px;color:#4b60a0">${site.address.full[locale]}</span><br/>
             <a href="${mapsHref}" target="_blank" rel="noopener" style="font-size:12px;color:#E4032E;font-weight:600">${m.openMaps} →</a>`
          );

        // Le zoom molette ne s'active qu'après un clic — évite de piéger le scroll
        map.on('click', () => map.scrollWheelZoom.enable());
        map.on('mouseout', () => map.scrollWheelZoom.disable());

        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('failed'));

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ——— Géolocalisation en direct ——— */
  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGeoState('error');
      setGeoError(m.unsupported);
      return;
    }

    setGeoState('locating');
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude };
        setUserPos(pos);
        setGeoState('done');

        const L = window.L;
        const map = mapRef.current;
        if (!L || !map) return;

        if (userLayerRef.current) map.removeLayer(userLayerRef.current);

        const group = L.layerGroup().addTo(map);
        userLayerRef.current = group;

        const userIcon = L.divIcon({
          className: '',
          html: `
            <span style="position:relative;display:block;width:20px;height:20px">
              <span style="position:absolute;inset:-8px;border-radius:999px;background:rgba(59,130,246,.25);animation:ksc-ping 2s cubic-bezier(.24,0,.38,1) infinite"></span>
              <span style="position:absolute;inset:0;border-radius:999px;background:#2563eb;border:3px solid #fff;box-shadow:0 4px 14px rgba(37,99,235,.5)"></span>
            </span>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([pos.lat, pos.lng], { icon: userIcon })
          .addTo(group)
          .bindPopup(`<strong style="font-size:13px">${m.you}</strong>`);

        L.circle([pos.lat, pos.lng], {
          radius: Math.min(coords.accuracy || 200, 1200),
          color: '#2563eb',
          weight: 1,
          fillColor: '#2563eb',
          fillOpacity: 0.08,
        }).addTo(group);

        L.polyline(
          [
            [pos.lat, pos.lng],
            [site.geo.lat, site.geo.lng],
          ],
          { color: '#E4032E', weight: 2.5, dashArray: '6 8', opacity: 0.75 }
        ).addTo(group);

        map.fitBounds(
          [
            [pos.lat, pos.lng],
            [site.geo.lat, site.geo.lng],
          ],
          { padding: [56, 56], maxZoom: 15 }
        );
      },
      (err) => {
        setGeoState('error');
        setGeoError(err.code === err.PERMISSION_DENIED ? m.denied : m.unavailable);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }, [m]);

  const km = userPos ? distanceKm(userPos, site.geo) : null;
  // Estimation prudente en ville : ~22 km/h porte-à-porte
  const minutes = km !== null ? Math.max(5, Math.round((km / 22) * 60)) : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-lift">
      {/* ——— En-tête ——— */}
      <div className="flex flex-wrap items-end justify-between gap-6 p-8 sm:p-10">
        <div className="min-w-0">
          <p className="eyebrow eyebrow-start">{m.eyebrow}</p>
          <h2 className="mt-4 text-h2">{m.title}</h2>
          <p className="mt-4 max-w-prose2 text-small text-navy-500">{m.intro}</p>
        </div>

        <button
          onClick={locate}
          disabled={geoState === 'locating'}
          className="btn-navy shrink-0 disabled:opacity-60"
        >
          <IconPin className="h-4 w-4" />
          {geoState === 'locating'
            ? m.locating
            : geoState === 'done'
              ? m.retry
              : m.locate}
        </button>
      </div>

      {/* ——— Carte ——— */}
      <div className="relative">
        <div
          ref={containerRef}
          className="h-[26rem] w-full bg-navy-100 sm:h-[32rem]"
          aria-label={m.title}
          role="application"
        />

        {status !== 'ready' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy-50 px-6 text-center">
            {status === 'loading' ? (
              <>
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-brand" />
                <p className="text-small text-navy-500">{m.loading}</p>
              </>
            ) : (
              <>
                <IconPin className="h-8 w-8 text-brand" />
                <p className="max-w-sm text-small text-navy-500">{m.failed}</p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-sm"
                >
                  {m.openMaps}
                  <IconArrow className="h-3.5 w-3.5" />
                </a>
              </>
            )}
          </div>
        )}

        {/* Fiche flottante */}
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-[500] sm:right-auto sm:max-w-sm">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-navy-950/92 p-5 shadow-lift backdrop-blur-xl">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <IconPin className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-small font-bold text-white">{m.here}</p>
                <p className="mt-0.5 text-micro text-white/50">{site.address.full[locale]}</p>
              </div>
            </div>

            {geoState === 'done' && km !== null && (
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-white/35">
                    {m.distance}
                  </p>
                  <p className="tnum mt-1 font-heading text-lg font-extrabold text-white">
                    {km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-white/35">
                    {m.eta}
                  </p>
                  <p className="tnum mt-1 flex items-center gap-1.5 font-heading text-lg font-extrabold text-white">
                    <IconBolt className="h-4 w-4 text-brand" />
                    {minutes} min
                  </p>
                </div>
              </div>
            )}

            {geoState === 'error' && (
              <p className="mt-4 border-t border-white/10 pt-4 text-micro text-brand-300">
                {geoError}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={directionsHref(userPos)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-sm"
              >
                {m.directions}
                <IconArrow className="h-3.5 w-3.5" />
              </a>
              <a href={telHref(site.phones[0])} className="btn-outline btn-sm tnum">
                <IconPhone className="h-3.5 w-3.5" />
                {displayPhone(site.phones[0])}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Zones desservies ——— */}
      <div className="border-t border-navy-100 p-8 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-micro font-bold uppercase tracking-wider2 text-navy-500">
            {t.about.coverageZones}
          </p>
          <p className="text-micro text-navy-400">{m.mobileNote}</p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {site.coverage.map((zone) => (
            <li
              key={zone}
              className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-micro font-semibold text-navy-700 transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              {zone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
