'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy widgets to preserve Lighthouse scores and initial bundle size (Requirements 1, 2)
const TerminalOverlay = dynamic(() => import('./TerminalOverlay').then(mod => mod.TerminalOverlay), {
  ssr: false,
});

const ChatbotWidget = dynamic(() => import('./ChatbotWidget').then(mod => mod.ChatbotWidget), {
  ssr: false,
});

export function FloatingWidgets() {
  return (
    <>
      <TerminalOverlay />
    </>
  );
}
