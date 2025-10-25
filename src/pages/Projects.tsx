import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { resumeData } from "@/lib/data";
import { motion } from "framer-motion";
import { Code, Zap, Bot, Home } from "lucide-react";

const iconMap = [
  <Code className="w-8 h-8 text-primary" />,
  <Zap className="w-8 h-8 text-primary" />,
  <Bot className="w-8 h-8 text-primary" />,
  <Home className="w-8 h-8 text-primary" />,
];

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="section-container">
      <div className="page-header">
        <h2 className="page-header-title">Projects</h2>
        <p className="page-header-description">
          A showcase of my personal and professional projects.
        </p>
      </div>
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
              <CardHeader className="flex-grow">
                <div className="mb-4">{iconMap[index % iconMap.length]}</div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="pt-2">{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
