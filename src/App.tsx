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
      staleTime: 5 * 60 * 1000,      // 5 min — data stays fresh, no refetch on navigation
      gcTime: 10 * 60 * 1000,         // 10 min — cache kept in memory
      refetchOnWindowFocus: false,     // no refetch when switching tabs
      retry: 1,                        // 1 retry on failure, then give up fast
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
