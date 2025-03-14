
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Classes from "./pages/Classes";
import Stats from "./pages/Stats";
import Equipment from "./pages/Equipment";
import Cleaning from "./pages/Cleaning";
import ClientView from "./pages/ClientView";
import AccessControl from "./pages/AccessControl";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/members" element={<Members />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/client-view" element={<ClientView />} />
          <Route path="/access-control" element={<AccessControl />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
