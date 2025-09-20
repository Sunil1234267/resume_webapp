import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/data";
import {
  ArrowRight,
  FileDown,
  Linkedin,
  Github,
  Loader2,
} from "lucide-react";
import { HomeTabs } from "@/components/home/HomeTabs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const url = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!url) {
      toast({
        title: "Configuration Error",
        description: "The webhook URL is not configured.",
        variant: "destructive",
      });
      setIsDownloading(false);
      return;
    }

    const username = 'n8n-sunil-contact';
    const password = 'n8n-sunil-contact';
    const auth = 'Basic ' + btoa(`${username}:${password}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': auth,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch the resume.';
        try {
          // If the error response is JSON, try to parse a message from it
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch (e) {
          // Otherwise, use the raw text
          if(errorText) errorMessage = errorText;
        }
        throw new Error(errorMessage);
      }

      // The response is the file itself after the redirect
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Try to get filename from Content-Disposition header, otherwise fallback
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'Sunil_Khatri_Resume.pdf'; // Default filename
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      
      // Append to the DOM, trigger the click, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="section-container grid md:grid-cols-2 items-center justify-center gap-12">
      <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl">
          {resumeData.personal.name}
        </h1>
        <h2 className="text-2xl font-semibold text-primary/80 dark:text-muted-foreground md:text-3xl">
          {resumeData.personal.title}
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Welcome to my digital portfolio. This site offers a comprehensive look
          into my journey as an Electrical and Electronics Engineer, showcasing
          my expertise in embedded systems, automotive software, and AI. Explore
          my professional experience, browse a curated selection of projects,

          and delve into my skills. Built with a modern tech stack, this
          interactive resume provides a dynamic overview of my career. Feel free
          to connect or download my resume for more details.
        </p>
      </div>

      <div className="relative hidden md:flex justify-center items-center h-80">
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial
                color="#99b3f2"
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
          </Suspense>
        </Canvas>
      </div>

      <div className="md:col-span-2">
        <HomeTabs />
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/contact">
          <Button size="lg" className="w-full sm:w-auto">
            Contact Me <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              Download Resume <FileDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <div className="flex items-center gap-2">
          <a
            href={resumeData.personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-6 w-6" />
            </Button>
          </a>
          <a
            href={resumeData.personal.social.github}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-6 w-6" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
