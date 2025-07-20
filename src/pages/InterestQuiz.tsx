import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiEndpoints } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterestQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const questions = [
    {
      id: 'tech_interest',
      question: 'Which technology area interests you most?',
      options: [
        'Artificial Intelligence & Machine Learning',
        'Web Development & Software Engineering',
        'Cybersecurity & Network Protection',
        'Data Science & Analytics',
        'Mobile App Development'
      ]
    },
    {
      id: 'work_style',
      question: 'What type of work environment do you prefer?',
      options: [
        'Individual coding and problem-solving',
        'Team collaboration on projects',
        'Research and development',
        'Client interaction and consulting',
        'Teaching and mentoring others'
      ]
    },
    {
      id: 'career_goal',
      question: 'What is your primary career goal?',
      options: [
        'Start my own tech company',
        'Work at a top tech company',
        'Pursue advanced research/PhD',
        'Become a consultant',
        'Work in academia/teaching'
      ]
    },
    {
      id: 'problem_type',
      question: 'What type of problems do you enjoy solving?',
      options: [
        'Mathematical and algorithmic challenges',
        'Creative design and user experience',
        'Security and risk management',
        'Business optimization and strategy',
        'Scientific research questions'
      ]
    },
    {
      id: 'learning_style',
      question: 'How do you prefer to learn new concepts?',
      options: [
        'Hands-on coding and experimentation',
        'Reading research papers and documentation',
        'Interactive workshops and tutorials',
        'Working on real-world projects',
        'Collaborative study groups'
      ]
    },
    {
      id: 'industry_preference',
      question: 'Which industry most appeals to you?',
      options: [
        'Technology and Software',
        'Healthcare and Biotechnology',
        'Finance and Banking',
        'Entertainment and Gaming',
        'Education and E-learning'
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await apiEndpoints.submitInterestQuiz(answers);
      toast({
        title: "Quiz Completed",
        description: "Your interests have been recorded successfully!",
      });
      navigate('/recommendations');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interest Assessment
            </h1>
            <p className="text-muted-foreground">
              Help us understand your interests to recommend the best departments for you
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <CardDescription className="text-lg font-medium">
                {currentQuestionData.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQuestionData.id] || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-sm leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="flex gap-2">
                  {currentQuestion > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  
                  <Button asChild variant="outline">
                    <Link to="/gpa" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to GPA
                    </Link>
                  </Button>
                </div>

                <div className="flex-1" />

                {!isLastQuestion ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!answers[currentQuestionData.id]}
                    className="bg-primary hover:bg-primary-dark flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!answers[currentQuestionData.id] || isLoading}
                    className="bg-primary hover:bg-primary-dark flex items-center gap-2"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        Get Recommendations
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterestQuiz;