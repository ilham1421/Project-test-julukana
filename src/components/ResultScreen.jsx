
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Download } from 'lucide-react';

const ResultScreen = ({ answers, questions, onRestart, participantName }) => {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const score = calculateScore();
  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { grade: 'E', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const gradeInfo = getGrade(score.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ujian Selesai!</h1>
          <p className="text-gray-600">Berikut adalah hasil ujian CBT Anda</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6" />
                  <span>Hasil Ujian - {participantName}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Score */}
                <div className="text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full ${gradeInfo.bg} flex items-center justify-center mb-4`}>
                    <span className={`text-3xl font-bold ${gradeInfo.color}`}>
                      {gradeInfo.grade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Nilai</p>
                </div>

                {/* Percentage */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score.percentage}%
                  </div>
                  <p className="text-sm text-gray-600">Persentase</p>
                </div>

                {/* Correct Answers */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {score.correct}/{score.total}
                  </div>
                  <p className="text-sm text-gray-600">Benar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Detail Jawaban</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {questions.map((question) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {question.id}. {question.text}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Jawaban Anda: </span>
                              <span className={userAnswer ? (isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium') : 'text-gray-400'}>
                                {userAnswer || 'Tidak dijawab'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Jawaban Benar: </span>
                              <span className="text-green-600 font-medium">
                                {question.correctAnswer}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <Button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Ulangi Ujian
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Unduh Hasil
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultScreen;
