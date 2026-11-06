import type { ReactNode } from 'react'
import s from './Mascot.module.css'

export type MoodTetes = 'senang' | 'panas' | 'dingin' | 'bingung' | 'semangat'

interface Props {
  mood?: MoodTetes
  size?: number
  className?: string
}

const LABEL: Record<MoodTetes, string> = {
  senang: 'Tetes tersenyum senang',
  panas: 'Tetes kepanasan dan berkeringat',
  dingin: 'Tetes kedinginan dan menggigil',
  bingung: 'Tetes bingung',
  semangat: 'Tetes bersemangat',
}

export function Mascot({ mood = 'senang', size = 200, className }: Props) {
  const kelas = [s.tetes, s[mood], className].filter(Boolean).join(' ')

  return (
    <svg
      viewBox="0 0 200 210"
      width={size}
      height={size}
      className={kelas}
      role="img"
      aria-label={LABEL[mood]}
    >
      <defs>
        <linearGradient id="tetesBadan" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#93E2FF" />
          <stop offset="0.55" stopColor="#5CC8F5" />
          <stop offset="1" stopColor="#2F9BFF" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="198" rx="52" ry="8" fill="#2D3142" opacity="0.08" />

      <g className={s.badan}>
        {/* arms */}
        <path
          d="M42 138c-9-3-16-10-19-19"
          className={s.lengan}
          stroke="#2F9BFF"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M158 138c9-3 16-10 19-19"
          className={s.lengan}
          stroke="#2F9BFF"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M100 10c0 0-62 76-62 122a62 62 0 1 0 124 0C162 86 100 10 100 10Z"
          fill="url(#tetesBadan)"
          stroke="#1F7FCB"
          strokeWidth="4"
        />

        <ellipse cx="76" cy="86" rx="12" ry="20" fill="#FFFFFF" opacity="0.55" transform="rotate(-18 76 86)" />

        {/* cheeks */}
        <ellipse cx="58" cy="150" rx="12" ry="8" fill="#FF8FA3" opacity={mood === 'panas' ? 0.95 : 0.7} />
        <ellipse cx="142" cy="150" rx="12" ry="8" fill="#FF8FA3" opacity={mood === 'panas' ? 0.95 : 0.7} />

        {mood === 'panas' ? (
          <>
            <path d="M66 127q14-11 28 0" className={s.mataTutup} />
            <path d="M106 127q14-11 28 0" className={s.mataTutup} />
            <ellipse cx="100" cy="160" rx="10" ry="13" fill="#2D3142" />
            <path d="M96 168q4 4 8 0" stroke="#FF8FA3" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path
              d="M154 84c0 0 9 11 9 17a9 9 0 0 1-18 0c0-6 9-17 9-17Z"
              fill="#EAF6FF"
              stroke="#2F9BFF"
              strokeWidth="3"
              className={s.keringat}
            />
          </>
        ) : null}

        {mood === 'dingin' ? (
          <>
            <circle cx="79" cy="124" r="15" fill="#FFFFFF" />
            <circle cx="121" cy="124" r="15" fill="#FFFFFF" />
            <circle cx="79" cy="126" r="7" fill="#2D3142" />
            <circle cx="121" cy="126" r="7" fill="#2D3142" />
            <path d="M84 157q8-8 16 0t16 0" stroke="#2D3142" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M168 104l8-6M168 118l9 2M32 104l-8-6M32 118l-9 2" stroke="#5CC8F5" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : null}

        {mood === 'bingung' ? (
          <>
            <circle cx="79" cy="124" r="15" fill="#FFFFFF" />
            <circle cx="121" cy="124" r="14" fill="#FFFFFF" />
            <circle cx="82" cy="126" r="6.5" fill="#2D3142" />
            <circle cx="119" cy="126" r="6.5" fill="#2D3142" />
            <path d="M66 102q13-8 26-2" stroke="#2D3142" strokeWidth="5" strokeLinecap="round" fill="none" />
            <ellipse cx="100" cy="160" rx="8" ry="10" fill="#2D3142" />
            <text x="150" y="70" className={s.tanya} fill="#2D3142" fontSize="42" fontFamily="Fredoka, sans-serif">
              ?
            </text>
          </>
        ) : null}

        {mood === 'senang' || mood === 'semangat' ? (
          <>
            <circle cx="79" cy="124" r="15" fill="#FFFFFF" />
            <circle cx="121" cy="124" r="15" fill="#FFFFFF" />
            {mood === 'semangat' ? (
              <>
                <path d="M79 116l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="#2D3142" />
                <path d="M121 116l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="#2D3142" />
              </>
            ) : (
              <>
                <circle cx="80" cy="126" r="7" fill="#2D3142" />
                <circle cx="120" cy="126" r="7" fill="#2D3142" />
                <circle cx="83" cy="123" r="2.4" fill="#FFFFFF" />
                <circle cx="123" cy="123" r="2.4" fill="#FFFFFF" />
              </>
            )}
            <path
              d="M85 150q15 15 30 0"
              stroke="#2D3142"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : null}
      </g>
    </svg>
  )
}

interface BubbleProps {
  children: ReactNode
  className?: string
}

export function Bubble({ children, className }: BubbleProps) {
  return (
    <div className={[s.bubble, className].filter(Boolean).join(' ')}>
      <p>{children}</p>
    </div>
  )
}
