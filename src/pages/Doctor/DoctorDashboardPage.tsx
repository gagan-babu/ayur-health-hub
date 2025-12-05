import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { LoadingPage, LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { consultationService, Consultation } from '@/services/consultationService';
import {
  Activity,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  FileText,
  Send,
} from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DoctorDashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchConsultations = async () => {
      // In a real app, this would fetch consultations that need doctor review
      const data = await consultationService.getConsultations();
      // Filter to show only those needing review
      const needsReview = data.filter(
        (c) => c.triageLevel !== 'Normal' || c.status === 'pending'
      );
      setConsultations(needsReview.length > 0 ? needsReview : data);
      setIsLoading(false);
    };
    fetchConsultations();
  }, []);

  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setDoctorNotes(consultation.doctorNotes || '');
  };

  const handleSubmitNotes = async () => {
    if (!selectedConsultation) return;
    
    setIsSubmitting(true);
    try {
      await consultationService.updateConsultation(selectedConsultation.id, {
        doctorNotes,
        status: 'reviewed',
      });
      toast({
        title: 'Notes saved',
        description: 'Your review has been recorded successfully.',
      });
      // Refresh consultations
      const data = await consultationService.getConsultations();
      setConsultations(data);
      setSelectedConsultation(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  const urgentCount = consultations.filter((c) => c.triageLevel === 'Urgent').length;
  const needsReviewCount = consultations.filter(
    (c) => c.triageLevel === 'Needs Doctor Consultation'
  ).length;

  return (
    <DashboardLayout title="Doctor Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-2xl hero-gradient p-6 text-primary-foreground">
          <h2 className="font-serif text-2xl font-bold mb-2">
            Welcome, Dr. {user?.name?.split(' ').pop()}
          </h2>
          <p className="text-primary-foreground/90">
            Review patient consultations and provide your expert guidance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-foreground">{consultations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Urgent Cases</p>
                  <p className="text-3xl font-bold text-destructive">{urgentCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Consultation</p>
                  <p className="text-3xl font-bold text-accent">{needsReviewCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultations List */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="font-serif">Consultations Requiring Review</CardTitle>
            <CardDescription>
              Click on a consultation to view details and add your notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Dialog key={consultation.id}>
                  <DialogTrigger asChild>
                    <div
                      className="flex flex-col md:flex-row justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleSelectConsultation(consultation)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Patient #{consultation.userId}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(consultation.date), 'PPP')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right mr-4">
                          <p className="text-sm text-muted-foreground">Symptoms:</p>
                          <p className="text-sm font-medium">
                            {consultation.symptoms.slice(0, 2).join(', ')}
                          </p>
                        </div>
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
                        {consultation.status === 'reviewed' && (
                          <CheckCircle className="h-5 w-5 text-herb" />
                        )}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif">
                        Consultation Review
                      </DialogTitle>
                      <DialogDescription>
                        Patient #{selectedConsultation?.userId} -{' '}
                        {selectedConsultation &&
                          format(new Date(selectedConsultation.date), 'PPP')}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedConsultation && (
                      <div className="space-y-6 py-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Symptoms</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedConsultation.symptoms.map((symptom) => (
                              <Badge key={symptom} variant="secondary">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">
                            AI Predictions
                          </h4>
                          <div className="space-y-2">
                            {selectedConsultation.predictedDisease.map((disease) => (
                              <div
                                key={disease.name}
                                className="flex justify-between items-center p-2 rounded bg-muted/50"
                              >
                                <span>{disease.name}</span>
                                <span className="text-sm text-primary font-medium">
                                  {Math.round(disease.confidence)}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">
                            Mental Condition
                          </h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-muted-foreground">Stress Level</p>
                              <p className="font-medium">
                                {selectedConsultation.mentalCondition.stressLevel}/10
                              </p>
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-muted-foreground">Sleep Quality</p>
                              <p className="font-medium">
                                {selectedConsultation.mentalCondition.sleepQuality}/10
                              </p>
                            </div>
                            <div className="p-2 rounded bg-muted/50">
                              <p className="text-muted-foreground">Mood</p>
                              <p className="font-medium capitalize">
                                {selectedConsultation.mentalCondition.mood}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">
                            Disease History
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedConsultation.diseaseHistory || 'None provided'}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">
                            Doctor's Notes & Recommendations
                          </h4>
                          <Textarea
                            value={doctorNotes}
                            onChange={(e) => setDoctorNotes(e.target.value)}
                            placeholder="Enter your professional assessment and recommendations..."
                            rows={5}
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        onClick={handleSubmitNotes}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Submit Review
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboardPage;
