import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { resumeData } from "@/lib/data";

export function HomeTabs() {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 h-auto">
        <TabsTrigger value="summary">
          <Briefcase className="mr-2 h-4 w-4" /> Summary
        </TabsTrigger>
        <TabsTrigger value="other"> {/* Renamed from education */}
          <GraduationCap className="mr-2 h-4 w-4" /> Other
        </TabsTrigger>
        <TabsTrigger value="certifications">
          <Award className="mr-2 h-4 w-4" /> Certifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="mt-4">
        <p className="text-muted-foreground text-lg">
          {resumeData.personal.summary}
        </p>
      </TabsContent>
      <TabsContent value="other" className="mt-4"> {/* Renamed from education */}
        <ul className="space-y-2">
          {resumeData.education.map((edu, index) => (
            <li key={index} className="text-muted-foreground text-lg">
              <strong>{edu.degree}</strong> from {edu.institution}, {edu.location} ({edu.duration})
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="certifications" className="mt-4">
        <ul className="list-disc list-inside space-y-2">
          {resumeData.certifications.map((cert, index) => (
            <li key={index} className="text-muted-foreground text-lg">
              {cert}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
