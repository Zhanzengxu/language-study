import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/useStore';
import { Search, Filter, BookOpen, Clock, Star, ArrowRight } from 'lucide-react';

// Mock courses data
const allCourses = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Start your English journey with basic vocabulary, simple grammar, and everyday conversations.',
    language: 'english',
    level: 'beginner',
    duration: 20,
    lessons: 40,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
  },
  {
    id: '2',
    title: 'Business English',
    description: 'Master professional communication for meetings, presentations, and emails.',
    language: 'english',
    level: 'intermediate',
    duration: 30,
    lessons: 50,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
  },
  {
    id: '3',
    title: 'Japanese Conversation',
    description: 'Learn practical Japanese for daily conversations, travel, and making friends.',
    language: 'japanese',
    level: 'intermediate',
    duration: 25,
    lessons: 45,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
  },
  {
    id: '4',
    title: 'Korean Fundamentals',
    description: 'Master Hangul, basic vocabulary, and essential Korean expressions.',
    language: 'korean',
    level: 'beginner',
    duration: 15,
    lessons: 30,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1534274988757-a28bf1a00c66?w=400',
  },
  {
    id: '5',
    title: 'Japanese for Travelers',
    description: 'Essential Japanese phrases and cultural tips for your trip to Japan.',
    language: 'japanese',
    level: 'beginner',
    duration: 10,
    lessons: 20,
    rating: 4.6,
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
  },
  {
    id: '6',
    title: 'Advanced English Grammar',
    description: 'Master complex grammar structures and refine your writing skills.',
    language: 'english',
    level: 'advanced',
    duration: 35,
    lessons: 60,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
  },
];

const languages = ['All', 'English', 'Japanese', 'Korean'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const navigate = useNavigate();

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || course.language === selectedLanguage.toLowerCase();
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel.toLowerCase();
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  const handleStartCourse = (courseId: string) => {
    navigate(`/learn?course=${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-blue-100">Find the perfect course for your language learning journey</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-yellow-600 flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" /> {course.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'beginner' ? 'bg-green-100 text-green-600' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {course.duration}h
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" /> {course.lessons} lessons
                    </span>
                    <span className="capitalize">{course.language}</span>
                  </div>
                  <button
                    onClick={() => handleStartCourse(course.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
