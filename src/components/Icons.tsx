import type { ReactElement } from "react";

export type IconName =
  | "store"
  | "cafe"
  | "scissors"
  | "dumbbell"
  | "wrench"
  | "bricks"
  | "wifioff"
  | "key"
  | "shield"
  | "headset"
  | "db"
  | "check"
  | "x"
  | "arrow"
  | "chevron"
  | "plus"
  | "close"
  | "burger"
  | "star"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "calc"
  | "box"
  | "printer"
  | "scanner"
  | "scale"
  | "terminal"
  | "calendar"
  | "sync"
  | "zap"
  | "doc"
  | "send"
  | "viber"
  | "whatsapp";

const P: Record<IconName, ReactElement> = {
  store: (
    <>
      <path d="M4 5h16l1.2 4.2a2.6 2.6 0 0 1-2.5 3.3 2.9 2.9 0 0 1-2.6-1.6 2.9 2.9 0 0 1-2.6 1.6 2.9 2.9 0 0 1-2.6-1.6A2.9 2.9 0 0 1 8.3 12.5a2.9 2.9 0 0 1-2.6 1.6 2.6 2.6 0 0 1-2.5-3.3L4 5Z" />
      <path d="M5 12.8V20h14v-7.2" />
      <path d="M9.5 20v-4.5h5V20" />
    </>
  ),
  cafe: (
    <>
      <path d="M5 9h11v5.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M16 10h1.6a2.4 2.4 0 0 1 0 4.8H16" />
      <path d="M8.5 3.5c-.8 1 .8 1.5 0 2.5M12.5 3.5c-.8 1 .8 1.5 0 2.5" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6.5" r="2.5" />
      <circle cx="6" cy="17.5" r="2.5" />
      <path d="M20 4 8.2 15.8M14.5 14.5 20 20M8.2 8.2 12 12" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M6.5 7.5v9M3.5 9.5v5M17.5 7.5v9M20.5 9.5v5M6.5 12h11" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.2 6.3a4.6 4.6 0 0 0-6 6L3 17.5V21h3.5l5.2-5.2a4.6 4.6 0 0 0 6-6l-3 3-2.6-.8-.8-2.6 2.9-3.1Z" />
    </>
  ),
  bricks: (
    <>
      <path d="M3 5.5h18v4.5H3zM3 14h18v4.5H3z" />
      <path d="M9.5 5.5V10M15.5 14v4.5M6.5 10v4M17.5 10v4" />
    </>
  ),
  wifioff: (
    <>
      <path d="M2 2l20 20" />
      <path d="M12 19.5h.01" />
      <path d="M8.6 15.6a5 5 0 0 1 5-1.3" />
      <path d="M5.3 12.3a9.5 9.5 0 0 1 3-1.9M15.5 11.5c1.1.4 2.2 1 3.2 1.8" />
      <path d="M2.5 8.8A14.5 14.5 0 0 1 7 6.4M11 5.1a14.5 14.5 0 0 1 10.5 3.7" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="4.5" />
      <path d="m11.3 12.2 8.2-8.2M17 6.5l2.5 2.5M14 9.5l2 2" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2.5 7.5 3.4v5.6c0 4.8-3.2 8.1-7.5 10-4.3-1.9-7.5-5.2-7.5-10V5.9L12 2.5Z" />
      <path d="m8.8 11.8 2.3 2.3 4.1-4.6" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14.5v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14.5h2.5v4.5H5A1.5 1.5 0 0 1 3.5 17.5v-1.5a1.5 1.5 0 0 1 .5-1.5ZM20 14.5h-2.5V19H19a1.5 1.5 0 0 0 1.5-1.5v-1.5a1.5 1.5 0 0 0-.5-1.5Z" />
      <path d="M18.5 19.5a3 3 0 0 1-3 2.5h-2" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L19.5 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M4.5 12h15m-6-6 6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  burger: <path d="M4 7h16M4 12h16M4 17h16" />,
  star: (
    <path
      d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3-4.7-4.4 6.4-.8L12 2.8Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  phone: (
    <path d="M21.5 16.9v2.6a1.9 1.9 0 0 1-2.1 1.9 18.9 18.9 0 0 1-8.2-2.9 18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 2.6 4.6 1.9 1.9 0 0 1 4.5 2.5h2.6a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.9.6 2.8a1.9 1.9 0 0 1-.4 2L8 10.1a15.2 15.2 0 0 0 5.9 5.9l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.9.5 2.8.6a1.9 1.9 0 0 1 1.6 1.9Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5S5 15.8 5 10.3a7 7 0 0 1 14 0c0 5.5-7 11.2-7 11.2Z" />
      <circle cx="12" cy="10.3" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  calc: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <path d="M8.5 6.5h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18.5h3" />
    </>
  ),
  box: (
    <>
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z" />
      <path d="m3.3 8.3 8.7 5 8.7-5M12 13.3V21" />
    </>
  ),
  printer: (
    <>
      <path d="M6.5 8.5V3h11v5.5" />
      <path d="M6.5 17H4.5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-2" />
      <path d="M6.5 14h11v7h-11z" />
    </>
  ),
  scanner: (
    <>
      <path d="M4 7.5V5.5A1.5 1.5 0 0 1 5.5 4h2M16.5 4h2A1.5 1.5 0 0 1 20 5.5v2M20 16.5v2a1.5 1.5 0 0 1-1.5 1.5h-2M7.5 20h-2A1.5 1.5 0 0 1 4 18.5v-2" />
      <path d="M8 8.5v7M11 8.5v7M13.5 8.5v4.5M16 8.5v7" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3.5v3M4.5 6.5h15M12 18.5v2M8.5 20.5h7" />
      <path d="M6 6.5 2.8 14a3.3 3.3 0 0 0 6.4 0L6 6.5ZM18 6.5 14.8 14a3.3 3.3 0 0 0 6.4 0L18 6.5Z" />
    </>
  ),
  terminal: (
    <>
      <rect x="4" y="3.5" width="16" height="12.5" rx="2" />
      <path d="M7.5 7.5 10 10l-2.5 2.5M12.5 12.5h4M9 20.5h6M12 16v4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3.5 10.5h17M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 17.5h.01M12 17.5h.01" />
    </>
  ),
  sync: (
    <>
      <path d="M21 12a9 9 0 0 1-15.6 6.2L3 16" />
      <path d="M3 21v-5h5" />
      <path d="M3 12a9 9 0 0 1 15.6-6.2L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  zap: <path d="M13 2 4 14h6.5L11 22l9-12h-6.5L13 2Z" />,
  doc: (
    <>
      <path d="M6 2.5h8.5L20 8v13.5H6V2.5Z" />
      <path d="M14 2.5V8h5.5M9.5 12.5h5M9.5 16h5" />
    </>
  ),
  send: <path d="M21.5 2.5 11 13m10.5-10.5-7 19-4-8.5-9-4 19.5-6.5Z" />,
  viber: (
    <>
      <path d="M12 3.5c-4.7 0-8.5 3-8.5 7 0 1.6.6 3 1.7 4.2L4 19.5l4.4-1.3c1.1.3 2.3.5 3.6.5 4.7 0 8.5-3 8.5-7.2S16.7 3.5 12 3.5Z" />
      <path d="M9.3 8.2c.5-.5 1-.6 1.3-.2l.7.9c.3.4 0 .8-.3 1.1-.4.4-.2.9.3 1.4s1 .8 1.4.4c.3-.3.7-.6 1.1-.3l.9.7c.4.3.3.9-.2 1.3-2 .9-6-3.2-5.2-5.3Z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9 8.7c-.5.2-.9.8-.8 1.5.2 1.7 1.5 3.6 3 4.6 1 .7 2.4 1.3 3.4.9.6-.2 1-.7 1-1.3l-1.5-1-.9.7c-.9-.3-2-1.4-2.4-2.3l.7-.9-1-1.6c-.4-.3-1-.6-1.5-.6Z" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  );
}

/* Фирменный знак «М» */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="9" fill="#A3E635" />
      <path
        d="M11 27V13l9 8 9-8v14"
        fill="none"
        stroke="#0D1117"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="21.5" r="2.1" fill="#0D1117" />
    </svg>
  );
}

/* Штрих-код для «чека» */
export function Barcode({ className = "h-9 w-full" }: { className?: string }) {
  const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y={0} width={w} height={24} fill="currentColor" />;
        x += w + 1.3;
        return rect;
      })}
    </svg>
  );
}
