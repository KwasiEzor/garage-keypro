// Enveloppe commune à /admin/connexion et /admin/(dashboard).
// Seul rôle : empêcher l'indexation de tout l'espace d'administration,
// y compris la page de connexion qui n'a pas son propre layout.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return children;
}
