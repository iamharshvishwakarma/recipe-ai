import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19.8 12.3c0-2.3-1.2-4.4-3-5.7" />
    <path d="M12.3 4.2c-2.3 0-4.4 1.2-5.7 3" />
    <path d="M4.2 12.3c0 2.3 1.2 4.4 3 5.7" />
    <path d="M11.7 19.8c2.3 0 4.4-1.2 5.7-3" />
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="m15.6 15.6-3.1-3.1" />
    <path d="M12 12v.01" />
    <path d="m8.4 15.6 3.1-3.1" />
    <path d="M12 8.4V12" />
    <path d="m8.4 8.4 3.1 3.1" />
  </svg>
);

export default Logo;
