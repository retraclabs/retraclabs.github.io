import React from 'react';
import { motion } from 'motion/react';

/* A lab rat in safety goggles, peeking over the rim of a beaker whose contents
   are the RETRAC LABS wordmark gradient. Drawn rather than imported so it
   inherits the site's palette and can animate: the rat bobs, the bubbles rise,
   and the liquid rocks very slightly.

   Everything is on a 260 x 260 canvas. If you nudge one part, the numbers to
   keep in mind are: the rim sits at y=112, the liquid surface at y=150, and the
   rat's head is centred on (130, 62). */

const FUR = '#d4d4d8';
const FUR_SHADE = '#a1a1aa';
const INK = '#09090b';
const PINK = '#f472b6';
const CYAN = '#22d3ee';
const GLASS = '#a1a1aa';

type Bubble = { cx: number; r: number; delay: number; duration: number };

const BUBBLES: Bubble[] = [
  { cx: 104, r: 4.5, delay: 0, duration: 3.2 },
  { cx: 132, r: 3, delay: 1.1, duration: 2.6 },
  { cx: 156, r: 5.5, delay: 0.6, duration: 3.8 },
  { cx: 118, r: 2.5, delay: 2.1, duration: 2.9 },
  { cx: 146, r: 3.5, delay: 1.7, duration: 3.4 },
];

export const LabRat = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 260 260"
    className={className}
    role="img"
    aria-label="A lab rat wearing safety goggles, peeking over the rim of a bubbling beaker"
  >
    <defs>
      {/* the same gradient the LABS wordmark uses, so the liquid is unmistakably ours */}
      <linearGradient id="rat-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e879f9" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#fb923c" />
      </linearGradient>
      <linearGradient id="rat-glass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
      </linearGradient>
      {/* keeps the liquid and its bubbles inside the beaker walls */}
      <clipPath id="rat-beaker-clip">
        <path d="M70 112 L80 226 Q80 234 90 234 L170 234 Q180 234 180 226 L190 112 Z" />
      </clipPath>
    </defs>

    {/* ── tail, curling out from behind the beaker ── */}
    {/* It has to attach at ONE point and end free in the air. An earlier version
        curled back toward the glass, which gave the beaker two contact points and
        turned the whole thing into a coffee mug. It also sits on the left, well
        clear of the spout. */}
    <g>
      <path
        d="M84 220 C54 228 30 212 29 189 C28 170 43 162 52 171"
        fill="none"
        stroke={INK}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M84 220 C54 228 30 212 29 189 C28 170 43 162 52 171"
        fill="none"
        stroke={PINK}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </g>

    {/* ── the rat, bobbing gently ── */}
    <motion.g
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
    >
      {/* ears */}
      <circle cx="97" cy="32" r="19" fill={FUR} stroke={INK} strokeWidth="5" />
      <circle cx="97" cy="32" r="9" fill={PINK} />
      <circle cx="163" cy="32" r="19" fill={FUR} stroke={INK} strokeWidth="5" />
      <circle cx="163" cy="32" r="9" fill={PINK} />

      {/* head */}
      <ellipse cx="130" cy="62" rx="42" ry="38" fill={FUR} stroke={INK} strokeWidth="5" />

      {/* goggle strap, behind the lenses */}
      <path
        d="M90 58 Q130 46 170 58"
        fill="none"
        stroke="#3f3f46"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* goggles */}
      <g>
        <circle cx="112" cy="60" r="16" fill={CYAN} stroke={INK} strokeWidth="5" />
        <circle cx="148" cy="60" r="16" fill={CYAN} stroke={INK} strokeWidth="5" />
        <path d="M128 60 L132 60" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        {/* a highlight on each lens, so they read as glass and not as flat discs */}
        <path d="M105 54 Q109 50 114 52" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
        <path d="M141 54 Q145 50 150 52" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* muzzle */}
      <ellipse cx="130" cy="86" rx="20" ry="13" fill={FUR} stroke={INK} strokeWidth="4" />
      <ellipse cx="130" cy="80" rx="6" ry="4.5" fill={PINK} stroke={INK} strokeWidth="3" />
      {/* two front teeth, because a rat without them is just a mouse */}
      <rect x="126" y="90" width="3.6" height="7" rx="1.2" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
      <rect x="130.4" y="90" width="3.6" height="7" rx="1.2" fill="#ffffff" stroke={INK} strokeWidth="1.6" />

      {/* whiskers */}
      <g stroke={FUR_SHADE} strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M112 84 Q94 80 84 74" />
        <path d="M112 88 Q92 88 80 88" />
        <path d="M148 84 Q166 80 176 74" />
        <path d="M148 88 Q168 88 180 88" />
      </g>
    </motion.g>

    {/* ── beaker ── */}
    <g clipPath="url(#rat-beaker-clip)">
      {/* liquid, with a surface that rocks a little */}
      <motion.g
        animate={{ y: [0, 2.5, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
      >
        <rect x="60" y="150" width="140" height="100" fill="url(#rat-liquid)" />
        <ellipse cx="130" cy="150" rx="57" ry="9" fill="url(#rat-liquid)" />
        <ellipse cx="130" cy="150" rx="57" ry="9" fill="#ffffff" opacity="0.22" />
      </motion.g>

      {BUBBLES.map((bubble, index) => (
        <motion.circle
          key={index}
          cx={bubble.cx}
          r={bubble.r}
          fill="#ffffff"
          initial={{ cy: 226, opacity: 0 }}
          animate={{ cy: [226, 152], opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            repeat: Infinity,
            duration: bubble.duration,
            delay: bubble.delay,
            ease: 'easeOut',
            times: [0, 0.15, 0.75, 1],
          }}
        />
      ))}

      <rect x="60" y="100" width="140" height="150" fill="url(#rat-glass)" />
    </g>

    {/* beaker outline, drawn over the contents */}
    <path
      d="M70 112 L80 226 Q80 234 90 234 L170 234 Q180 234 180 226 L190 112"
      fill="none"
      stroke={GLASS}
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* rim, with a spout on the right */}
    <path
      d="M64 112 L196 112"
      stroke={GLASS}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M190 112 Q200 108 204 116"
      fill="none"
      stroke={GLASS}
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* ── paws, drawn last so they sit ON the rim. Behind it, the 6px rim stroke
           sliced each one in half and they read as two grey smudges. ── */}
    <g>
      <ellipse cx="88" cy="108" rx="13" ry="9" fill={FUR} stroke={INK} strokeWidth="4.5" />
      <ellipse cx="172" cy="108" rx="13" ry="9" fill={FUR} stroke={INK} strokeWidth="4.5" />
      <g stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M83 112 Q83 117 85 118" />
        <path d="M88 113 Q88 118 90 119" />
        <path d="M93 112 Q93 117 95 118" />
        <path d="M167 112 Q167 117 169 118" />
        <path d="M172 113 Q172 118 174 119" />
        <path d="M177 112 Q177 117 179 118" />
      </g>
    </g>

    {/* graduation marks */}
    <g stroke={GLASS} strokeWidth="3" strokeLinecap="round" opacity="0.65">
      <path d="M76 138 L90 138" />
      <path d="M78 162 L88 162" />
      <path d="M80 186 L94 186" />
      <path d="M82 210 L92 210" />
    </g>

    {/* etched label */}
    <text
      x="152"
      y="204"
      textAnchor="middle"
      className="font-black"
      fontSize="20"
      fill="#ffffff"
      opacity="0.45"
      letterSpacing="1"
    >
      RL
    </text>
  </svg>
);
