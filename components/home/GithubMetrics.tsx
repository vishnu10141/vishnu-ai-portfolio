import { fetchGithubStats } from '@/lib/github';
import { Info } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

export async function GithubMetrics() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'nvishnu1014';
  const stats = await fetchGithubStats(username);

  return (
    <section className="pb-24 pt-0 relative bg-[#020817]">
      <div className="container-width max-w-6xl mx-auto">
        <div className="rounded-2xl bg-[#0a1020] border border-[rgba(255,255,255,0.05)] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-blue-500/30">
          {/* Left side */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <GithubIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#020817]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Metrics</span>
              </h2>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  <Info className="w-3.5 h-3.5 opacity-70" />
                  <span>GitHub metrics are currently unavailable.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  <Info className="w-3.5 h-3.5 opacity-70" />
                  <span>Please check your GITHUB_PAT or username.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] text-white text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/10 whitespace-nowrap"
          >
            <GithubIcon className="w-5 h-5" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
