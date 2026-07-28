import {
  SYMBOL_PATHS,
  SYMBOL_STROKE,
  H,
  V,
  KEYPRO,
  SERVICE_CENTER,
  BRAND,
} from '@/lib/logo';

/**
 * Logo KEYPRO SERVICE CENTER.
 *
 *   variant : 'horizontal' | 'stacked' | 'symbol' | 'icon'
 *   theme   : 'color'      — rouge + marine, sur fond clair
 *             'light'      — sur fond sombre
 *             'mono-dark'  — une seule couleur, marine
 *             'mono-white' — une seule couleur, blanc
 *
 * Le nom est vectorisé : le rendu ne dépend d'aucune police chargée et
 * reste strictement identique aux fichiers de public/brand/.
 */

const THEMES = {
  color: { mark: BRAND.red, word: BRAND.navy, sub: BRAND.subtle },
  light: { mark: BRAND.red, word: BRAND.white, sub: 'rgba(255,255,255,.55)' },
  'mono-dark': { mark: BRAND.navy, word: BRAND.navy, sub: BRAND.navy },
  'mono-white': { mark: BRAND.white, word: BRAND.white, sub: BRAND.white },
};

function Mark({ color }) {
  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth={SYMBOL_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SYMBOL_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export default function Logo({
  variant = 'horizontal',
  theme = 'color',
  className = 'h-11 w-auto',
  title = 'KEYPRO Service Center',
  decorative = false,
  ...rest
}) {
  const c = THEMES[theme] || THEMES.color;

  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    ...(decorative
      ? { 'aria-hidden': 'true', focusable: 'false' }
      : { role: 'img', 'aria-label': title }),
    ...rest,
  };

  const Title = decorative ? null : <title>{title}</title>;

  /* ——— Symbole seul ——— */
  if (variant === 'symbol') {
    return (
      <svg viewBox="0 0 64 64" {...svgProps}>
        {Title}
        <Mark color={c.mark} />
      </svg>
    );
  }

  /* ——— Icône : symbole dans un carré arrondi ——— */
  if (variant === 'icon') {
    const bg = theme === 'mono-white' || theme === 'light' ? BRAND.navy : BRAND.red;
    return (
      <svg viewBox="0 0 64 64" {...svgProps}>
        {Title}
        <rect width="64" height="64" rx="14" fill={bg} />
        <g transform="translate(32 32) scale(0.86) translate(-32 -32)">
          <Mark color={BRAND.white} />
        </g>
      </svg>
    );
  }

  /* ——— Version empilée ——— */
  if (variant === 'stacked') {
    const [vx, vy, vw, vh] = V.vb;
    return (
      <svg viewBox={`0 0 ${vw} ${vh}`} {...svgProps}>
        {Title}
        <g transform={`translate(${(-vx).toFixed(2)} ${(-vy).toFixed(2)})`}>
          <Mark color={c.mark} />
          <g transform={`translate(${V.tx} ${V.kwBase}) scale(${V.kwScale})`} fill={c.word}>
            <path d={KEYPRO.d} />
          </g>
          <g transform={`translate(${V.tx} ${V.scBase}) scale(${V.scScale})`} fill={c.sub}>
            <path d={SERVICE_CENTER.d} />
          </g>
        </g>
      </svg>
    );
  }

  /* ——— Verrouillage horizontal (par défaut) ——— */
  const [vx, vy, vw, vh] = H.vb;
  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} {...svgProps}>
      {Title}
      <g transform={`translate(${(-vx).toFixed(2)} ${(-vy).toFixed(2)})`}>
        <Mark color={c.mark} />
        <g transform={`translate(${H.textX} ${H.kwBase}) scale(${H.kwScale})`} fill={c.word}>
          <path d={KEYPRO.d} />
        </g>
        <g transform={`translate(${H.textX} ${H.scBase}) scale(${H.scScale})`} fill={c.sub}>
          <path d={SERVICE_CENTER.d} />
        </g>
      </g>
    </svg>
  );
}
