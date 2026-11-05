/** Static line-art yantra: used as the reduced-motion hero fallback and as page ornament. */
export function YantraLines({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" stroke="currentColor" strokeWidth=".45" aria-hidden>
      <circle r="96" /><circle r="92" /><circle r="70" />
      {petals.map((a) => <path key={a} d="M0-70 C10-80 6-88 0-92 C-6-88-10-80 0-70Z" transform={`rotate(${a})`} />)}
      {[0, 1, 2, 3, 4].map((i) => <path key={`u${i}`} d={`M0 ${-60 + i * 9} L${52 - i * 9} ${30 - i * 4} L${-52 + i * 9} ${30 - i * 4}Z`} />)}
      {[0, 1, 2, 3].map((i) => <path key={`d${i}`} d={`M0 ${58 - i * 10} L${48 - i * 9} ${-26 + i * 4} L${-48 + i * 9} ${-26 + i * 4}Z`} />)}
      <circle r="3" fill="currentColor" />
    </svg>
  );
}
