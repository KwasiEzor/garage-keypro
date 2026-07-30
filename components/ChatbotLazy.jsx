'use client';

// Le chatbot est masqué par défaut (site.showChatbot) et jamais nécessaire
// au premier rendu : chargé à la demande plutôt qu'inclus dans le bundle
// initial de chaque page publique.
//
// `dynamic(..., { ssr: false })` doit être appelé depuis un composant
// client — impossible directement dans app/(site)/layout.jsx, qui est un
// composant serveur. D'où ce petit fichier intermédiaire.
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default Chatbot;
