import React from 'react';

interface LogoProps {
  className?: string;
  showStore?: boolean;
}

export default function Logo({ className = "text-3xl", showStore = true }: LogoProps) {
  return (
    <span className={`inline-flex flex-col items-stretch font-sans font-bold tracking-tight text-white leading-none ${className}`}>
      <span>z<span className="w-[0.65em] h-[0.65em] rounded-full bg-cyan inline-block mx-[0.04em]"></span>nke</span>
      {showStore && (
        <span className="flex justify-between w-full text-[0.3em] font-normal uppercase mt-[0.2em] text-cyan">
          <span>s</span><span>t</span><span>o</span><span>r</span><span>e</span>
        </span>
      )}
    </span>
  );
}
