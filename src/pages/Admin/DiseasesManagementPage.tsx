import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { adminService, Disease } from '@/services/adminService';
import { Search, Plus, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DiseasesManagementPage = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [filteredDiseases, setFilteredDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      const data = await adminService.getDiseases();
      setDiseases(data);
      setFilteredDiseases(data);
      setIsLoading(false);
    };
    fetchDiseases();
  }, []);

  useEffect(() => {
    const filtered = diseases.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.ayurvedicName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDiseases(filtered);
  }, [diseases, searchQuery]);

  if (isLoading) return <LoadingPage />;

  return (
    <AdminLayout title="Diseases Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diseases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Disease
          </Button>
        </div>

        {/* Diseases List */}
        <div className="grid gap-4">
          {filteredDiseases.map((disease) => (
            <Card key={disease.id} className="border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {disease.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {disease.ayurvedicName}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {disease.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs text-muted-foreground">Dosha involvement:</span>
                      {disease.doshaInvolvement.map((dosha) => (
                        <Badge key={dosha} className="bg-primary/10 text-primary text-xs">
                          {dosha}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground">Common symptoms:</span>
                      {disease.commonSymptoms.slice(0, 3).map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                      {disease.commonSymptoms.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{disease.commonSymptoms.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDisease(disease)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="font-serif">
                            {selectedDisease?.name}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedDisease?.ayurvedicName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedDisease?.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Dosha Involvement</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedDisease?.doshaInvolvement.map((dosha) => (
                                <Badge key={dosha} className="bg-primary/10 text-primary">
                                  {dosha}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Common Symptoms</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedDisease?.commonSymptoms.map((symptom) => (
                                <Badge key={symptom} variant="secondary">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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

export default DiseasesManagementPage;
