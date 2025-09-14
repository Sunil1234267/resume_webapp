import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resumeData } from "@/lib/data";
import { Code, Cpu, Car, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  { title: "Embedded Systems & Control", icon: Cpu, key: "Embedded Systems & Control" },
  { title: "Modeling & Simulation", icon: BrainCircuit, key: "Modeling & Simulation" },
  { title: "Automotive & Testing", icon: Car, key: "Automotive & Testing" },
  { title: "Software & AI", icon: Code, key: "Software & AI" },
];

const Skills = () => {
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

  return (
    <section className="section-container">
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
    </section>
  );
};

export default Skills;
