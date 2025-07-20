import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiEndpoints, Testimonial } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Users, Quote, GraduationCap, Star, Briefcase } from 'lucide-react';

const AlumniInsights = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiEndpoints.getTestimonials();
        setTestimonials(response.data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Mock data for demonstration
        const mockTestimonials = [
          {
            id: '1',
            department: 'Computer Science',
            quote: "The CS program gave me a solid foundation in algorithms and software engineering. I'm now working as a Senior Software Engineer at Google, and the problem-solving skills I learned here are invaluable every day.",
            studentName: 'Sarah Chen',
            year: 2022
          },
          {
            id: '2',
            department: 'Data Science',
            quote: "What I loved about Data Science was the perfect blend of mathematics, programming, and real-world applications. I landed a role as a Data Scientist at Microsoft right after graduation. The hands-on projects really prepared me for industry challenges.",
            studentName: 'Marcus Rodriguez',
            year: 2023
          },
          {
            id: '3',
            department: 'Cybersecurity',
            quote: "The Cybersecurity program opened my eyes to the critical importance of digital protection. I'm now a Security Analyst at a major bank, and the ethical hacking courses were particularly valuable for my current role.",
            studentName: 'Aisha Patel',
            year: 2021
          },
          {
            id: '4',
            department: 'Computer Science',
            quote: "The collaborative environment and industry connections in CS were amazing. I started my own tech startup during my final year, and the entrepreneurship support from faculty was incredible. We're now a team of 12!",
            studentName: 'David Kim',
            year: 2020
          },
          {
            id: '5',
            department: 'Information Technology',
            quote: "IT gave me the practical skills I needed to succeed. The internship program connected me with a local tech company where I'm now the IT Manager. The broad curriculum really prepared me for leadership roles.",
            studentName: 'Jennifer Walsh',
            year: 2022
          },
          {
            id: '6',
            department: 'Data Science',
            quote: "The statistics foundation in Data Science was incredible. I transitioned from a biology background, and now I'm doing bioinformatics research at a pharmaceutical company. The interdisciplinary approach was perfect for me.",
            studentName: 'Ahmed Hassan',
            year: 2023
          },
          {
            id: '7',
            department: 'Cybersecurity',
            quote: "The hands-on labs and real-world simulations in Cybersecurity were outstanding. I'm now working as a Penetration Tester, and I feel confident tackling any security challenge. The industry certifications embedded in the curriculum were a huge plus.",
            studentName: 'Emma Thompson',
            year: 2021
          },
          {
            id: '8',
            department: 'Software Engineering',
            quote: "Software Engineering taught me how to work on large-scale projects with teams. The agile methodology courses and project management skills helped me become a Technical Lead at Amazon. The program really emphasizes collaboration.",
            studentName: 'Carlos Mendoza',
            year: 2022
          }
        ];
        setTestimonials(mockTestimonials);
        toast({
          title: "Using Sample Data",
          description: "Couldn't connect to the server. Showing sample alumni testimonials.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  const departments = ['All', ...new Set(testimonials.map(t => t.department))];
  const filteredTestimonials = selectedDepartment === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.department === selectedDepartment);

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Computer Science': 'bg-blue-100 text-blue-800 border-blue-200',
      'Data Science': 'bg-green-100 text-green-800 border-green-200',
      'Cybersecurity': 'bg-red-100 text-red-800 border-red-200',
      'Information Technology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Software Engineering': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading alumni testimonials...</p>
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
            <Users className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Alumni Success Stories
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Hear from graduates who've walked the path you're considering. 
              Learn about their experiences, career outcomes, and advice for choosing the right department.
            </p>
          </div>

          {/* Department Filter */}
          <div className="mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Filter by Department
                </h3>
                <div className="flex flex-wrap gap-2">
                  {departments.map(department => (
                    <button
                      key={department}
                      onClick={() => setSelectedDepartment(department)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDepartment === department
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-muted'
                      }`}
                    >
                      {department}
                      {department !== 'All' && (
                        <span className="ml-2 text-xs">
                          ({testimonials.filter(t => t.department === department).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">{testimonials.length}</p>
                <p className="text-sm text-muted-foreground">Total Stories</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4 text-center">
                <Briefcase className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Employment Rate</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">{departments.length - 1}</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground mb-2">
                        {testimonial.studentName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDepartmentColor(testimonial.department)}>
                          {testimonial.department}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Class of {testimonial.year}
                        </span>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>Currently working in {testimonial.department.toLowerCase()} field</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No testimonials found for the selected department.
              </p>
            </div>
          )}

          {/* Call to Action */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary-light/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These alumni started exactly where you are now. Take the first step 
                toward your future by exploring our recommendations based on your profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/gpa" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-dark transition-colors"
                >
                  Start Assessment
                </a>
                <a 
                  href="/recommendations" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  View Recommendations
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlumniInsights;