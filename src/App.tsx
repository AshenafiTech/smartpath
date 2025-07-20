import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import GPAInput from "./pages/GPAInput";
import InterestQuiz from "./pages/InterestQuiz";
import Recommendations from "./pages/Recommendations";
import CutoffTrends from "./pages/CutoffTrends";
import AlumniInsights from "./pages/AlumniInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gpa" element={<GPAInput />} />
            <Route path="/quiz" element={<InterestQuiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/cutoffs" element={<CutoffTrends />} />
            <Route path="/alumni" element={<AlumniInsights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
