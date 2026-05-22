'use client';

import { Send, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 relative bg-[#020817]">
      <div className="container-width">
        <div className="rounded-2xl bg-[#0a1020] border border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between p-6 lg:p-8">
          
          {/* Left section */}
          <div className="flex items-center gap-5 md:pr-10 md:border-r border-[rgba(255,255,255,0.05)] w-full md:w-auto">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 text-[var(--color-blue-400)] flex-shrink-0">
              <Send className="w-5 h-5 -ml-1 mt-1" />
            </div>
            <div>
              <h3 className="text-xl text-white tracking-wide">
                Let's build something <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">meaningful.</span>
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Open to research collaborations and exciting opportunities.
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-5 mt-6 md:mt-0 w-full md:w-auto md:pl-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-violet-500)]/10 text-[var(--color-violet-400)] flex-shrink-0 border border-[var(--color-violet-500)]/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <a href="mailto:you@email.com" className="text-base font-semibold text-[var(--color-blue-400)] hover:text-white transition-colors">
                you@email.com
              </a>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                Open to new opportunities
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
