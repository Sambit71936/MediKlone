import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Feedback from "./pages/Feedback";
import ConsultationPage from "./pages/consultation/ConsultationPage";
import DoctorDashboard from "./pages/consultation/DoctorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admission" element={<Dashboard />} />
          <Route path="/diagnostics" element={<Dashboard />} />
          <Route path="/pharmacy" element={<Dashboard />} />
          <Route path="/billing" element={<Dashboard />} />
          <Route path="/discharge" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback/insights" element={<Feedback />} />
          <Route path="/hr" element={<Dashboard />} />
          <Route path="/inventory" element={<Dashboard />} />
          <Route path="/biomedical" element={<Dashboard />} />
          <Route path="/quality" element={<Dashboard />} />
          <Route path="/it" element={<Dashboard />} />
          <Route path="/analytics" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
