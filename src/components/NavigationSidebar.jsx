
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flag, RotateCcw } from 'lucide-react';

const NavigationSidebar = ({ 
  currentQuestion, 
  totalQuestions, 
  answers, 
  onQuestionSelect, 
  onPrevious, 
  onNext, 
  onFinish 
}) => {
  const progress = (Object.keys(answers).length / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 sidebar-gradient text-white p-6 h-full overflow-y-auto"
    >
      {/* Progress Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Flag className="w-5 h-5 mr-2" />
          Progress Ujian
        </h3>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Terjawab</span>
            <span>{answeredCount}/{totalQuestions}</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
          <p className="text-xs mt-2 text-gray-300">
            {progress.toFixed(0)}% selesai
          </p>
        </div>
      </div>

      {/* Question Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Navigasi Soal</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const questionNum = i + 1;
            const isAnswered = answers[questionNum];
            const isCurrent = currentQuestion === questionNum;
            
            return (
              <Button
                key={questionNum}
                variant="ghost"
                size="sm"
                className={`h-10 w-10 text-xs font-bold ${
                  isCurrent
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                    : isAnswered
                    ? 'bg-green-500 text-white hover:bg-green-400'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => onQuestionSelect(questionNum)}
              >
                {questionNum}
              </Button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Sudah dijawab</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Soal aktif</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white/20 rounded"></div>
            <span>Belum dijawab</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onPrevious}
            disabled={currentQuestion === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Sebelumnya
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onNext}
            disabled={currentQuestion === totalQuestions}
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <Button
          variant="destructive"
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={onFinish}
        >
          <Flag className="w-4 h-4 mr-2" />
          Selesai Ujian
        </Button>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-white/10 rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-sm">💡 Tips:</h4>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Klik nomor soal untuk navigasi cepat</li>
          <li>• Pastikan semua soal terjawab</li>
          <li>• Perhatikan waktu yang tersisa</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default NavigationSidebar;
