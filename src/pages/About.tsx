import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/lib/data";
import { User, Languages, Code, Cpu, Car, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  { title: "Core Embedded & Automotive", icon: Cpu, key: "Core Embedded & Automotive" },
  { title: "Development & Testing Tools", icon: Car, key: "Development & Testing Tools" },
  { title: "Modeling & Simulation", icon: BrainCircuit, key: "Modeling & Simulation" },
  { title: "AI/ML & Modern Technologies", icon: Code, key: "AI/ML & Modern Technologies" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const About = () => {
  return (
    <section className="section-container animate-fade-in space-y-12">
      <div>
        <div className="page-header">
          <h2 className="page-header-title">About Me</h2>
          <p className="page-header-description">
            A glimpse into my professional background, skills, and what drives me.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <Avatar className="w-48 h-48 mb-4 border-4 border-primary/10">
              <AvatarImage src="" alt={resumeData.personal.name} />
              <AvatarFallback className="text-6xl font-bold bg-primary/10">{resumeData.personal.name.split(' ').map(n => n.charAt(0)).join('')}</AvatarFallback>
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
      </div>

      <div>
        <div className="page-header">
          <h2 className="page-header-title">Technical Proficiency</h2>
          <p className="page-header-description">
            A curated list of my technical skills and the technologies I work with.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="w-6 h-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills[category.key as keyof typeof resumeData.skills].map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1 font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
