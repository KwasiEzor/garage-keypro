const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ children, className = 'h-6 w-6', ...rest }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} {...rest} aria-hidden="true">
    {children}
  </svg>
);

export const IconKey = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="15.5" r="4" />
    <path d="M10.5 12.5 20 3M17 6l2.5 2.5M14.5 8.5 17 11" />
  </Svg>
);

export const IconChip = (p) => (
  <Svg {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </Svg>
);

export const IconRemote = (p) => (
  <Svg {...p}>
    <rect x="7" y="3" width="10" height="18" rx="3" />
    <circle cx="12" cy="8" r="1.3" />
    <path d="M10 13h4M10 16.5h4" />
  </Svg>
);

export const IconScanner = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M7 21h10M12 17v4M6.5 11l2 2 2-4 2 5 2-3h2.5" />
  </Svg>
);

export const IconCode = (p) => (
  <Svg {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
  </Svg>
);

export const IconTruck = (p) => (
  <Svg {...p}>
    <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M5 3h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L20 14.5V18a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </Svg>
);

export const IconMail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </Svg>
);

export const IconArrow = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3.2" />
  </Svg>
);

export const IconEyeOff = (p) => (
  <Svg {...p}>
    <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 4" />
    <path d="M6.4 7.6A17.4 17.4 0 0 0 2.5 12S6 18.5 12 18.5a9.4 9.4 0 0 0 4-.86" />
    <path d="M9.8 9.9a3.2 3.2 0 0 0 4.4 4.5" />
    <path d="m4 4 16 16" />
  </Svg>
);

export const IconChat = (p) => (
  <Svg {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-5A8 8 0 1 1 21 12Z" />
    <path d="M9 11h6M9 14h4" />
  </Svg>
);

export const IconSend = (p) => (
  <Svg {...p}>
    <path d="M4.5 12 20 4l-7 16-2.5-6.5L4.5 12Z" />
  </Svg>
);

export const IconGlobe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4.5" />
  </Svg>
);

export const IconBolt = (p) => (
  <Svg {...p}>
    <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
  </Svg>
);

export const IconTools = (p) => (
  <Svg {...p}>
    <path d="M14.5 5.5a4 4 0 0 0 5 5l-9 9a2.8 2.8 0 0 1-4-4l9-9a4 4 0 0 0-1 -1Z" />
  </Svg>
);

export const IconSparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9 12 3.5Z" />
  </Svg>
);

export const IconCar = (p) => (
  <Svg {...p}>
    <path d="M4 16v2.5M20 16v2.5M3 15.5h18v-3l-1.8-.6-2-4.2A2 2 0 0 0 15.4 6.5H8.6a2 2 0 0 0-1.8 1.2l-2 4.2L3 12.5v3Z" />
    <path d="M6.5 12.5h11" />
  </Svg>
);

export const IconWhatsapp = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.8 9.8 0 0 0 4.69 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.03-5.1-2.89-6.96A9.78 9.78 0 0 0 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.4 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
  </svg>
);

export const IconFacebook = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.4-.13-2.38 0-4 1.45-4 4.1v2.32H7.6V13h2.7v8h3.2Z" />
  </svg>
);

export const IconInstagram = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 5.05a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 7.83a3.08 3.08 0 1 1 0-6.16 3.08 3.08 0 0 1 0 6.16Zm6.05-8.02a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0Z" />
  </svg>
);

export const IconTwitter = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.7 6.1H1.6l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.2h1.8L7.7 4.7H5.8l10.6 14.5Z" />
  </svg>
);

export const IconLinkedin = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.5H3.9V21h3.04V8.5ZM5.4 3a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 5.4 3ZM21 14.2c0-3.4-1.82-4.98-4.24-4.98-1.96 0-2.83 1.08-3.32 1.84V8.5H10.4V21h3.04v-6.98c0-1.47.28-2.9 2.1-2.9 1.8 0 1.82 1.68 1.82 2.99V21H21v-6.8Z" />
  </svg>
);

export const IconYoutube = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.76-1.77C18.34 5.1 12 5.1 12 5.1s-6.34 0-7.84.43A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.76 1.77c1.5.43 7.84.43 7.84.43s6.34 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.2 22 12 22 12Zm-11.9 3.02V8.98L15.3 12l-5.2 3.02Z" />
  </svg>
);

export const serviceIcons = {
  key: IconKey,
  chip: IconChip,
  remote: IconRemote,
  scanner: IconScanner,
  code: IconCode,
  truck: IconTruck,
};
