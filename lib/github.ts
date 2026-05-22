// GitHub API utilities using caching

export interface GithubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
}

export async function fetchGithubStats(username: string): Promise<GithubStats | null> {
  const token = process.env.GITHUB_PAT;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!userRes.ok) return null;
    const userData = await userRes.json();

    // Fetch repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!reposRes.ok) return null;
    const reposData = await reposRes.json();

    let totalStars = 0;
    const langMap: Record<string, number> = {};

    reposData.forEach((repo: any) => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));

    return {
      followers: userData.followers,
      publicRepos: userData.public_repos,
      totalStars,
      topLanguages,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return null;
  }
}
