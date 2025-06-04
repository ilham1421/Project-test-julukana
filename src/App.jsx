
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CBTHeader from '@/components/CBTHeader';
import QuestionCard from '@/components/QuestionCard';
import NavigationSidebar from '@/components/NavigationSidebar';
import FinishDialog from '@/components/FinishDialog';
import ResultScreen from '@/components/ResultScreen';
import LoginScreen from '@/components/LoginScreen';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { questions } from '@/data/questions';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  // Check for existing login
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinishExam();
      toast({
        title: "Waktu Habis!",
        description: "Ujian telah berakhir karena waktu habis.",
        variant: "destructive",
      });
    }
  }, [timeLeft, isFinished]);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem('cbt-answers', JSON.stringify(answers));
  }, [answers]);

  // Load answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('cbt-answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    toast({
      title: "Jawaban Tersimpan",
      description: `Soal ${currentQuestion} dijawab: ${answer}`,
    });
  };

  const handleQuestionSelect = (questionNum) => {
    setCurrentQuestion(questionNum);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    setShowFinishDialog(false);
    localStorage.removeItem('cbt-answers');
    localStorage.removeItem('user');
    
    toast({
      title: "Ujian Selesai",
      description: "Terima kasih telah mengikuti ujian CBT.",
    });
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setTimeLeft(7200);
    setIsFinished(false);
    setUser(null);
    localStorage.removeItem('cbt-answers');
    localStorage.removeItem('user');
    
    toast({
      title: "Ujian Dimulai Ulang",
      description: "Semua jawaban telah direset. Selamat mengerjakan!",
    });
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (isFinished) {
    return (
      <ResultScreen
        answers={answers}
        questions={questions}
        onRestart={handleRestart}
        participantName={user.email}
      />
    );
  }

  const currentQuestionData = questions.find(q => q.id === currentQuestion);

  return (
    <div className="min-h-screen bg-gray-50">
      <CBTHeader
        timeLeft={timeLeft}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        participantName={user.email}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionCard
                  question={currentQuestionData}
                  selectedAnswer={answers[currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar */}
        <NavigationSidebar
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          answers={answers}
          onQuestionSelect={handleQuestionSelect}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFinish={() => setShowFinishDialog(true)}
        />
      </div>

      {/* Finish Dialog */}
      <FinishDialog
        isOpen={showFinishDialog}
        onClose={() => setShowFinishDialog(false)}
        onConfirm={handleFinishExam}
        answeredCount={Object.keys(answers).length}
        totalQuestions={questions.length}
      />

      <Toaster />
    </div>
  );
}

export default App;