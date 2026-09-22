import React from 'react';

interface LogoProps {
  className?: string;
  showStore?: boolean;
}

export default function Logo({ className = "text-3xl", showStore = true }: LogoProps) {
  return (
    <span className={`font-sans font-bold tracking-tight text-white leading-none ${className}`}>
      z<span className="w-[0.65em] h-[0.65em] rounded-full bg-cyan inline-block mx-[0.04em]"></span>nke
      {/* {showStore && <span className="ml-[0.2em] font-normal">store</span>} */}
    </span>
  );
}
