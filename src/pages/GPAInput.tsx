import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiEndpoints } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import GPACalculator from '@/components/GPACalculator';
import { Calculator, ArrowRight } from 'lucide-react';

const GPAInput = () => {
  const [gpa, setGpa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const gpaValue = parseFloat(gpa);
    
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4.0) {
      toast({
        title: "Invalid GPA",
        description: "Please enter a valid GPA between 0.00 and 4.00",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await apiEndpoints.submitGPA(gpaValue);
      toast({
        title: "GPA Submitted",
        description: "Your GPA has been recorded successfully!",
      });
      navigate('/quiz');
    } catch (error) {
      console.error('Error submitting GPA:', error);
      toast({
        title: "Error",
        description: "Failed to submit GPA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Calculator className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              College of Technology and Built Environment (CTBE)
            </h1>
            <p className="text-muted-foreground">
              Enter your GPA to see your admission percentage for each CTBE department
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Please enter your current cumulative GPA on a 4.0 scale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA (0.00 - 4.00)</Label>
                  <Input
                    id="gpa"
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.01"
                    placeholder="e.g., 3.75"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="text-lg"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter your GPA with up to two decimal places
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">GPA Scale Reference:</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>A+/A: 4.0</span>
                      <span>B+: 3.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>A-: 3.7</span>
                      <span>B: 3.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B+: 3.3</span>
                      <span>B-: 2.7</span>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-dark" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      Continue to Interest Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <GPACalculator />
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Your GPA helps determine your admission percentage based on department preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAInput;