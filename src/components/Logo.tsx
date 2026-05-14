type Props = { className?: string };

/**
 * Task-Fix logo mark — wrench + house silhouette with a 24/7 chip.
 * Uses semantic theme tokens via currentColor + bg utilities on the wrapper.
 */
export function LogoMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* House outline */}
      <path
        d="M10 30 L32 12 L54 30 L54 54 L10 54 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M10 30 L32 12 L54 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 30 V54 H50 V30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Wrench */}
      <g transform="translate(20 24) rotate(-30 12 12)">
        <path
          d="M6 4 a6 6 0 1 0 6 10 l8 8 a2.5 2.5 0 0 0 3.5 -3.5 l-8 -8 a6 6 0 0 0 -9.5 -6.5 l3.5 3.5 -1.5 4 -4 1.5 -3.5 -3.5 z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
