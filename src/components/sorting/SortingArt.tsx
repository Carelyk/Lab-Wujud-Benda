import type { ReactNode } from 'react'
import s from './SortingArt.module.css'

const ART: Record<string, ReactNode> = {
  batu: (
    <>
      <path
        d="M9 43 17 23l19-7 18 12-5 19-25 5Z"
        fill="#A9B2C4"
        stroke="#5A6072"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M17 23 30 34l24-6M30 34l-3 18" stroke="#7C8698" strokeWidth="2.4" fill="none" />
      <path d="M21 29l8-4" stroke="#E7EBF2" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  kayu: (
    <g transform="rotate(-8 32 32)">
      <rect x="6" y="23" width="51" height="18" rx="9" fill="#C98A4B" stroke="#8A5A2B" strokeWidth="3" />
      <ellipse cx="52" cy="32" rx="6" ry="9" fill="#E8B77B" stroke="#8A5A2B" strokeWidth="2.6" />
      <path d="M49 27c3 3 3 7 0 10" stroke="#B47434" strokeWidth="2.2" fill="none" />
      <path d="M15 28h17M15 36h13" stroke="#8A5A2B" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </g>
  ),
  es: (
    <>
      <path
        d="M13 25 32 16l19 9v22l-19 10-19-10Z"
        fill="#E5F7FF"
        stroke="#8FD3F2"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M13 25l19 9 19-9M32 34v23" stroke="#8FD3F2" strokeWidth="2.6" fill="none" />
      <path d="M21 31l8-3" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  sendok: (
    <g transform="rotate(-34 32 32)">
      <ellipse cx="32" cy="21" rx="11" ry="14" fill="#D5DDE8" stroke="#6B7688" strokeWidth="3" />
      <ellipse cx="32" cy="21" rx="6" ry="8" fill="#EEF3F8" />
      <rect x="29" y="33" width="6" height="24" rx="3" fill="#D5DDE8" stroke="#6B7688" strokeWidth="2.6" />
    </g>
  ),
  buku: (
    <>
      <rect x="10" y="13" width="44" height="38" rx="4" fill="#2F9BFF" stroke="#1668C4" strokeWidth="3" />
      <rect x="16" y="13" width="38" height="38" rx="4" fill="#FFFFFF" stroke="#1668C4" strokeWidth="3" />
      <path d="M16 17h38" stroke="#D9E8F4" strokeWidth="4" />
      <path d="M24 26h22M24 33h22M24 40h14" stroke="#8FA2B8" strokeWidth="3" strokeLinecap="round" />
      <path d="M13 18v28" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.7" />
    </>
  ),
  air: (
    <>
      <path
        d="M17 12h30l-3 38a6 6 0 0 1-6 5H26a6 6 0 0 1-6-5Z"
        fill="#F4FBFF"
        stroke="#B9D6E9"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M20 29c5 4 9-3 14 0s9 4 14 0v21a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4Z" fill="#2F9BFF" opacity="0.72" />
      <ellipse cx="32" cy="12" rx="15" ry="3.5" fill="#EAF6FF" stroke="#B9D6E9" strokeWidth="2.6" />
      <path d="M25 34c4 2 8-2 12 0" stroke="#BFE6FA" strokeWidth="2.4" fill="none" />
    </>
  ),
  minyak: (
    <>
      <rect x="27" y="7" width="10" height="8" rx="2" fill="#8A5A2B" />
      <path d="M24 15h16l4 8v31a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V23Z" fill="#FFF6D9" stroke="#B97511" strokeWidth="3" />
      <path d="M22 32h20v20a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2Z" fill="#F5C542" opacity="0.9" />
      <path d="M27 25h10" stroke="#B97511" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  susu: (
    <>
      <path d="M19 16 32 8l13 8v36a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4Z" fill="#FFFFFF" stroke="#6B7688" strokeWidth="3" />
      <path d="M19 16h26l-4-8H23Z" fill="#D9E8F4" stroke="#6B7688" strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="23" y="26" width="18" height="18" rx="3" fill="#5CC8F5" opacity="0.85" />
      <path d="M27 32c2 2 4-2 6 0s4 2 6 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" />
    </>
  ),
  sirup: (
    <>
      <rect x="27" y="6" width="10" height="7" rx="2" fill="#8A5A2B" />
      <path d="M26 13h12l6 11v27a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V24Z" fill="#FFF0F2" stroke="#B74B63" strokeWidth="3" />
      <path d="M20 33h24v18a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2Z" fill="#E24A63" opacity="0.85" />
      <path d="M26 26h12" stroke="#B74B63" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  balon: (
    <>
      <ellipse cx="32" cy="25" rx="17" ry="20" fill="#A78BFA" stroke="#7D5FD6" strokeWidth="3" />
      <path d="M32 45l-4 5h8Z" fill="#7D5FD6" />
      <path d="M32 50c6 4-6 7 0 11" stroke="#7D5FD6" strokeWidth="2.4" fill="none" />
      <ellipse cx="25" cy="18" rx="4" ry="7" fill="#FFFFFF" opacity="0.45" transform="rotate(-22 25 18)" />
      <circle cx="38" cy="29" r="2.2" fill="#FFFFFF" opacity="0.75" />
    </>
  ),
  uap: (
    <>
      <path d="M22 53c-7-8 5-11 0-19s7-10 0-19" stroke="#BFE6FA" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M32 55c-8-9 6-13 0-22s7-11 0-21" stroke="#8FD3F2" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M43 53c-7-8 5-11 0-19s7-10 0-19" stroke="#BFE6FA" strokeWidth="6" strokeLinecap="round" fill="none" />
    </>
  ),
  oksigen: (
    <>
      <circle cx="22" cy="26" r="11" fill="#EDE7FF" stroke="#A78BFA" strokeWidth="3" />
      <circle cx="43" cy="20" r="7" fill="#EDE7FF" stroke="#A78BFA" strokeWidth="2.6" />
      <circle cx="43" cy="42" r="11" fill="#EDE7FF" stroke="#A78BFA" strokeWidth="3" />
      <circle cx="20" cy="47" r="6" fill="#EDE7FF" stroke="#A78BFA" strokeWidth="2.6" />
      <text x="18" y="30" fontSize="11" fontWeight="800" fill="#513A9C">O₂</text>
    </>
  ),
  pasir: (
    <>
      <path d="M8 50c4-12 14-18 24-18s20 6 24 18Z" fill="#E8C87A" stroke="#B97511" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="22" cy="42" r="2.4" fill="#B97511" />
      <circle cx="30" cy="36" r="2" fill="#B97511" />
      <circle cx="38" cy="42" r="2.6" fill="#B97511" />
      <circle cx="45" cy="46" r="2" fill="#B97511" />
      <circle cx="16" cy="47" r="2" fill="#B97511" />
    </>
  ),
  garam: (
    <>
      <path d="M20 24h24l4 30a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4Z" fill="#F4FBFF" stroke="#6B7688" strokeWidth="3" />
      <path d="M20 24h24l-3-9H23Z" fill="#D9E8F4" stroke="#6B7688" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="25" cy="20" r="1.8" fill="#6B7688" />
      <circle cx="32" cy="17" r="1.8" fill="#6B7688" />
      <circle cx="39" cy="20" r="1.8" fill="#6B7688" />
      <path d="M23 36h18M23 43h18" stroke="#B9D6E9" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="34" cy="58" r="2" fill="#6B7688" />
    </>
  ),
  tepung: (
    <>
      <path d="M16 20h32v32a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4Z" fill="#F7EBD8" stroke="#B97511" strokeWidth="3" />
      <path d="M16 20l6-9h20l6 9Z" fill="#E8C87A" stroke="#B97511" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="37" r="8" fill="#FFFFFF" stroke="#D9B475" strokeWidth="2.4" />
      <circle cx="29" cy="35" r="1.5" fill="#D9B475" />
      <circle cx="35" cy="39" r="1.5" fill="#D9B475" />
      <path d="M27 43c3 2 7 2 10 0" stroke="#D9B475" strokeWidth="2" fill="none" />
    </>
  ),
  busa: (
    <>
      <circle cx="21" cy="38" r="10" fill="#EAF6FF" stroke="#5CC8F5" strokeWidth="3" />
      <circle cx="34" cy="30" r="12" fill="#F4FBFF" stroke="#5CC8F5" strokeWidth="3" />
      <circle cx="45" cy="40" r="9" fill="#EAF6FF" stroke="#5CC8F5" strokeWidth="3" />
      <circle cx="28" cy="47" r="8" fill="#FFFFFF" stroke="#5CC8F5" strokeWidth="3" />
      <circle cx="40" cy="49" r="6" fill="#FFFFFF" stroke="#5CC8F5" strokeWidth="2.6" />
      <circle cx="30" cy="26" r="3" fill="#FFFFFF" />
    </>
  ),
  awan: (
    <>
      <path
        d="M18 47h28a11 11 0 0 0 1-22 15 15 0 0 0-28-3 10 10 0 0 0-1 25Z"
        fill="#F4FBFF"
        stroke="#5CC8F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M27 34h14M25 40h18" stroke="#BFE6FA" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
}

export function SortingArt({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 64" className={s.art} aria-hidden="true" focusable="false">
      {ART[id] ?? ART.batu}
    </svg>
  )
}
