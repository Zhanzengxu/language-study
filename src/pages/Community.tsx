import { useState } from 'react';
import { MessageCircle, Send, Heart, Users, ThumbsUp, User } from 'lucide-react';

// Mock community posts
const mockPosts = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Just finished my first week of learning Japanese! The alphabet is challenging but so rewarding. がんばって! 🇯🇵',
    language: 'Japanese',
    likes: 24,
    comments: 8,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    author: 'Marco Rossi',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Any tips for practicing English conversation? I\'m looking for language exchange partners!',
    language: 'English',
    likes: 45,
    comments: 15,
    createdAt: '5 hours ago',
  },
  {
    id: '3',
    author: 'Emma Kim',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Finally mastered Hangul! Here\'s a tip: practice writing each letter while saying the sound out loud. 🎉',
    language: 'Korean',
    likes: 67,
    comments: 23,
    createdAt: '1 day ago',
  },
];

export default function Community() {
  const [newPost, setNewPost] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [posts, setPosts] = useState(mockPosts);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://i.pravatar.cc/150?img=4',
      content: newPost,
      language: selectedLanguage,
      likes: 0,
      comments: 0,
      createdAt: 'Just now',
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Community</h1>
          <p className="text-xl text-blue-100">Connect with fellow language learners around the world</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2 text-blue-600" /> Share Your Journey
          </h2>
          <form onSubmit={handleSubmitPost}>
            <div className="mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
              </select>
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What are you learning today? Share your progress, tips, or questions..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold flex items-center transition-colors"
              >
                <Send className="h-4 w-4 mr-2" /> Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">{post.author}</span>
                      <span className="text-gray-500 text-sm ml-2">• {post.createdAt}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {post.language}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-600" /> Our Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">12,543</p>
              <p className="text-gray-600">Active Learners</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">450,231</p>
              <p className="text-gray-600">Lessons Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-600">8,956</p>
              <p className="text-gray-600">Achievements Unlocked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">3</p>
              <p className="text-gray-600">Languages Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
