import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  fork: boolean
  updated_at: string
}

type Profile = {
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
  name: string | null
  login: string
}

export default function GitHubShowcase({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [profileRes, reposRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`),
        ])
        if (!mounted) return
        setProfile(profileRes.data)
        const filtered = (reposRes.data as Repo[])
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 8)
        setRepos(filtered)
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load GitHub data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [username])

  if (loading) {
    return <div className="text-white/50">Loading GitHub data...</div>
  }

  if (error) {
    return <div className="text-red-400">{error}</div>
  }

  if (!profile) return null

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <img src={profile.avatar_url} alt={username} className="h-16 w-16 rounded-full border border-white/10" />
        <div>
          <a href={profile.html_url} target="_blank" className="font-display text-2xl font-bold hover:text-primary-400 transition">
            {profile.name ?? profile.login}
          </a>
          <p className="text-white/60 text-sm max-w-2xl">{profile.bio}</p>
          <div className="text-white/50 text-xs mt-1">
            {profile.public_repos} repos · {profile.followers} followers · {profile.following} following
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {repos.map((repo, i) => (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:border-primary-400 hover:shadow-glow transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{repo.name}</h3>
              <span className="text-xs text-white/50">★ {repo.stargazers_count}</span>
            </div>
            {repo.description && (
              <p className="text-sm text-white/60 mt-2 line-clamp-3">{repo.description}</p>
            )}
            <div className="text-xs text-white/40 mt-3">
              {repo.language ?? '—'} · Updated {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
