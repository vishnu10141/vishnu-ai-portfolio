'use client';

import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Briefcase, ArrowRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nvishnu1014@gmail.com',
    href: 'mailto:nvishnu1014@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Andhra Pradesh, India',
  },
  {
    icon: Briefcase,
    label: 'Open to',
    value: 'AI Engineer, ML Engineer, Research Roles',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 bg-[#060d1b]">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: CTA */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <span className="text-white">Let&apos;s Build </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Something Amazing
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-base max-w-md leading-relaxed"
            >
              Get in touch for collaborations, projects, or just a friendly hello.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="mailto:nvishnu1014@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Contact Me
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: Contact details */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#081120]/70 border border-white/[0.06]"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] text-slate-500 font-medium tracking-wide uppercase">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
