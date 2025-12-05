import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { consultationService, Consultation } from '@/services/consultationService';
import { Activity, Calendar, ArrowRight, FileText, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';

const ConsultationHistoryPage = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      if (user) {
        const data = await consultationService.getConsultations(user.id);
        setConsultations(data);
      }
      setIsLoading(false);
    };
    fetchConsultations();
  }, [user]);

  if (isLoading) return <LoadingPage />;

  return (
    <DashboardLayout title="Consultation History">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Your Consultations
            </h2>
            <p className="text-muted-foreground">
              View and manage all your past health consultations
            </p>
          </div>
          <Button asChild>
            <Link to="/consultation/new">
              <Stethoscope className="mr-2 h-4 w-4" />
              New Consultation
            </Link>
          </Button>
        </div>

        {/* Consultations List */}
        {consultations.length === 0 ? (
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                No Consultations Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your first consultation to get personalized Ayurvedic recommendations
              </p>
              <Button asChild>
                <Link to="/consultation/new">Start Consultation</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <Card
                key={consultation.id}
                className="border-border/50 shadow-card hover:shadow-elevated transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(consultation.date), 'PPP')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Symptoms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {consultation.symptoms.map((symptom) => (
                            <Badge key={symptom} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Primary Prediction
                        </h4>
                        <p className="font-medium text-foreground">
                          {consultation.predictedDisease[0]?.name || 'N/A'}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({Math.round(consultation.predictedDisease[0]?.confidence || 0)}% confidence)
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-4">
                      <Badge
                        className={
                          consultation.triageLevel === 'Normal'
                            ? 'bg-herb/10 text-herb'
                            : consultation.triageLevel === 'Urgent'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-accent/10 text-accent'
                        }
                      >
                        {consultation.triageLevel}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/consultation/${consultation.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConsultationHistoryPage;
