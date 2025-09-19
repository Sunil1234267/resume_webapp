import {
  Briefcase,
  Building,
  Calendar,
  Users,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { resumeData } from "@/lib/data";
import { motion } from "framer-motion";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const LogoContainer = ({ logo, alt }: { logo?: string; alt: string }) => {
    if (!logo) return null;
    return (
      <div className="flex-shrink-0 w-16 h-16 bg-white/90 backdrop-blur-sm p-2 rounded-lg flex items-center justify-center border border-border shadow-inner">
        <img
          src={logo}
          alt={`${alt} logo`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  };

  const ClientLogoContainer = ({ logo, alt }: { logo?: string; alt: string }) => {
    if (!logo) return null;
    return (
      <div className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-sm p-1 rounded-md flex items-center justify-center border border-border shadow-inner">
        <img
          src={logo}
          alt={`${alt} logo`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  };

  return (
    <section className="section-container">
      {/* Professional Experience Section */}
      <div className="page-header">
        <h2 className="page-header-title">Professional Experience</h2>
        <p className="page-header-description">
          My journey through the industry, contributing to innovative projects
          and teams.
        </p>
      </div>
      <motion.div
        className="relative pl-8 border-l-2 border-primary/20 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resumeData.experience.map((job, index) => (
          <motion.div key={index} className="mb-12" variants={itemVariants}>
            <div className="absolute w-6 h-6 bg-primary rounded-full -left-3 border-4 border-background" />
            <motion.div
              className="p-6 rounded-lg shadow-md bg-card border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> {job.role}
                  </h3>
                  <h4 className="text-lg font-semibold text-foreground mt-1 flex items-center gap-2">
                    <Building className="w-5 h-5" /> {job.company}
                  </h4>
                </div>
                <LogoContainer logo={job.logo} alt={job.company} />
              </div>
              <div className="text-sm text-muted-foreground font-medium flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4" /> {job.duration}
              </div>

              {job.clients &&
                job.clients.map((client, cIndex) => (
                  <div
                    key={cIndex}
                    className="mt-6 pl-4 border-l-2 border-secondary/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary/80" /> Client:{" "}
                          {client.name}
                        </h5>
                        <span className="text-xs text-muted-foreground ml-6">
                          ({client.duration})
                        </span>
                      </div>
                      <ClientLogoContainer
                        logo={client.logo}
                        alt={client.name}
                      />
                    </div>
                    <ul className="mt-2 space-y-2 list-inside pl-6">
                      {client.responsibilities.map((resp, rIndex) => (
                        <li
                          key={rIndex}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              {job.responsibilities && (
                <ul className="mt-4 space-y-2 list-inside">
                  {job.responsibilities.map((resp, rIndex) => (
                    <li
                      key={rIndex}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Internship Experience Section */}
      <div className="page-header mt-16">
        <h2 className="page-header-title">Internship Experience</h2>
        <p className="page-header-description">
          Valuable learning experiences and contributions during my internships.
        </p>
      </div>
      <motion.div
        className="relative pl-8 border-l-2 border-primary/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resumeData.internships.map((internship, index) => (
          <motion.div key={index} className="mb-12" variants={itemVariants}>
            <div className="absolute w-6 h-6 bg-primary rounded-full -left-3 border-4 border-background" />
            <motion.div
              className="p-6 rounded-lg shadow-md bg-card border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" /> {internship.role}
                  </h3>
                  <h4 className="text-lg font-semibold text-foreground mt-1 flex items-center gap-2">
                    <Building className="w-5 h-5" /> {internship.company}
                  </h4>
                </div>
                <LogoContainer
                  logo={internship.logo}
                  alt={internship.company}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4" /> {internship.duration}
              </div>

              {internship.responsibilities && (
                <ul className="mt-2 space-y-2 list-inside">
                  {internship.responsibilities.map((resp, rIndex) => (
                    <li
                      key={rIndex}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
