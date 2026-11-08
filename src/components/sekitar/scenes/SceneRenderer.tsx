import type { ReactElement } from 'react'
import type { ContohUntungRugiAnimasi } from '../../../data/untungRugiAnimasi'
import s from './Scene.module.css'

type IdAdegan = ContohUntungRugiAnimasi['id']
type Adegan = ({ p }: { p: number }) => ReactElement

function Latar({ malam = false }: { malam?: boolean }) {
  return <><rect width="400" height="300" fill={malam ? '#DDEBFA' : '#EAF6FF'} /><circle cx="338" cy="54" r="24" fill="#FFD166" stroke="#2D3142" strokeWidth="2.5" /><path d="M0 236H400V300H0Z" fill="#BFE5C6" stroke="#2D3142" strokeWidth="2.5" /><path d="M0 255H400" stroke="#2D3142" strokeWidth="2.5" /></>
}

function EsKrim({ p }: { p: number }) {
  const jadi = Math.max(0, Math.min(1, (p - 0.42) / 0.48))
  const aduk = p < 0.68 ? Math.sin(p * Math.PI * 8) * 8 : 0

  return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#FFF8E9" />
      <path d="M0 222H400V300H0Z" fill="#E8CFAE" stroke="#2D3142" strokeWidth="3" />
      <path d="M38 222H362" stroke="#2D3142" strokeWidth="5" />

      <g opacity={1 - jadi}>
        <path d="M74 128h190l-16 89H90z" fill="#DDF4FF" stroke="#2D3142" strokeWidth="4" />
        <path d="M88 145h162l-12 61H99z" fill="#88D8F7" opacity=".45" />
        {[
          [104, 156, -10],
          [213, 158, 12],
          [104, 190, 8],
          [222, 191, -8],
        ].map(([x, y, r]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="30"
            height="27"
            rx="5"
            fill="#EAFBFF"
            stroke="#55BCEB"
            strokeWidth="3"
            transform={`rotate(${r} ${x + 15} ${y + 13})`}
          />
        ))}
        <path d="M141 136h58l-5 66h-48z" fill="#FFF7D6" stroke="#2D3142" strokeWidth="4" />
        <ellipse cx="170" cy="136" rx="29" ry="8" fill="#FFF2B6" stroke="#2D3142" strokeWidth="3" />
        <path
          d={`M170 132q${aduk} 17 0 35`}
          fill="none"
          stroke="#697386"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M170 132l24-48" stroke="#697386" strokeWidth="5" strokeLinecap="round" />
        <path d="M198 78l-9 17" stroke="#697386" strokeWidth="11" strokeLinecap="round" />
        <text x="169" y="249" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2D3142">
          Campuran cair + es
        </text>
      </g>

      <g opacity={jadi} transform={`translate(${(1 - jadi) * 16} 0)`}>
        <path d="M145 126h94l-47 98z" fill="#E8A83E" stroke="#2D3142" strokeWidth="4" />
        <path d="M157 153h70M166 139l51 55M218 139l-51 55" stroke="#B97820" strokeWidth="3" opacity=".75" />
        <circle cx="174" cy="111" r="35" fill="#FFB3CC" stroke="#2D3142" strokeWidth="4" />
        <circle cx="211" cy="111" r="35" fill="#FFF0B3" stroke="#2D3142" strokeWidth="4" />
        <path d="M160 106c8-18 24-22 35-17" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity=".55" />
        <text x="192" y="249" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2D3142">
          Es krim padat
        </text>
      </g>
    </svg>
  )
}
function Hujan({ p }: { p: number }) { const hujan = Math.max(0, (p - .55) / .45); return <svg viewBox="0 0 400 300"><Latar /><path d="M0 230C80 216 126 246 196 230S310 218 400 235V300H0Z" fill="#5CC8F5" stroke="#2D3142" strokeWidth="3" /><path d={`M105 ${200 - p * 70}q10-20 0-40M150 ${205 - p * 70}q12-20 0-40`} fill="none" stroke="#A7DFFF" strokeWidth="5" opacity={1 - hujan} /><path d="M164 100c14-22 44-18 53 2 22-10 42 8 37 28h-105c-5-18 1-26 15-30z" fill="#A9B8CC" stroke="#2D3142" strokeWidth="3" /><g stroke="#2F9BFF" strokeWidth="4" strokeLinecap="round" opacity={hujan}><path d="M172 142l-8 28M196 142l-7 36M220 142l-9 28M240 142l-7 36" /></g></svg> }
function Pakaian({ p }: { p: number }) { const kering = Math.max(0, (p - .35) / .55); return <svg viewBox="0 0 400 300"><Latar /><path d="M66 108H320M92 108v128M298 108v128" stroke="#2D3142" strokeWidth="5" /><path d="M180 120l-34 19 12 22 15-8v62h55v-62l15 8 12-22-34-19z" fill={kering > .7 ? '#FFD166' : '#5CC8F5'} stroke="#2D3142" strokeWidth="3" /><g fill="#5CC8F5" opacity={1 - kering}><circle cx="178" cy="222" r="9" /><circle cx="221" cy="235" r="8" /></g><path d="M170 120c-9-24 12-29 5-48M212 120c-9-23 14-26 5-46" stroke="#B5DDF7" strokeWidth="4" fill="none" opacity={kering} /></svg> }
function Garam({ p }: { p: number }) { const garam = Math.max(0, (p - .62) / .38); return <svg viewBox="0 0 400 300"><Latar /><path d="M56 210h286l-22 38H78z" fill="#E4B979" stroke="#2D3142" strokeWidth="3" /><path d={`M78 212h242v${20 * (1 - p)}H78z`} fill="#5CC8F5" /><g fill="#FFFFFF" opacity={garam}>{[120,150,184,220,251,280].map((x) => <circle key={x} cx={x} cy="223" r="5" />)}</g></svg> }
function Pendingin({ p }: { p: number }) { const es = 1 - p * .6; return <svg viewBox="0 0 400 300"><Latar /><rect x="72" y="144" width="250" height="88" rx="15" fill="#C9E9F8" stroke="#2D3142" strokeWidth="3" /><path d="M84 160h226v58H84z" fill="#8FC6D9" /><path d={`M132 196l${44 * es} 0 8-${36 * es}h-${44 * es}zM220 200l${38 * es} 0 7-${32 * es}h-${38 * es}z`} fill="#EAFBFF" stroke="#2D3142" strokeWidth="2" /></svg> }
function Kutub({ p }: { p: number }) {
  const susut = Math.max(0, Math.min(1, (p - 0.12) / 0.82))
  const lebarEs = 188 - susut * 92
  const xEs = 42 + susut * 24
  const xBeruang = 105 + susut * 92

  return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#DDF2FF" />
      <path d="M0 72l54-35 41 28 38-25 43 31 46-28 50 33 46-27 82 44V170H0Z" fill="#B8D8EC" />
      <path d="M0 192H400V300H0Z" fill="#56BDEB" stroke="#2D3142" strokeWidth="3" />
      <path d="M0 226q45-13 90 0t90 0 90 0 90 0 40 0" fill="none" stroke="#D9F4FF" strokeWidth="7" opacity=".8" />

      <path
        d={`M${xEs} 211l18-55h${lebarEs - 32}l24 55z`}
        fill="#F7FDFF"
        stroke="#2D3142"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M292 217l12-34h62l18 34z" fill="#F7FDFF" stroke="#2D3142" strokeWidth="4" />

      <g transform={`translate(${xBeruang} 0)`}>
        <ellipse cx="0" cy="164" rx="37" ry="25" fill="#FFFFFF" stroke="#2D3142" strokeWidth="4" />
        <circle cx="28" cy="151" r="21" fill="#FFFFFF" stroke="#2D3142" strokeWidth="4" />
        <circle cx="17" cy="133" r="7" fill="#FFFFFF" stroke="#2D3142" strokeWidth="3" />
        <circle cx="37" cy="133" r="7" fill="#FFFFFF" stroke="#2D3142" strokeWidth="3" />
        <circle cx="36" cy="151" r="3" fill="#2D3142" />
        <circle cx="46" cy="157" r="4" fill="#2D3142" />
        <path d="M-22 181v15M13 181v15" stroke="#2D3142" strokeWidth="7" strokeLinecap="round" />
      </g>

      <g opacity={susut}>
        <path d="M70 248c12-9 31-9 43 0M132 259c9-7 24-7 33 0" fill="none" stroke="#EAFBFF" strokeWidth="5" strokeLinecap="round" />
        <text x="200" y="285" textAnchor="middle" fontSize="18" fontWeight="800" fill="#174F72">
          Es menyusut, habitat berkurang
        </text>
      </g>
    </svg>
  )
}

