export default function MarqueeFooter() {
  const text = 'ZONKE STORE — KING OF STREETWEAR — EST. 2011 — CERTIFIED IN HEAVEN & MADE IN SOUTH AFRICA — ';
  const repeated = text.repeat(6);

  return (
    <footer className="bg-transparent border-t border-white/5 text-white py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-display text-2xl md:text-4xl tracking-wider">{repeated}</span>
        <span className="font-display text-2xl md:text-4xl tracking-wider">{repeated}</span>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-white/50 tracking-widest">
          © 2026 ZONKE STORE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 font-sans text-xs text-white/50 tracking-widest">
          <span className="cursor-pointer hover:text-cyan transition-colors">PRIVACY</span>
          <span className="cursor-pointer hover:text-cyan transition-colors">TERMS</span>
          <span className="cursor-pointer hover:text-cyan transition-colors">RETURNS</span>
        </div>
      </div>
    </footer>
  );
}
