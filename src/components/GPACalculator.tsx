import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Trophy } from 'lucide-react';

const departments = [
  { name: 'SCEE (Civil)', abbr: 'Civil' },
  { name: 'SECE (Electrical)', abbr: 'Electrical' },
  { name: 'CBME (Biomedical)', abbr: 'Biomedical' },
  { name: 'SiTE (Software)', abbr: 'Software' },
  { name: 'SMiE (Mechanical)', abbr: 'Mechanical' },
  { name: 'SCBE (Chemical)', abbr: 'Chemical' }
];

const GPACalculator = () => {
  const [gpa, setGpa] = useState('');

  const calculatePercentage = (cgpa: number, preference: number) => {
    const basePercentage = (cgpa / 4) * 90;
    const preferencePoints = Math.max(0, 12 - (preference - 1) * 2); // 10, 8, 6, 4, 2, 0
    return basePercentage + preferencePoints;
  };

  const gpaValue = parseFloat(gpa);
  const isValidGPA = !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4.0;

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          GPA to Percentage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="calculator-gpa">Your GPA (0.00 - 4.00)</Label>
          <Input
            id="calculator-gpa"
            type="number"
            min="0"
            max="4.0"
            step="0.01"
            placeholder="e.g., 3.75"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="text-lg"
          />
        </div>

        {isValidGPA && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Your Percentage by Choice Preference
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Formula: (GPA ÷ 4) × 90 + Preference Points
              </p>
              
              <div className="grid gap-3">
                {departments.map((dept, index) => {
                  const preference = index + 1;
                  const percentage = calculatePercentage(gpaValue, preference);
                  const preferencePoints = Math.max(0, 12 - (preference - 1) * 2);
                  
                  return (
                    <div key={dept.name} className="flex items-center justify-between p-3 bg-background rounded border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {preference}{preference === 1 ? 'st' : preference === 2 ? 'nd' : preference === 3 ? 'rd' : 'th'} Choice
                          </Badge>
                          <span className="font-medium">{dept.abbr}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {((gpaValue / 4) * 90).toFixed(1)}% + {preferencePoints} points
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium mb-2">
                💡 Strategic Tip
              </p>
              <p className="text-sm text-primary/80">
                Choose your preferences wisely! Your 1st choice gets 10 extra points, 
                while your 6th choice gets no bonus points.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GPACalculator;