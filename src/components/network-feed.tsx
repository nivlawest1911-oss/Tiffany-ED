"use client"

import { useState } from "react"
import { MessageSquare, Heart, Share2, TrendingUp, Users, Filter } from "lucide-react"

const feedPosts = [
  {
    id: 1,
    author: "Dr. Sarah Mitchell",
    role: "District Superintendent",
    avatar: "SM",
    content:
      "Just completed our first Strategic Sync session with EdIntel. The compliance audit feature alone saved us 40+ hours this month. #ProfessionalEducation",
    likes: 847,
    comments: 156,
    shares: 89,
    time: "2h ago",
    trending: true,
  },
  {
    id: 2,
    author: "Marcus Thompson",
    role: "Special Education Coordinator",
    avatar: "MT",
    content:
      "The IEP Architect feature is a game-changer. Generated SMART goals in seconds that would have taken hours to craft manually. FERPA-compliant and legally sound.",
    likes: 523,
    comments: 94,
    shares: 67,
    time: "4h ago",
    trending: false,
  },
  {
    id: 3,
    author: "Jennifer Adams",
    role: "Principal",
    avatar: "JA",
    content:
      "Morning Intel briefing caught a legislative change that directly impacts our funding. Proactive policy adjustment complete. This is cognitive leadership in action.",
    likes: 1204,
    comments: 234,
    shares: 178,
    time: "6h ago",
    trending: true,
  },
]

const trendingTopics = [
  { tag: "#AIinEducation", posts: 2847 },
  { tag: "#ProfessionalLeadership", posts: 1923 },
  { tag: "#IEPAutomation", posts: 1456 },
  { tag: "#EdTechInnovation", posts: 987 },
]

export function NetworkFeed() {
  const [filter, setFilter] = useState("all")

  return (
    <section id="network-feed" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">Network Feed</h2>
          <p className="text-gray-400">Connect with the Professional community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent text-sm text-gray-300 border-none focus:outline-none"
                >
                  <option value="all">All Posts</option>
                  <option value="trending">Trending</option>
                  <option value="following">Following</option>
                </select>
              </div>
            </div>

            {feedPosts.map((post) => (
              <div key={post.id} className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#10b981] flex items-center justify-center text-white font-bold">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{post.author}</span>
                      {post.trending && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 rounded text-amber-400 text-[10px]">
                          <TrendingUp className="w-3 h-3" />
                          TRENDING
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{post.role}</p>
                    <p className="text-gray-200 mb-4">{post.content}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#00d2ff] transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#10b981] transition-colors">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </button>
                      <span className="ml-auto">{post.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#00d2ff]" />
                <h3 className="font-bold text-white">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic.tag}
                    className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <span className="text-[#00d2ff] font-medium">{topic.tag}</span>
                    <span className="text-xs text-gray-500">{topic.posts.toLocaleString()} posts</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#10b981]" />
                <h3 className="font-bold text-white">Community</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-black text-[#00d2ff]">47K</p>
                  <p className="text-xs text-gray-400">Educators</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-black text-[#10b981]">892</p>
                  <p className="text-xs text-gray-400">Districts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
