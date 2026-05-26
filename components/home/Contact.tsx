'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Briefcase, Clock, Copy, Navigation, User, Send, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="w-full pt-32 pb-32">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500">GET IN TOUCH</span>
              <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Let's Build<br />Something <span className="relative text-blue-500 inline-block">
                Amazing
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-[15px] text-slate-400 leading-relaxed mb-10 max-w-md">
              I'm always open to discussing new opportunities, collaborations, or interesting projects.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              {/* Email Card */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white mb-0.5">Email</h4>
                    <p className="text-[13px] text-slate-400">nvishnu1014@gmail.com</p>
                  </div>
                </div>
                <Copy className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </div>

              {/* Location Card */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white mb-0.5">Location</h4>
                    <p className="text-[13px] text-slate-400">Andhra Pradesh, India</p>
                  </div>
                </div>
                <Navigation className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </div>

              {/* Role Card */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white mb-0.5">Role</h4>
                    <p className="text-[13px] text-slate-400">AI Engineer, ML Engineer, Research Roles</p>
                  </div>
                </div>
                <User className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </div>

              {/* Availability Card */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white mb-0.5">Availability</h4>
                    <p className="text-[13px] text-slate-400">Open to new opportunities</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-green-500">Available</span>
                </div>
              </div>
            </div>

            {/* Impact Banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/40 to-blue-800/10 border border-blue-500/20 p-5 flex items-center gap-5">
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-blue-500/20">
                <Rocket className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">Let's create impact together.</h4>
                <p className="text-[12px] text-slate-300 leading-snug">
                  Whether it's a project, partnership, or just a conversation — I'd love to hear from you!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#020611]/80 backdrop-blur-xl p-8 relative overflow-hidden shadow-2xl">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
              <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle fill="#ffffff" cx="2" cy="2" r="1"></circle>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-0.5">Send Me a Message</h3>
                  <p className="text-[13px] text-slate-400">I'll get back to you as soon as possible.</p>
                </div>
              </div>

              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5 border border-white/10 bg-[#0a101d] rounded-xl p-3 focus-within:border-blue-500/50 transition-colors">
                    <label htmlFor="name" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-3 h-3" /> Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-slate-600 w-full"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 border border-white/10 bg-[#0a101d] rounded-xl p-3 focus-within:border-blue-500/50 transition-colors">
                    <label htmlFor="email" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-slate-600 w-full"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5 border border-white/10 bg-[#0a101d] rounded-xl p-3 focus-within:border-blue-500/50 transition-colors">
                  <label htmlFor="subject" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Navigation className="w-3 h-3" /> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What's this about?"
                    className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-slate-600 w-full"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 border border-white/10 bg-[#0a101d] rounded-xl p-3 focus-within:border-blue-500/50 transition-colors h-32">
                  <label htmlFor="message" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Copy className="w-3 h-3" /> Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="bg-transparent border-none outline-none text-[14px] text-white placeholder:text-slate-600 w-full resize-none h-full"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
