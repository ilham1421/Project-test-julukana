import React from "react";
import { Clock, User, FileText, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const CBTHeader = ({
  timeLeft,
  currentQuestion,
  totalQuestions,
  participantName,
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isWarning = timeLeft <= 300; // 5 minutes warning

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b-4 border-blue-600 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Hukum Julukana
                </span>
                <p className="text-sm text-gray-600">
                  {" "}
                  Direktorat Jenderal Bea dan Cukai
                </p>
              </div>
            </div>
          </div>

          {/* Info Peserta */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                {participantName}
              </span>
            </div>

            {/* Progress Soal */}
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Soal {currentQuestion} dari {totalQuestions}
              </span>
            </div>

            {/* Timer */}
            <motion.div
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isWarning ? "bg-red-50 timer-warning" : "bg-green-50"
              }`}
              animate={isWarning ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: isWarning ? Infinity : 0 }}
            >
              {isWarning && <AlertTriangle className="w-4 h-4 text-red-600" />}
              <Clock
                className={`w-4 h-4 ${
                  isWarning ? "text-red-600" : "text-green-600"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  isWarning ? "text-red-900" : "text-green-900"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default CBTHeader;
