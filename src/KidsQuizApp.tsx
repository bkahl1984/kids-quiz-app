import React, { useState } from 'react';
import { Star, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

interface QuestionResult {
  correct: boolean;
}

const KidsQuizApp: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const allQuestions: Question[] = [
    { question: "What is 1 + 1?", options: ["1", "2", "3", "4"], correct: 1, emoji: "➕" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1, emoji: "➕" },
    { question: "What is 3 + 1?", options: ["5", "6", "3", "4"], correct: 3, emoji: "➕" },
    { question: "What is 2 + 3?", options: ["5", "4", "6", "7"], correct: 0, emoji: "➕" },
    { question: "What is 4 + 2?", options: ["5", "6", "7", "8"], correct: 1, emoji: "➕" },
    { question: "What is 3 + 3?", options: ["6", "5", "7", "8"], correct: 0, emoji: "➕" },
    { question: "What is 5 + 2?", options: ["6", "7", "8", "9"], correct: 1, emoji: "➕" },
    { question: "What is 4 + 4?", options: ["6", "7", "8", "9"], correct: 2, emoji: "➕" },
    { question: "What is 5 + 3?", options: ["8", "7", "9", "10"], correct: 0, emoji: "➕" },
    { question: "What is 6 + 3?", options: ["11", "9", "8", "10"], correct: 1, emoji: "➕" },
    { question: "What is 5 + 4?", options: ["9", "8", "10", "7"], correct: 0, emoji: "➕" },
    { question: "What is 7 + 2?", options: ["8", "9", "10", "11"], correct: 1, emoji: "➕" },
    { question: "What is 6 + 4?", options: ["9", "10", "11", "12"], correct: 1, emoji: "➕" },
    { question: "What is 8 + 2?", options: ["10", "9", "11", "12"], correct: 0, emoji: "➕" },
    { question: "What is 7 + 3?", options: ["9", "10", "11", "12"], correct: 1, emoji: "➕" },
    { question: "What is 2 - 1?", options: ["0", "1", "2", "3"], correct: 1, emoji: "➖" },
    { question: "What is 3 - 2?", options: ["2", "0", "3", "1"], correct: 3, emoji: "➖" },
    { question: "What is 4 - 1?", options: ["2", "3", "4", "5"], correct: 1, emoji: "➖" },
    { question: "What is 5 - 2?", options: ["3", "2", "4", "5"], correct: 0, emoji: "➖" },
    { question: "What is 6 - 3?", options: ["2", "3", "4", "5"], correct: 1, emoji: "➖" },
    { question: "What is 7 - 4?", options: ["5", "2", "3", "4"], correct: 2, emoji: "➖" },
    { question: "What is 8 - 3?", options: ["4", "5", "6", "7"], correct: 1, emoji: "➖" },
    { question: "What is 10 - 5?", options: ["5", "3", "4", "6"], correct: 0, emoji: "➖" },
    { question: "What is 9 - 4?", options: ["4", "5", "6", "7"], correct: 1, emoji: "➖" },
    { question: "What is 10 - 7?", options: ["2", "3", "4", "5"], correct: 1, emoji: "➖" },
    { question: "What is 8 - 5?", options: ["3", "2", "4", "5"], correct: 0, emoji: "➖" },
    { question: "What is 9 - 6?", options: ["2", "3", "4", "5"], correct: 1, emoji: "➖" },
    { question: "What is 10 - 4?", options: ["6", "5", "7", "8"], correct: 0, emoji: "➖" },
    { question: "What is 7 - 3?", options: ["3", "4", "5", "6"], correct: 1, emoji: "➖" },
    { question: "What is 9 - 5?", options: ["4", "3", "5", "6"], correct: 0, emoji: "➖" },
    { question: "What comes next? 🔴 🔵 🔴 🔵 ?", options: ["🔴", "🔵", "🟢", "🟡"], correct: 0, emoji: "🎨" },
    { question: "What comes next? 🐶 🐱 🐶 🐱 ?", options: ["🐭", "🐶", "🐱", "🐰"], correct: 1, emoji: "🐾" },
    { question: "What comes next? ⭐ ⭐ 🌙 ⭐ ⭐ ?", options: ["⭐", "🌙", "☀️", "🌟"], correct: 1, emoji: "✨" },
    { question: "What comes next? 🍎 🍌 🍎 🍌 ?", options: ["🍎", "🍌", "🍇", "🍊"], correct: 0, emoji: "🍏" },
    { question: "What comes next? 1, 2, 1, 2, ?", options: ["1", "2", "3", "4"], correct: 0, emoji: "🔢" },
    { question: "What comes next? A, B, A, B, ?", options: ["A", "B", "C", "D"], correct: 0, emoji: "🔤" },
    { question: "What comes next? 🟦 🟩 🟦 🟩 ?", options: ["🟩", "🟦", "🟥", "🟨"], correct: 1, emoji: "🎨" },
    { question: "What comes next? 🌞 🌝 🌞 🌝 ?", options: ["🌞", "🌝", "⭐", "🌙"], correct: 0, emoji: "🌅" },
    { question: "What comes next? 🚗 🚕 🚗 🚕 ?", options: ["🚙", "🚗", "🚕", "🚐"], correct: 1, emoji: "🚦" },
    { question: "What comes next? ❤️ 💙 ❤️ 💙 ?", options: ["❤️", "💙", "💚", "💛"], correct: 0, emoji: "💕" },
    { question: "What comes next? 🌸 🌺 🌸 🌺 ?", options: ["🌸", "🌺", "🌼", "🌻"], correct: 0, emoji: "🌷" },
    { question: "What comes next? 1, 2, 3, 1, 2, 3, ?", options: ["1", "2", "3", "4"], correct: 0, emoji: "🔢" },
    { question: "What comes next? 🎈 🎈 🎁 🎈 🎈 ?", options: ["🎁", "🎈", "🎉", "🎊"], correct: 0, emoji: "🎪" },
    { question: "What comes next? 🦋 🐝 🦋 🐝 ?", options: ["🦋", "🐝", "🐛", "🐞"], correct: 0, emoji: "🌺" },
    { question: "What comes next? 🏀 ⚽ 🏀 ⚽ ?", options: ["🏀", "⚽", "🏈", "⚾"], correct: 0, emoji: "⛹️" },
    { question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correct: 1, emoji: "🔺" },
    { question: "How many sides does a square have?", options: ["3", "4", "5", "6"], correct: 1, emoji: "🟦" },
    { question: "How many sides does a circle have?", options: ["0", "1", "2", "3"], correct: 0, emoji: "⭕" },
    { question: "Which shape is round?", options: ["Square", "Triangle", "Circle", "Star"], correct: 2, emoji: "🔴" },
    { question: "Which shape has 4 equal sides?", options: ["Triangle", "Square", "Circle", "Star"], correct: 1, emoji: "🟨" },
    { question: "How many points does a star have?", options: ["3", "4", "5", "6"], correct: 2, emoji: "⭐" },
    { question: "Which shape has 3 corners?", options: ["Circle", "Square", "Triangle", "Heart"], correct: 2, emoji: "🔺" },
    { question: "How many corners does a square have?", options: ["2", "3", "4", "5"], correct: 2, emoji: "🟦" },
    { question: "Which shape has no corners?", options: ["Square", "Circle", "Triangle", "Star"], correct: 1, emoji: "⭕" },
    { question: "How many sides does a rectangle have?", options: ["3", "4", "5", "6"], correct: 1, emoji: "▭" },
    { question: "Which is a 3D shape?", options: ["Circle", "Square", "Sphere", "Triangle"], correct: 2, emoji: "⚽" },
    { question: "What shape is a ball?", options: ["Cube", "Sphere", "Cone", "Cylinder"], correct: 1, emoji: "🏀" },
    { question: "How many faces does a cube have?", options: ["4", "5", "6", "8"], correct: 2, emoji: "🎲" },
    { question: "What shape is a book?", options: ["Circle", "Rectangle", "Triangle", "Star"], correct: 1, emoji: "📖" },
    { question: "What shape is a pizza slice?", options: ["Square", "Circle", "Triangle", "Rectangle"], correct: 2, emoji: "🍕" },
    { question: "What planet do we live on?", options: ["Mars", "Earth", "Moon", "Sun"], correct: 1, emoji: "🌍" },
    { question: "What do plants need to grow?", options: ["Sunlight", "Candy", "Ice", "Toys"], correct: 0, emoji: "🌱" },
    { question: "What makes rain?", options: ["Cars", "Clouds", "Birds", "Trees"], correct: 1, emoji: "☁️" },
    { question: "Which is the hottest?", options: ["Ice", "Snow", "Sun", "Water"], correct: 2, emoji: "☀️" },
    { question: "What do we breathe?", options: ["Air", "Water", "Food", "Juice"], correct: 0, emoji: "💨" },
    { question: "How many legs does a spider have?", options: ["4", "6", "8", "10"], correct: 2, emoji: "🕷️" },
    { question: "What helps birds fly?", options: ["Legs", "Wings", "Tail", "Beak"], correct: 1, emoji: "🦅" },
    { question: "What do fish use to breathe?", options: ["Gills", "Nose", "Lungs", "Mouth"], correct: 0, emoji: "🐠" },
    { question: "What melts in the sun?", options: ["Rock", "Ice", "Wood", "Metal"], correct: 1, emoji: "🧊" },
    { question: "What gives us light at night?", options: ["Trees", "Clouds", "Moon", "Grass"], correct: 2, emoji: "🌙" },
    { question: "How many legs does a dog have?", options: ["2", "3", "4", "5"], correct: 2, emoji: "🐕" },
    { question: "What color is the sky on a sunny day?", options: ["Red", "Blue", "Green", "Yellow"], correct: 1, emoji: "🌤️" },
    { question: "What season is the coldest?", options: ["Spring", "Summer", "Fall", "Winter"], correct: 3, emoji: "❄️" },
    { question: "What do bees make?", options: ["Milk", "Honey", "Juice", "Water"], correct: 1, emoji: "🐝" },
    { question: "Where do fish live?", options: ["Trees", "Water", "Sky", "Ground"], correct: 1, emoji: "🐟" },
    { question: "What letter comes after A?", options: ["B", "C", "D", "E"], correct: 0, emoji: "🔤" },
    { question: "What letter comes before D?", options: ["A", "B", "C", "E"], correct: 2, emoji: "🔤" },
    { question: "What is the first letter of the alphabet?", options: ["B", "C", "A", "D"], correct: 2, emoji: "🔤" },
    { question: "What letter comes after E?", options: ["F", "D", "G", "H"], correct: 0, emoji: "🔤" },
    { question: "What letter comes between M and O?", options: ["L", "N", "P", "Q"], correct: 1, emoji: "🔤" },
    { question: "What is the last letter of the alphabet?", options: ["X", "Y", "Z", "W"], correct: 2, emoji: "🔤" },
    { question: "What letter comes after P?", options: ["O", "Q", "R", "S"], correct: 1, emoji: "🔤" },
    { question: "What letter comes after T?", options: ["U", "S", "V", "W"], correct: 0, emoji: "🔤" },
    { question: "What letter comes before B?", options: ["A", "C", "D", "E"], correct: 0, emoji: "🔤" },
    { question: "What letter comes after R?", options: ["Q", "S", "T", "U"], correct: 1, emoji: "🔤" },
    { question: "What letter comes between F and H?", options: ["E", "G", "I", "J"], correct: 1, emoji: "🔤" },
    { question: "What letter comes after W?", options: ["V", "X", "Y", "Z"], correct: 1, emoji: "🔤" },
    { question: "How many cents is a penny?", options: ["1¢", "5¢", "10¢", "25¢"], correct: 0, emoji: "🪙" },
    { question: "How many cents is a nickel?", options: ["1¢", "5¢", "10¢", "25¢"], correct: 1, emoji: "🪙" },
    { question: "How many cents is a dime?", options: ["10¢", "5¢", "25¢", "50¢"], correct: 0, emoji: "🪙" },
    { question: "How many cents is a quarter?", options: ["10¢", "25¢", "50¢", "100¢"], correct: 1, emoji: "🪙" },
    { question: "How many pennies equal a nickel?", options: ["3", "5", "10", "25"], correct: 1, emoji: "🪙" },
    { question: "How many nickels equal a dime?", options: ["2", "1", "5", "10"], correct: 0, emoji: "🪙" },
    { question: "How many cents equal one dollar?", options: ["50¢", "75¢", "100¢", "200¢"], correct: 2, emoji: "💵" },
    { question: "How many quarters equal one dollar?", options: ["2", "4", "5", "10"], correct: 1, emoji: "💵" },
    { question: "How many dimes equal one dollar?", options: ["10", "5", "20", "100"], correct: 0, emoji: "💵" },
    { question: "How many pennies equal a dime?", options: ["5", "10", "25", "100"], correct: 1, emoji: "🪙" },
    { question: "Which coin is worth the most?", options: ["Penny", "Nickel", "Dime", "Quarter"], correct: 3, emoji: "🪙" },
    { question: "How many nickels equal a quarter?", options: ["3", "5", "10", "25"], correct: 1, emoji: "🪙" },
    { question: "What is worth more: 2 dimes or 1 quarter?", options: ["2 dimes", "1 quarter", "Same", "Neither"], correct: 0, emoji: "💰" }
  ];

  const shuffleArray = (arr: Question[]): Question[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = (count: number): void => {
    const shuffled = shuffleArray(allQuestions).slice(0, count);
    setShuffledQuestions(shuffled);
    setQuizStarted(true);
  };

  const handleAnswer = (index: number): void => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const isCorrect = index === shuffledQuestions[currentQuestion].correct;
    const newResults = [...questionResults, { correct: isCorrect }];
    setQuestionResults(newResults);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < shuffledQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartQuiz = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestionResults([]);
    setQuizStarted(false);
    setShuffledQuestions([]);
  };

  const getGrade = (): { letter: string; color: string; emoji: string } => {
    const percentage = (score / shuffledQuestions.length) * 100;
    
    if (percentage >= 94) return { letter: 'A', color: '#22c55e', emoji: '🌟' };
    if (percentage >= 86) return { letter: 'B', color: '#3b82f6', emoji: '🎉' };
    if (percentage >= 77) return { letter: 'C', color: '#f59e0b', emoji: '👍' };
    if (percentage >= 70) return { letter: 'D', color: '#f97316', emoji: '💪' };
    return { letter: 'F', color: '#ef4444', emoji: '📚' };
  };

  const isCorrect: boolean = selectedAnswer === shuffledQuestions[currentQuestion]?.correct;

  if (!quizStarted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #60a5fa, #a78bfa, #f9a8d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem', maxWidth: '32rem', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9333ea', marginBottom: '1rem' }}>Kids Quiz Game!</h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>Choose how many questions you want to answer:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {[10, 25, 50, 75, 100].map((count) => (
              <button key={count} onClick={() => startQuiz(count)} style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', padding: '1.25rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                {count} Questions
              </button>
            ))}
          </div>
          
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1.5rem' }}>Questions cover: Math, Patterns, Shapes, Science, Alphabet & Money!</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const grade = getGrade();
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #c084fc, #f9a8d4, #fde047)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem', maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Trophy style={{ width: '6rem', height: '6rem', margin: '0 auto', color: '#eab308', animation: 'bounce 1s infinite' }} />
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#9333ea', marginBottom: '1rem' }}>Quiz Complete!</h2>
          
          <div style={{ fontSize: '6rem', fontWeight: 'bold', color: grade.color, marginBottom: '0.5rem', lineHeight: '1' }}>{grade.letter}</div>
          
          <div style={{ fontSize: '2rem', color: '#374151', marginBottom: '1rem' }}>{percentage}% ({score} / {shuffledQuestions.length})</div>
          
          <p style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '2rem' }}>
            {grade.emoji} {grade.letter === 'A' ? "Perfect! You're a superstar!" : grade.letter === 'B' ? "Wonderful! You did great!" : grade.letter === 'C' ? "Good work! Keep learning!" : grade.letter === 'D' ? "Nice try! Practice makes perfect!" : "Keep trying! You can do better!"}
          </p>
          <button onClick={restartQuiz} style={{ background: 'linear-gradient(to right, #4ade80, #3b82f6)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Play Again! 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #60a5fa, #a78bfa, #f9a8d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '2rem', maxWidth: '42rem', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: '1', minWidth: '0' }}>
            {[...Array(shuffledQuestions.length)].map((_, i) => {
              let bgColor = '#d1d5db';
              if (i < currentQuestion) bgColor = questionResults[i]?.correct ? '#22c55e' : '#ef4444';
              else if (i === currentQuestion) bgColor = '#3b82f6';
              
              return <div key={i} style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', background: bgColor, flexShrink: 0 }} />;
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#9333ea', flexShrink: 0 }}>
            <Star style={{ color: '#eab308' }} />
            {score}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '3.75rem', marginBottom: '1rem', textAlign: 'center' }}>{shuffledQuestions[currentQuestion].emoji}</div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '2rem' }}>
            {shuffledQuestions[currentQuestion].question}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {shuffledQuestions[currentQuestion].options.map((option, index) => {
              let buttonStyle: React.CSSProperties = {
                fontSize: '1.5rem',
                fontWeight: 'bold',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: 'none',
                cursor: showFeedback ? 'default' : 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              };

              if (showFeedback) {
                if (index === shuffledQuestions[currentQuestion].correct) {
                  buttonStyle = { ...buttonStyle, background: '#22c55e', color: 'white' };
                } else if (index === selectedAnswer) {
                  buttonStyle = { ...buttonStyle, background: '#ef4444', color: 'white' };
                } else {
                  buttonStyle = { ...buttonStyle, background: '#e5e7eb', color: '#9ca3af' };
                }
              } else {
                buttonStyle = { ...buttonStyle, background: 'linear-gradient(to right, #fde047, #fb923c)', color: '#1f2937' };
              }

              return (
                <button key={index} onClick={() => !showFeedback && handleAnswer(index)} disabled={showFeedback} style={buttonStyle} onMouseEnter={(e) => { if (!showFeedback) e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {showFeedback && (
          <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: '1rem', background: isCorrect ? '#dcfce7' : '#fed7aa' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{isCorrect ? '🎉' : '💪'}</div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isCorrect ? '#059669' : '#ea580c' }}>
              {isCorrect ? "Great job! That's right!" : 'Nice try! Keep going!'}
            </p>
          </div>
        )}
      </div>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }`}</style>
    </div>
  );
};

export default KidsQuizApp;