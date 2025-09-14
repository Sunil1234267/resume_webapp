import { resumeData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} {resumeData.personal.name}. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <a href={resumeData.personal.social.linkedin} target="_blank" rel="noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-125">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href={resumeData.personal.social.github} target="_blank" rel="noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-125">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