function EsKrimLeleh({ p }: { p: number }) {
  const leleh = Math.max(0, Math.min(1, (p - 0.2) / 0.72))
  const tetes = Math.max(0, (leleh - 0.2) / 0.8)

  return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#FFF4D9" />
      <circle cx="330" cy="52" r="29" fill="#FFD166" stroke="#2D3142" strokeWidth="3" />
      <g stroke="#F5A524" strokeWidth="6" strokeLinecap="round">
        <path d="M330 10V0M330 104v-10M288 52h-12M384 52h-12M300 22l-9-9M369 91l-9-9" />
      </g>
      <path d="M0 226H400V300H0Z" fill="#D5C8B8" stroke="#2D3142" strokeWidth="3" />

      <path d="M178 126h86l-43 101z" fill="#E8A83E" stroke="#2D3142" strokeWidth="4" />
      <path d="M190 154h62M197 139l45 54M244 139l-45 54" stroke="#B97820" strokeWidth="3" />
      <path
        d={`M178 120c0-28 18-48 43-48s43 20 43 48c0 ${17 * leleh} -14 ${23 * leleh} -26 ${20 * leleh} -9 ${-2 * leleh} -13 ${20 * leleh} -26 ${16 * leleh} -14 ${-4 * leleh} -34 ${-5 * leleh} -34 ${-16 * leleh}z`}
        fill="#FF9AB6"
        stroke="#2D3142"
        strokeWidth="4"
      />
      <path d="M193 93c9-10 22-13 33-9" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity=".55" />

      <path
        d={`M244 132c0 ${18 * tetes} -3 ${35 * tetes} -3 ${48 * tetes}`}
        fill="none"
        stroke="#E85F8B"
        strokeWidth="10"
        strokeLinecap="round"
        opacity={tetes}
      />
      <ellipse cx="222" cy="235" rx={52 * tetes} ry={10 * tetes} fill="#E85F8B" stroke="#2D3142" strokeWidth={3 * tetes} />
      <text x="210" y="273" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2D3142">
        {leleh < 0.28 ? 'Es krim masih padat' : leleh < 0.78 ? 'Mulai mencair' : 'Meleleh menjadi cair'}
      </text>
    </svg>
  )
}
function Waduk({ p }: { p: number }) { const air = 1 - p * .85; return <svg viewBox="0 0 400 300"><Latar /><path d="M60 126h280v128H60z" fill="#C89B62" stroke="#2D3142" strokeWidth="3" /><path d={`M70 ${230 - air * 80}h260v${air * 80}H70z`} fill="#5CC8F5" /><path d="M96 241l20-15 18 17 22-15 28 16m38-3 22-17 24 18" stroke="#856040" strokeWidth="3" fill="none" opacity={p} /></svg> }
function Kaca({ p }: { p: number }) { const embun = Math.max(0, (p - .35) / .65); return <svg viewBox="0 0 400 300"><Latar malam /><rect x="84" y="56" width="232" height="180" rx="12" fill="#DDF4FF" stroke="#2D3142" strokeWidth="5" /><path d="M200 58v176M86 146h228" stroke="#2D3142" strokeWidth="4" /><g fill="#FFFFFF" opacity={embun}>{[120,150,230,268,178,255].map((x, i) => <circle key={x} cx={x} cy={100 + (i % 3) * 38} r="8" />)}</g><path d="M250 85l-58 105" stroke="#8FD4F1" strokeWidth="22" opacity={p > .82 ? .8 : 0} /></svg> }
function Cokelat({ p }: { p: number }) { const leleh = Math.max(0, (p - .35) / .65); return <svg viewBox="0 0 400 300"><Latar /><path d="M104 205c14-72 178-72 192 0v44H104z" fill="#F5A524" stroke="#2D3142" strokeWidth="3" /><rect x="150" y="122" width="100" height={65 - leleh * 38} rx="7" fill="#854D0E" stroke="#2D3142" strokeWidth="3" /><path d={`M160 ${165 - leleh * 25}h80M185 124v${42 - leleh * 23}M215 124v${42 - leleh * 23}`} stroke="#B77945" strokeWidth="3" /><path d={`M167 184c12 ${-5 + leleh * 18} 50 ${-5 + leleh * 18} 67 0`} stroke="#854D0E" strokeWidth={8 + leleh * 10} strokeLinecap="round" /></svg> }

const ADEGAN: Record<IdAdegan, Adegan> = { 'es-krim': EsKrim, hujan: Hujan, 'baju-kering': Pakaian, 'garam-laut': Garam, 'es-pendingin': Pendingin, 'es-kutub': Kutub, 'es-krim-leleh': EsKrimLeleh, kekeringan: Waduk, 'kaca-berembun': Kaca, 'cokelat-tas': Cokelat }
export function SceneRenderer({ id, progress, reducedMotion = false }: { id: IdAdegan; progress: number; reducedMotion?: boolean }) { const AdeganAktif = ADEGAN[id]; return <div className={s.sceneContainer} data-testid={`scene-${id}`}><AdeganAktif p={reducedMotion ? 1 : progress} /></div> }
