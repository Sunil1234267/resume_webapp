import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resumeData } from "@/lib/data";
import { User, Languages } from "lucide-react";

const About = () => {
  return (
    <section className="section-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-header-title">About Me</h2>
        <p className="page-header-description">
          A glimpse into my professional background, skills, and what drives me.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center text-center">
          <Avatar className="w-48 h-48 mb-4 border-4 border-primary/10">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQE6GzdYmh8eOQ/profile-displayphoto-shrink_800_800/B56Za0Ql3YHUAc-/0/1746780971874?e=1761177600&v=beta&t=c4MfX5GzfHj6dNQYY74y7LzzSb6EPA-0H7EpCEgrBT0" alt={resumeData.personal.name} />
            <AvatarFallback>{resumeData.personal.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-bold">{resumeData.personal.name}</h3>
          <p className="text-muted-foreground">{resumeData.personal.title}</p>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>{resumeData.personal.summary}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {resumeData.languages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{lang.split(' ')[0]}</span> - {lang.split(' ')[1].replace('(', '').replace(')', '')}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
