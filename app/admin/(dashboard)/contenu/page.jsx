import { createClient } from '@/lib/supabase/server';
import ContentBoard from '@/components/admin/ContentBoard';

export const dynamic = 'force-dynamic';

export default async function ContentPage({ searchParams }) {
  const params = await searchParams;
  const onglet = params?.onglet || 'coordonnees';

  const supabase = await createClient();

  const [settings, zones, textes, services, regions, marques, etapes, avantages, temoignages, galerie, chatbot, medias] =
    await Promise.all([
      supabase.from('settings').select('*').maybeSingle(),
      supabase.from('coverage_zones').select('*').order('position'),
      supabase.from('page_texts').select('*').order('key'),
      supabase.from('services').select('*').order('position'),
      supabase.from('brand_regions').select('*').order('position'),
      supabase.from('brands').select('*').order('position'),
      supabase.from('process_steps').select('*').order('position'),
      supabase.from('advantages').select('*').order('position'),
      supabase.from('testimonials').select('*').order('position'),
      supabase.from('gallery_items').select('*').order('position'),
      supabase.from('chatbot_answers').select('*').order('position'),
      supabase.from('media_slots').select('*').order('slot'),
    ]);

  const vide = !settings.data;

  return (
    <ContentBoard
      onglet={onglet}
      vide={vide}
      data={{
        settings: settings.data,
        zones: zones.data || [],
        textes: textes.data || [],
        services: services.data || [],
        regions: regions.data || [],
        marques: marques.data || [],
        etapes: etapes.data || [],
        avantages: avantages.data || [],
        temoignages: temoignages.data || [],
        galerie: galerie.data || [],
        chatbot: chatbot.data || [],
        medias: medias.data || [],
      }}
    />
  );
}
