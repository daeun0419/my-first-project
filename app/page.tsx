"use client";

import { useState } from "react";

const PROFILE_EMOJIS = ["🌸", "🌼", "🌻", "🌺", "🌹", "💐"];

const FAVORITES = [
  {
    id: 0,
    emoji: "🌿",
    title: "느좋",
    description: "느리고 좋은 모든 것들\n여유로운 시간이 최고야",
    gradient: "from-emerald-100 to-green-200",
    shadowColor: "hover:shadow-emerald-200",
    titleColor: "text-emerald-800",
    descColor: "text-emerald-600",
    badgeColor: "bg-emerald-400",
  },
  {
    id: 1,
    emoji: "☀️",
    title: "날씨 좋은 날 산책",
    description: "맑은 하늘 아래\n천천히 걷는 그 시간",
    gradient: "from-amber-100 to-yellow-200",
    shadowColor: "hover:shadow-amber-200",
    titleColor: "text-amber-800",
    descColor: "text-amber-600",
    badgeColor: "bg-amber-400",
  },
  {
    id: 2,
    emoji: "🎬",
    title: "영화보기",
    description: "좋은 영화 한 편과\n아늑하게 보내는 시간",
    gradient: "from-violet-100 to-purple-200",
    shadowColor: "hover:shadow-violet-200",
    titleColor: "text-violet-800",
    descColor: "text-violet-600",
    badgeColor: "bg-violet-400",
  },
  {
    id: 3,
    emoji: "✨",
    title: "소소한 일상",
    description: "그냥 느좋인 거\n다 좋아함니다",
    gradient: "from-pink-100 to-rose-200",
    shadowColor: "hover:shadow-pink-200",
    titleColor: "text-pink-800",
    descColor: "text-pink-600",
    badgeColor: "bg-pink-400",
  },
];

const MESSAGES = [
  "바이브 코딩 열시미 배워보겠슴니다 ! 다들 화이팅 🔥",
  "오늘도 화이팅 !! ✨",
  "우리 같이 잘 할 수 있어요 💪",
  "느좋이 최고야 🌸",
];

export default function Home() {
  const [profileEmojiIdx, setProfileEmojiIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [favLiked, setFavLiked] = useState<Record<number, boolean>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  function handleProfileEmoji() {
    setProfileEmojiIdx((prev) => (prev + 1) % PROFILE_EMOJIS.length);
  }

  function handleLike() {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  }

  function handleMsg() {
    setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
  }

  function toggleFavLike(id: number) {
    setFavLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setFlipped((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setFlipped((prev) => ({ ...prev, [id]: false })), 300);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-300 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* 상단 배너 */}
          <div className="h-24 bg-gradient-to-r from-sky-400 to-blue-500" />

          <div className="px-8 pb-8 -mt-12 text-center">
            <button
              onClick={handleProfileEmoji}
              className="text-7xl block mx-auto mb-3 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none drop-shadow-md"
              title="클릭해보세요!"
            >
              {PROFILE_EMOJIS[profileEmojiIdx]}
            </button>
            <h1 className="text-4xl font-bold text-sky-600 mb-1">전다은</h1>
            <p className="text-gray-400 text-sm mb-5">느리게 · 좋게 · 행복하게</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleLike}
                className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm ${
                  liked
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-pink-200 shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-400"
                }`}
              >
                {liked ? "❤️" : "🤍"} 좋아요
                {likeCount > 0 && <span className="ml-1.5 font-bold">{likeCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 px-1 drop-shadow-md">
            ✨ 좋아하는 것들
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {FAVORITES.map((fav) => (
              <div
                key={fav.id}
                onClick={() => toggleFavLike(fav.id)}
                className={`bg-gradient-to-br ${fav.gradient} rounded-2xl p-5 shadow-md hover:shadow-xl ${fav.shadowColor} transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden`}
              >
                {/* 배경 장식 원 */}
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white opacity-20 transition-transform duration-300 group-hover:scale-150" />

                <div
                  className={`text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block ${
                    flipped[fav.id] ? "scale-125" : ""
                  }`}
                >
                  {fav.emoji}
                </div>
                <h3 className={`font-bold text-base mb-1.5 ${fav.titleColor}`}>
                  {fav.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed whitespace-pre-line ${fav.descColor}`}
                >
                  {fav.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${fav.badgeColor}`}
                  >
                    #취향
                  </span>
                  <span
                    className={`text-lg transition-all duration-200 inline-block ${
                      flipped[fav.id] ? "scale-125" : ""
                    }`}
                  >
                    {favLiked[fav.id] ? "❤️" : "🤍"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Box */}
        <button
          onClick={handleMsg}
          className="w-full bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl p-5 text-left shadow-md transition-all duration-200 active:scale-95 group"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div className="flex-1">
              <p className="text-sky-700 font-semibold text-base leading-relaxed">
                {MESSAGES[msgIndex]}
              </p>
              <p className="text-sky-400 text-xs mt-2 group-hover:text-sky-500 transition-colors">
                탭해서 다음 메시지 →
              </p>
            </div>
          </div>
        </button>

      </div>
    </main>
  );
}
