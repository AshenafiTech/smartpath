import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, Trophy, GripVertical, RotateCcw } from 'lucide-react';

const initialDepartments = [
  { id: 'civil', name: 'SCEE (Civil)', abbr: 'Civil' },
  { id: 'electrical', name: 'SECE (Electrical)', abbr: 'Electrical' },
  { id: 'biomedical', name: 'CBME (Biomedical)', abbr: 'Biomedical' },
  { id: 'software', name: 'SiTE (Software)', abbr: 'Software' },
  { id: 'mechanical', name: 'SMiE (Mechanical)', abbr: 'Mechanical' },
  { id: 'chemical', name: 'SCBE (Chemical)', abbr: 'Chemical' }
];

const GPACalculator = () => {
  const [gpa, setGpa] = useState('');
  const [departments, setDepartments] = useState(initialDepartments);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const calculatePercentage = (cgpa: number, preference: number) => {
    const basePercentage = (cgpa / 4) * 90;
    const preferencePoints = Math.max(0, 12 - (preference - 1) * 2); // 10, 8, 6, 4, 2, 0
    return basePercentage + preferencePoints;
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;
    
    const draggedIndex = departments.findIndex(dept => dept.id === draggedItem);
    const targetIndex = departments.findIndex(dept => dept.id === targetId);
    
    const newDepartments = [...departments];
    const [draggedDept] = newDepartments.splice(draggedIndex, 1);
    newDepartments.splice(targetIndex, 0, draggedDept);
    
    setDepartments(newDepartments);
    setDraggedItem(null);
  };

  const resetOrder = () => {
    setDepartments(initialDepartments);
  };

  const gpaValue = parseFloat(gpa);
  const isValidGPA = !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4.0;

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            GPA to Percentage Calculator
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetOrder}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Order
          </Button>
        </div>
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
                Formula: (GPA ÷ 4) × 90 + Preference Points • Drag to reorder preferences
              </p>
              
              <div className="grid gap-2">
                {departments.map((dept, index) => {
                  const preference = index + 1;
                  const percentage = calculatePercentage(gpaValue, preference);
                  const preferencePoints = Math.max(0, 12 - (preference - 1) * 2);
                  
                  return (
                    <div 
                      key={dept.id} 
                      className={`flex items-center gap-3 p-3 bg-background rounded border cursor-move hover:bg-muted/50 transition-colors ${
                        draggedItem === dept.id ? 'opacity-50' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, dept.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, dept.id)}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={preference <= 3 ? "default" : "secondary"} 
                            className="text-xs"
                          >
                            {preference}{preference === 1 ? 'st' : preference === 2 ? 'nd' : preference === 3 ? 'rd' : 'th'} Choice
                          </Badge>
                          <span className="font-medium">{dept.abbr}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {((gpaValue / 4) * 90).toFixed(1)}% + {preferencePoints} points
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          preference === 1 ? 'text-primary' : 
                          preference <= 3 ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
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
                Drag departments to reorder your preferences! Your 1st choice gets 10 extra points, 
                2nd gets 8 points, 3rd gets 6 points, and so on. Choose wisely!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GPACalculator;