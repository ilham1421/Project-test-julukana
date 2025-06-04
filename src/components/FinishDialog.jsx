
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const FinishDialog = ({ isOpen, onClose, onConfirm, answeredCount, totalQuestions }) => {
  const unansweredCount = totalQuestions - answeredCount;
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            {unansweredCount > 0 ? (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            )}
            <span>Konfirmasi Selesai Ujian</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total Soal:</span>
                <span className="font-bold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-600">Terjawab:</span>
                <span className="font-bold text-green-600">{answeredCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-600">Belum dijawab:</span>
                <span className="font-bold text-red-600">{unansweredCount}</span>
              </div>
            </div>
            
            {unansweredCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Masih ada {unansweredCount} soal yang belum dijawab. 
                  Soal yang tidak dijawab akan dianggap salah.
                </p>
              </div>
            )}
            
            <p className="text-sm">
              Apakah Anda yakin ingin mengakhiri ujian sekarang?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Ya, Selesai Ujian
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishDialog;
