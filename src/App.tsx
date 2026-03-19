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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
  },
});

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
      <EngagementPopup />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
