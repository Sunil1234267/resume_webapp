import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/data";
import {
  ArrowRight,
  FileDown,
  Linkedin,
  Github,
} from "lucide-react";
import { HomeTabs } from "@/components/home/HomeTabs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const Home = () => {
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
          Bridging the gap between hardware and software to build intelligent,
          production-ready systems.
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
        <a href="/sunil_khatri_resume.pdf" download>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Download Resume <FileDown className="ml-2 h-4 w-4" />
          </Button>
        </a>
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
