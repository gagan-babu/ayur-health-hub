import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { consultationService, Consultation } from '@/services/consultationService';
import {
  Activity,
  Leaf,
  Utensils,
  Ban,
  Heart,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Download,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';

const ConsultationResultPage = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultation = async () => {
      if (id) {
        const data = await consultationService.getConsultationById(id);
        setConsultation(data);
      }
      setIsLoading(false);
    };
    fetchConsultation();
  }, [id]);

  if (isLoading) return <LoadingPage />;

  if (!consultation) {
    return (
      <DashboardLayout title="Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Consultation not found</p>
          <Button asChild className="mt-4">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const triageConfig = {
    Normal: { color: 'bg-herb/10 text-herb', icon: CheckCircle },
    'Needs Doctor Consultation': { color: 'bg-accent/10 text-accent', icon: AlertTriangle },
    Urgent: { color: 'bg-destructive/10 text-destructive', icon: AlertTriangle },
  };

  const triageInfo = triageConfig[consultation.triageLevel];

  return (
    <DashboardLayout title="Consultation Results">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/consultation/history">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </Link>
        </Button>

        {/* Header Card */}
        <Card className="border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(consultation.date), 'PPP p')}
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  AI Health Analysis Report
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={triageInfo.color}>
                  <triageInfo.icon className="h-3 w-3 mr-1" />
                  {consultation.triageLevel}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Summary */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Reported Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {consultation.symptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary" className="text-sm">
                  {symptom}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              AI Disease Analysis
            </CardTitle>
            <CardDescription>
              Predicted conditions based on your symptoms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultation.predictedDisease.map((disease, index) => (
                <div
                  key={disease.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="font-medium text-foreground">{disease.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${disease.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary w-12 text-right">
                      {Math.round(disease.confidence)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Herbal Recommendations */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Leaf className="h-5 w-5 text-herb" />
              Ayurvedic Herbal Recommendations
            </CardTitle>
            <CardDescription>
              Natural herbs and their therapeutic benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {consultation.recommendations.herbs.map((herb) => (
                <div
                  key={herb.name}
                  className="p-4 rounded-lg border border-herb/20 bg-herb/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-herb" />
                    <h4 className="font-semibold text-foreground">{herb.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{herb.dosage}</p>
                  <p className="text-xs text-herb">{herb.benefits}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dietary Recommendations */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2 text-lg">
                <Utensils className="h-5 w-5 text-herb" />
                Foods to Consume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {consultation.recommendations.foods.consume.map((food) => (
                  <li key={food} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-herb" />
                    <span className="text-sm">{food}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2 text-lg">
                <Ban className="h-5 w-5 text-destructive" />
                Foods to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {consultation.recommendations.foods.avoid.map((food) => (
                  <li key={food} className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-destructive" />
                    <span className="text-sm">{food}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Lifestyle Recommendations */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              Lifestyle Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Daily Practices</h4>
              <ul className="space-y-2">
                {consultation.recommendations.lifestyle.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-3">Yoga & Exercises</h4>
              <div className="flex flex-wrap gap-2">
                {consultation.recommendations.yogaPractices.map((yoga) => (
                  <Badge key={yoga} variant="outline" className="text-sm">
                    {yoga}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link to="/consultation/new">Start New Consultation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationResultPage;
