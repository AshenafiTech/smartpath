import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Personalized Recommendations",
      description: "Get department suggestions based on your GPA and interests"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Cutoff Trends",
      description: "Analyze historical data to make informed decisions"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Alumni Insights",
      description: "Learn from experiences of students who've walked your path"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <GraduationCap className="h-16 w-16 mx-auto text-primary mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Choose the Right Department,{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Confidently
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Navigate your university journey with data-driven insights, personalized recommendations, 
              and real alumni experiences to find your perfect academic path.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4">
              <Link to="/gpa" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-4">
              <Link to="/alumni">
                See Alumni Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How SmartPath Helps You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines academic data, career insights, and peer experiences 
            to guide you toward the right department choice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Path?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start with your GPA and interests, and let us guide you to the perfect department.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-4">
            <Link to="/gpa" className="flex items-center gap-2">
              Begin Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;