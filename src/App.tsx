import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import TeamPage from "./pages/TeamPage";
import AdvisorLinktree from "./pages/AdvisorLinktree";
import Admin from "./pages/Admin";
import { CookieConsent } from "./components/CookieConsent";
import { EngagementPopup } from "./components/EngagementPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipe" element={<TeamPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/conseiller/:advisorId" element={<AdvisorLinktree />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
      <EngagementPopup />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
