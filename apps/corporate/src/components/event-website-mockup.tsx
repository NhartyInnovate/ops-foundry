import React from 'react';
import Image from 'next/image';

interface EventWebsiteMockupProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function EventWebsiteMockup({
  imageSrc = '/images/selected-work/event-management-website-mockup.jpg',
  imageAlt = 'Illustrative event management website homepage mockup displayed inside a desktop browser frame',
  className = '',
}: EventWebsiteMockupProps) {
  return (
    <figure
      className={`group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl ${className}`}
      aria-label={imageAlt}
    >
      {/* 1. Desktop Browser Frame Chrome */}
      <div className="bg-slate-100 border-b border-slate-200/90 px-3.5 sm:px-4 py-2.5 flex items-center justify-between select-none">
        {/* Window Controls (macOS style) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
        </div>

        {/* Browser Address Bar */}
        <div className="flex-1 min-w-0 max-w-[190px] sm:max-w-[280px] mx-2 sm:mx-4 bg-white border border-slate-200 rounded-md px-2.5 sm:px-3 py-1 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-mono shadow-2xs">
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="truncate">statusevents.example/preview</span>
        </div>

        {/* Window Utility Actions (subtle icons) */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* 2. Mockup Viewport Canvas */}
      <div className="relative aspect-[828/464] w-full overflow-hidden bg-slate-900 select-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
      </div>

      {/* 3. Illustrative Mockup Caption */}
      <figcaption className="bg-slate-50 border-t border-slate-200/90 px-3.5 sm:px-4 py-2 flex flex-col xs:flex-row sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-500">
        <span className="font-medium text-slate-600">Illustrative Website Concept Mockup</span>
        <span className="text-[9px] sm:text-[10px] text-slate-400">Desktop Viewport Showcase</span>
      </figcaption>
    </figure>
  );
}
