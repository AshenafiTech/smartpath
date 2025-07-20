import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiEndpoints, Department } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Target, TrendingUp, Award, Users } from 'lucide-react';

const Recommendations = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await apiEndpoints.getRecommendations();
        setDepartments(response.data.recommendations || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Mock data for demonstration
        setDepartments([
          {
            id: '1',
            name: 'Computer Science',
            description: 'Focus on algorithms, programming, and software development. Perfect for students interested in AI, web development, and system design.',
            matchPercentage: 95,
            cutoff: 3.6
          },
          {
            id: '2',
            name: 'Data Science',
            description: 'Combine mathematics, statistics, and programming to extract insights from data. Ideal for analytical minds interested in AI and business intelligence.',
            matchPercentage: 88,
            cutoff: 3.4
          },
          {
            id: '3',
            name: 'Cybersecurity',
            description: 'Protect systems and networks from digital threats. Great for students interested in ethical hacking, forensics, and security architecture.',
            matchPercentage: 82,
            cutoff: 3.2
          },
          {
            id: '4',
            name: 'Information Technology',
            description: 'Broad field covering system administration, network management, and enterprise solutions. Perfect for hands-on technical roles.',
            matchPercentage: 75,
            cutoff: 3.0
          },
          {
            id: '5',
            name: 'Software Engineering',
            description: 'Focus on large-scale software development, project management, and software architecture. Ideal for students who enjoy collaborative development.',
            matchPercentage: 70,
            cutoff: 3.3
          }
        ]);
        toast({
          title: "Using Sample Data",
          description: "Couldn't connect to the server. Showing sample recommendations.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [toast]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-success text-success-foreground';
    if (percentage >= 75) return 'bg-primary text-primary-foreground';
    if (percentage >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getMatchIcon = (percentage: number) => {
    if (percentage >= 90) return <Award className="h-4 w-4" />;
    if (percentage >= 75) return <Target className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Analyzing your profile and generating recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Department Recommendations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your GPA and interests, here are the departments that best match your profile. 
              Rankings are calculated using academic performance, interest alignment, and career prospects.
            </p>
          </div>

          <div className="space-y-6">
            {departments.map((department, index) => (
              <Card 
                key={department.id} 
                className={`border-border shadow-lg hover:shadow-xl transition-shadow ${
                  index === 0 ? 'ring-2 ring-primary ring-opacity-50' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-foreground">
                          {department.name}
                        </CardTitle>
                        {index === 0 && (
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {department.description}
                      </CardDescription>
                    </div>
                    
                    <div className="flex sm:flex-col gap-3 sm:gap-2 items-center">
                      <Badge 
                        className={`${getMatchColor(department.matchPercentage)} flex items-center gap-1 px-3 py-1`}
                      >
                        {getMatchIcon(department.matchPercentage)}
                        {department.matchPercentage}% Match
                      </Badge>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Cutoff GPA</p>
                        <p className="font-semibold text-foreground">{department.cutoff.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        High career prospects in tech industry
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Growing demand for graduates
                      </span>
                    </div>
                  </div>
                  
                  {department.matchPercentage >= 75 && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        🎯 Strong recommendation: Your profile aligns well with this department's requirements and career paths.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-muted/50 border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Need More Information?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore cutoff trends and alumni insights to make a more informed decision.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="/cutoffs" 
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    View Cutoff Trends
                  </a>
                  <a 
                    href="/alumni" 
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Read Alumni Stories
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;