interface PlatformIconProps {
  size?: number;
  className?: string;
}

export const PlatformIcon = ({ size = 64, className }: PlatformIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="platformIconBg" x1="8" y1="8" x2="56" y2="56">
        <stop offset="0%" stopColor="rgb(253, 198, 177)" />
        <stop offset="100%" stopColor="rgb(247, 141, 167)" />
      </linearGradient>
      <linearGradient id="platformIconInner" x1="18" y1="18" x2="46" y2="46">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
        <stop offset="100%" stopColor="#FFF5F1" stopOpacity="0.86" />
      </linearGradient>
    </defs>

    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#platformIconBg)" />
    <rect x="16" y="16" width="32" height="32" rx="10" fill="url(#platformIconInner)" />
    <circle cx="26" cy="31" r="2.6" fill="#D86E87" />
    <circle cx="38" cy="31" r="2.6" fill="#D86E87" />
    <path
      d="M24 39C26.3 41 29 42 32 42C35 42 37.7 41 40 39"
      stroke="#D86E87"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="19" cy="21" r="2.2" fill="#FFF" fillOpacity="0.92" />
    <circle cx="46" cy="44" r="2.4" fill="#FFF" fillOpacity="0.68" />
  </svg>
);
