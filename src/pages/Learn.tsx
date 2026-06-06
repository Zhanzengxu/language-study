import { useState } from 'react';
import { BookOpen, Mic, Headphones, CheckCircle, ArrowRight, RefreshCcw } from 'lucide-react';

// Mock vocabulary data
const vocabulary = [
  { word: 'Hello', translation: 'こんにちは', pronunciation: 'Konnichiwa', example: 'Hello, how are you?' },
  { word: 'Thank you', translation: 'ありがとう', pronunciation: 'Arigatou', example: 'Thank you very much!' },
  { word: 'Goodbye', translation: 'さようなら', pronunciation: 'Sayonara', example: 'Goodbye, see you tomorrow!' },
  { word: 'Please', translation: 'お願いします', pronunciation: 'Onegaishimasu', example: 'Please, pass the salt.' },
  { word: 'Sorry', translation: 'すみません', pronunciation: 'Sumimasen', example: 'Sorry, I am late.' },
];

// Mock grammar exercises
const grammarExercises = [
  {
    question: 'Choose the correct form: I ___ (go) to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    correct: 0,
  },
  {
    question: 'She ___ (play) the piano beautifully.',
    options: ['play', 'plays', 'playing', 'played'],
    correct: 1,
  },
];

type LearningMode = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export default function Learn() {
  const [mode, setMode] = useState<LearningMode>('vocabulary');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentGrammarIndex, setCurrentGrammarIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const currentWord = vocabulary[currentWordIndex];
  const currentGrammar = grammarExercises[currentGrammarIndex];

  const nextWord = () => {
    setFlipped(false);
    setCurrentWordIndex((prev) => (prev + 1) % vocabulary.length);
  };

  const checkAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const nextGrammar = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentGrammarIndex((prev) => (prev + 1) % grammarExercises.length);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Interactive Learning</h1>
          <p className="text-xl text-blue-100">Practice and improve your language skills</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mode Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { mode: 'vocabulary', icon: BookOpen, label: 'Vocabulary' },
            { mode: 'grammar', icon: CheckCircle, label: 'Grammar' },
            { mode: 'speaking', icon: Mic, label: 'Speaking' },
            { mode: 'listening', icon: Headphones, label: 'Listening' },
          ].map(({ mode: m, icon: Icon, label }) => (
            <button
              key={m}
              onClick={() => setMode(m as LearningMode)}
              className={`p-6 rounded-xl transition-all ${
                mode === m
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-8 w-8 mx-auto mb-2" />
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>

        {/* Vocabulary Mode */}
        {mode === 'vocabulary' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">
                  Card {currentWordIndex + 1} of {vocabulary.length}
                </span>
              </div>
              
              <div 
                className="perspective-1000 cursor-pointer"
                onClick={() => setFlipped(!flipped)}
              >
                <div className={`relative h-64 transform-style-preserve-3d transition-transform duration-600 ${flipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center p-8">
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentWord.word}</h2>
                      <p className="text-gray-600 text-sm">Click to reveal translation</p>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center p-8 rotate-y-180">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentWord.translation}</h3>
                      <p className="text-lg text-gray-700 mb-4">/{currentWord.pronunciation}/</p>
                      <p className="text-gray-600 italic">"{currentWord.example}"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={nextWord}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center transition-colors"
                >
                  Next Card <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grammar Mode */}
        {mode === 'grammar' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">
                  Question {currentGrammarIndex + 1} of {grammarExercises.length}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                {currentGrammar.question}
              </h3>

              <div className="space-y-3">
                {currentGrammar.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && checkAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      showResult
                        ? index === currentGrammar.correct
                          ? 'bg-green-100 border-2 border-green-500 text-green-800'
                          : index === selectedAnswer
                            ? 'bg-red-100 border-2 border-red-500 text-red-800'
                            : 'bg-gray-100 text-gray-500'
                        : selectedAnswer === index
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 text-center">
                  <p className={`text-lg font-semibold mb-4 ${
                    selectedAnswer === currentGrammar.correct ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedAnswer === currentGrammar.correct ? 'Correct! 🎉' : 'Not quite. Try again!'}
                  </p>
                  <button
                    onClick={nextGrammar}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
                  >
                    Next Question <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Speaking Mode */}
        {mode === 'speaking' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Practice Speaking</h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
                <p className="text-lg text-gray-700 mb-4">Repeat after me:</p>
                <p className="text-3xl font-bold text-blue-600 mb-2">Hello, nice to meet you!</p>
                <p className="text-gray-600">/həˈləʊ, naɪs tə miːt juː/</p>
              </div>

              <button
                onClick={toggleRecording}
                className={`w-full py-6 rounded-xl font-semibold text-lg flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Mic className="h-8 w-8 mr-3" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>

              {isRecording && (
                <div className="mt-6">
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4">Recording in progress...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listening Mode */}
        {mode === 'listening' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Listening Practice</h3>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-8 mb-8">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center mx-auto transition-colors">
                  <Headphones className="h-6 w-6 mr-2" /> Play Audio
                </button>
              </div>

              <p className="text-gray-700 mb-4">What did you hear?</p>
              
              <div className="space-y-3">
                {['Good morning!', 'Good afternoon!', 'Good evening!', 'Good night!'].map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
