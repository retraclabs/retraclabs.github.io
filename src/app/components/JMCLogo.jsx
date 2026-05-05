import React from 'react';

export default function JMCLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <text
        x="6.35"
        y="14.6"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="900"
      >
        J
      </text>
      <path
        d="M10.95 16.45L13.55 7.55"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M16.15 8.75L19.2 12L16.15 15.25"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
