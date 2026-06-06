import { Trophy, BookOpen, Clock, Star, Target, Calendar, Zap } from 'lucide-react';

// Mock progress data
const progressData = {
  totalStudyTime: 45, // hours
  wordsLearned: 320,
  lessonsCompleted: 45,
  streak: 7, // days
  courses: [
    {
      id: '1',
      title: 'English for Beginners',
      progress: 75,
      lessonsCompleted: 30,
      totalLessons: 40,
    },
    {
      id: '2',
      title: 'Japanese Conversation',
      progress: 35,
      lessonsCompleted: 16,
      totalLessons: 45,
    },
  ],
  achievements: [
    { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🏆', unlocked: true },
    { id: '2', name: 'Week Warrior', description: 'Study for 7 days in a row', icon: '🔥', unlocked: true },
    { id: '3', name: 'Word Master', description: 'Learn 100 words', icon: '📚', unlocked: true },
    { id: '4', name: 'Polyglot', description: 'Start learning 2 languages', icon: '🌍', unlocked: false },
    { id: '5', name: 'Speed Learner', description: 'Complete 5 lessons in one day', icon: '⚡', unlocked: false },
    { id: '6', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '⭐', unlocked: true },
  ],
  weeklyActivity: [60, 45, 90, 75, 120, 80, 65], // minutes per day
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Progress() {
  const maxActivity = Math.max(...progressData.weeklyActivity);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Your Learning Progress</h1>
          <p className="text-xl text-blue-100">Track your journey and celebrate your achievements</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{progressData.totalStudyTime}</p>
            <p className="text-gray-600">Hours Studied</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{progressData.wordsLearned}</p>
            <p className="text-gray-600">Words Learned</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{progressData.lessonsCompleted}</p>
            <p className="text-gray-600">Lessons Done</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{progressData.streak}</p>
            <p className="text-gray-600">Day Streak</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" /> Weekly Activity
            </h2>
            <div className="flex items-end justify-between h-48 gap-2">
              {progressData.weeklyActivity.map((minutes, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(minutes / maxActivity) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{days[index]}</p>
                  <p className="text-xs text-gray-500">{minutes}m</p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-green-600" /> Course Progress
            </h2>
            <div className="space-y-6">
              {progressData.courses.map((course) => (
                <div key={course.id}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className="text-blue-600 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {course.lessonsCompleted} of {course.totalLessons} lessons completed
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-600" /> Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl text-center transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-300'
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <span className="text-4xl mb-3 block">{achievement.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-3">
                    <Star className="h-5 w-5 text-yellow-500 mx-auto fill-current" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
