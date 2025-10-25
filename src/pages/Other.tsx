import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resumeData } from "@/lib/data";
import { GraduationCap, Award, Building, Calendar, Check, Sparkles, HeartHandshake } from "lucide-react";

const OtherPage = () => {
  return (
    <section className="section-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-header-title">Education, Certifications & Activities</h2>
        <p className="page-header-description">
          My academic background, continuous learning, and community involvement.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-5">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resumeData.education.map((edu, index) => (
              <div key={index} className={index > 0 ? "mt-6" : ""}>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" /> {edu.institution}, {edu.location}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> {edu.duration}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Trainings & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {resumeData.certifications?.map((cert, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium">{typeof cert === 'string' ? cert : cert.name}</span>
                    {typeof cert === 'object' && cert.provider && (
                      <span className="text-sm text-muted-foreground/80 block"> - {cert.provider}</span>
                    )}
                  </div>
                </li>
              )) || []}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Co-curricular Activities Section */}
      {resumeData.coCurricularActivities && resumeData.coCurricularActivities.length > 0 && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                Co-curricular Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {resumeData.coCurricularActivities.map((activity, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-start gap-3 text-muted-foreground">
                    <Sparkles className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base text-foreground">{activity.title}</h3>
                      <p className="text-sm">{activity.description}</p>
                      {activity.duration && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" /> {activity.duration}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Volunteering Section */}
      {resumeData.volunteering && resumeData.volunteering.length > 0 && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <HeartHandshake className="w-6 h-6 text-primary" />
                Volunteering & Social Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {resumeData.volunteering.map((activity, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-start gap-3 text-muted-foreground">
                    <HeartHandshake className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base text-foreground">{activity.title}</h3>
                       <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Building className="w-4 h-4" /> {activity.organization}
                      </p>
                      <p className="text-sm mt-2">{activity.description}</p>
                      {activity.duration && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" /> {activity.duration}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default OtherPage;
