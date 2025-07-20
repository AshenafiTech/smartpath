import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiEndpoints, CutoffData } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

const CutoffTrends = () => {
  const [cutoffData, setCutoffData] = useState<CutoffData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCutoffs = async () => {
      try {
        const response = await apiEndpoints.getCutoffs();
        setCutoffData(response.data.cutoffs || []);
      } catch (error) {
        console.error('Error fetching cutoffs:', error);
        // Mock data for demonstration
        const mockData = [
          { year: 2020, department: 'Computer Science', cutoff: 3.8 },
          { year: 2021, department: 'Computer Science', cutoff: 3.7 },
          { year: 2022, department: 'Computer Science', cutoff: 3.6 },
          { year: 2023, department: 'Computer Science', cutoff: 3.5 },
          { year: 2024, department: 'Computer Science', cutoff: 3.6 },
          
          { year: 2020, department: 'Data Science', cutoff: 3.6 },
          { year: 2021, department: 'Data Science', cutoff: 3.5 },
          { year: 2022, department: 'Data Science', cutoff: 3.4 },
          { year: 2023, department: 'Data Science', cutoff: 3.3 },
          { year: 2024, department: 'Data Science', cutoff: 3.4 },
          
          { year: 2020, department: 'Cybersecurity', cutoff: 3.4 },
          { year: 2021, department: 'Cybersecurity', cutoff: 3.3 },
          { year: 2022, department: 'Cybersecurity', cutoff: 3.2 },
          { year: 2023, department: 'Cybersecurity', cutoff: 3.1 },
          { year: 2024, department: 'Cybersecurity', cutoff: 3.2 },
          
          { year: 2020, department: 'Information Technology', cutoff: 3.2 },
          { year: 2021, department: 'Information Technology', cutoff: 3.1 },
          { year: 2022, department: 'Information Technology', cutoff: 3.0 },
          { year: 2023, department: 'Information Technology', cutoff: 2.9 },
          { year: 2024, department: 'Information Technology', cutoff: 3.0 },
        ];
        setCutoffData(mockData);
        toast({
          title: "Using Sample Data",
          description: "Couldn't connect to the server. Showing sample cutoff trends.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCutoffs();
  }, [toast]);

  // Transform data for chart
  const chartData = useMemo(() => {
    const yearGroups = cutoffData.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = { year: item.year };
      }
      acc[item.year][item.department] = item.cutoff;
      return acc;
    }, {} as Record<number, any>);

    return Object.values(yearGroups).sort((a, b) => a.year - b.year);
  }, [cutoffData]);

  const departments = [...new Set(cutoffData.map(item => item.department))];
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading cutoff trend data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <TrendingUp className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Department Cutoff Trends
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Analyze historical cutoff GPA requirements for different departments. 
              Use this data to understand admission competitiveness and plan your academic goals.
            </p>
          </div>

          <Card className="border-border shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                GPA Cutoff Trends (2020-2024)
              </CardTitle>
              <CardDescription>
                Track how admission requirements have changed over the years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="year" 
                      className="text-muted-foreground"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[2.5, 4.0]}
                      className="text-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        color: 'hsl(var(--card-foreground))',
                        fontSize: '14px'
                      }}
                      formatter={(value: number) => [value?.toFixed(2), 'GPA Cutoff']}
                    />
                    <Legend />
                    {departments.map((dept, index) => (
                      <Line
                        key={dept}
                        type="monotone"
                        dataKey={dept}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {departments.map((department, index) => {
              const deptData = cutoffData.filter(item => item.department === department);
              const latest = deptData[deptData.length - 1];
              const previous = deptData[deptData.length - 2];
              const trend = latest && previous ? latest.cutoff - previous.cutoff : 0;
              
              return (
                <Card key={department} className="border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 leading-tight">
                      {department}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Cutoff</p>
                        <p className="text-2xl font-bold text-primary">
                          {latest?.cutoff.toFixed(2) || 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Year: {latest?.year || 'N/A'}
                        </span>
                      </div>
                      {trend !== 0 && (
                        <div className={`flex items-center gap-1 text-sm ${
                          trend > 0 ? 'text-destructive' : 'text-success'
                        }`}>
                          <TrendingUp className={`h-4 w-4 ${trend < 0 ? 'rotate-180' : ''}`} />
                          <span>
                            {trend > 0 ? '+' : ''}{trend.toFixed(2)} from last year
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-muted/50 border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">📈 Trending Up</p>
                  <p className="text-muted-foreground">
                    Computer Science cutoffs have stabilized after dropping in 2023, 
                    indicating consistent demand.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">📊 Most Accessible</p>
                  <p className="text-muted-foreground">
                    Information Technology maintains the lowest entry requirements 
                    while offering excellent career prospects.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">🎯 Planning Tip</p>
                  <p className="text-muted-foreground">
                    Aim for a GPA 0.2-0.3 points above the cutoff to ensure 
                    comfortable admission margins.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">📅 Best Time</p>
                  <p className="text-muted-foreground">
                    Early application periods typically have slightly lower 
                    effective cutoffs due to rolling admissions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CutoffTrends;