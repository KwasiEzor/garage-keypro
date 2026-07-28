'use client';

import { useLanguage } from './LanguageProvider';
import PageHero from './PageHero';
import { Rise, SplitText } from './motion';
import { IconCheck } from './Icons';

/**
 * Rendu commun pour les pages « Politique de confidentialité » et
 * « Mentions légales » : un PageHero puis une liste de sections
 * (titre + texte + éventuelle liste à puces) tirée du dictionnaire.
 */
export default function LegalContent({ dictKey, crumb, image }) {
  const { t } = useLanguage();
  const d = t[dictKey];

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} crumb={crumb} image={image} />

      <section className="section bg-white">
        <div className="container-x max-w-prose2">
          {d.updated && (
            <p className="text-micro font-semibold uppercase tracking-wider2 text-navy-400">
              {d.updated}
            </p>
          )}

          <div className="mt-8 space-y-10">
            {d.sections.map((s, i) => (
              <Rise key={s.title} delay={Math.min(i, 6) * 50}>
                <SplitText as="h2" text={s.title} className="text-h4 font-bold text-navy-950" />
                <p className="mt-3 text-small leading-relaxed text-navy-600">{s.text}</p>

                {s.items && (
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-small text-navy-600">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Rise>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
