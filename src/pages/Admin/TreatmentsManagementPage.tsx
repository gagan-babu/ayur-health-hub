import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { adminService, Treatment, Disease } from '@/services/adminService';
import { Search, Plus, Leaf, Clock } from 'lucide-react';

const TreatmentsManagementPage = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [treatmentsData, diseasesData] = await Promise.all([
        adminService.getTreatments(),
        adminService.getDiseases(),
      ]);
      setTreatments(treatmentsData);
      setDiseases(diseasesData);
      setFilteredTreatments(treatmentsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = treatments.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTreatments(filtered);
  }, [treatments, searchQuery]);

  const getDiseaseName = (diseaseId: string) => {
    return diseases.find((d) => d.id === diseaseId)?.name || 'Unknown';
  };

  if (isLoading) return <LoadingPage />;

  return (
    <AdminLayout title="Treatments Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Treatment
          </Button>
        </div>

        {/* Treatments List */}
        <div className="grid gap-4">
          {filteredTreatments.map((treatment) => (
            <Card key={treatment.id} className="border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {treatment.name}
                        </h3>
                        <Badge variant="outline">
                          For: {getDiseaseName(treatment.diseaseId)}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                          <Leaf className="h-4 w-4 text-herb" />
                          Herbs
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {treatment.herbs.map((herb) => (
                            <Badge
                              key={herb}
                              className="bg-herb/10 text-herb text-xs"
                            >
                              {herb}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">
                          Therapies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {treatment.therapies.map((therapy) => (
                            <Badge key={therapy} variant="secondary" className="text-xs">
                              {therapy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Dietary Guidelines
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {treatment.dietaryGuidelines}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{treatment.duration}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TreatmentsManagementPage;
