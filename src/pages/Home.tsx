import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/useStore';
import { BookOpen, Languages, Star, TrendingUp, ArrowRight } from 'lucide-react';

// Mock data since we don't have real Supabase yet
const mockCourses = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Start your English journey with basic vocabulary and grammar',
    language: 'english',
    level: 'beginner',
    duration: 20,
    image_url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
  },
  {
    id: '2',
    title: 'Japanese Conversation',
    description: 'Learn practical Japanese for daily conversations',
    language: 'japanese',
    level: 'intermediate',
    duration: 30,
    image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
  },
  {
    id: '3',
    title: 'Korean Fundamentals',
    description: 'Master Hangul and basic Korean expressions',
    language: 'korean',
    level: 'beginner',
    duration: 25,
    image_url: 'https://images.unsplash.com/photo-1534274988757-a28bf1a00c66?w=400',
  },
];

const languages = [
  { name: 'English', icon: '🇬🇧', value: 'english' },
  { name: 'Japanese', icon: '🇯🇵', value: 'japanese' },
  { name: 'Korean', icon: '🇰🇷', value: 'korean' },
  { name: 'Spanish', icon: '🇪🇸', value: 'spanish' },
];

export default function Home() {
  const { setCurrentLanguage, isAuthenticated } = useStore();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: string) => {
    setCurrentLanguage(lang);
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Languages with
            <span className="text-blue-600"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Immersive learning experience with interactive lessons, real-time progress tracking,
            and a supportive community of language learners.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/courses"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <Link
              to="/courses"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg inline-flex items-center"
            >
              Continue Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Language
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageSelect(lang.value)}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-200"
              >
                <span className="text-5xl mb-4 block">{lang.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{lang.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose LinguaLearn?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Structured Courses</h3>
              <p className="text-gray-600">
                Progressive learning paths from beginner to advanced levels
              </p>
            </div>
            <div className="text-center p-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Languages className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with flashcards, quizzes, speaking practice, and more
              </p>
            </div>
            <div className="text-center p-8">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics and achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
              >
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" /> {course.duration}h
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Link
                    to="/courses"
                    className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                  >
                    View Course <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
