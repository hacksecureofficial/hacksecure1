import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, ExternalLink } from "lucide-react";

type Lecture = {
  id: number;
  title: string;
  notesFile: string;
};

type NotesSectionProps = {
  lectures: Lecture[];
};

export default function NotesSection({ lectures }: NotesSectionProps) {
  return (
    <div className="h-1/2 relative">
      <h2 className="text-xl font-bold p-4">Lecture Notes</h2>
      <ScrollArea className="h-[calc(100%-60px)]">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="p-2 relative">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{lecture.title}</span>
            </div>

            {/* Download PDF Button */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 mt-1 hover:bg-gray-800"
              asChild
            >
              <a href={lecture.notesFile} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>

            {/* View PDF Button */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 mt-1 hover:bg-gray-800"
              asChild
            >
              <a href={lecture.notesFile} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>View PDF</span>
              </a>
            </Button>
            
          </div>
        ))}
      </ScrollArea>

      {/* Single Redirect Button Below the List */}
      <div className="p-4 relative">
        <Button
          variant="outline"
          className="w-full justify-center hover:bg-gray-200"
          asChild
        >
          <a href="/vip-course/cybersecurity/test-rules" className="text-black">
            Go to Test and certification
          </a>
        </Button>
        
      </div>
    </div>
  );
}
