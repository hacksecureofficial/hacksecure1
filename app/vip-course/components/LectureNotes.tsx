import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

type LectureNotesProps = {
  notes: string;
  notesFile: string;
};

export default function LectureNotes({ notes, notesFile }: LectureNotesProps) {
  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6 h-[300px] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Lecture Notes</h3>

        {/* Updated Download PDF Button */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-2 text-black hover:bg-gray-200"
          asChild
        >
          <a href={notesFile} download className="flex items-center">
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </a>
        </Button>
      </div>

      <p className="text-gray-300">{notes}</p>
      
      <style jsx>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;  /* Width of the scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d;  /* Track color */
          border-radius: 10px;  /* Round track corners */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a90e2;  /* Thumb color */
          border-radius: 10px;  /* Round thumb corners */
          border: 2px solid #2d2d2d;  /* Border color of the thumb */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #0066cc;  /* Change color when hovered */
        }
      `}</style>
    </div>
  );
}
