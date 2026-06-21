import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { LayoutDashboard, ListIcon, Users, Calendar, CheckSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Horses from "@/pages/Horses";
import Riders from "@/pages/Riders";
import Sessions from "@/pages/Sessions";
import Attendance from "@/pages/Attendance";

const queryClient = new QueryClient();

function AppSidebar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/horses", label: "Horse Registry", icon: ListIcon },
    { href: "/riders", label: "Rider Profiles", icon: Users },
    { href: "/sessions", label: "Session Scheduler", icon: Calendar },
    { href: "/attendance", label: "Attendance Tracker", icon: CheckSquare },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-sidebar-border bg-sidebar">
        <div className="font-bold text-lg flex items-center gap-2 text-sidebar-foreground">
          <div className="bg-secondary text-secondary-foreground p-1 rounded-md">
            <CheckSquare className="h-5 w-5" />
          </div>
          Academy Hub
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {links.map((link) => {
                const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`h-10 transition-colors ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}`}
                    >
                      <Link href={link.href} className="flex items-center gap-3">
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <header className="h-16 flex items-center gap-4 px-6 border-b bg-card text-card-foreground shadow-sm z-10 sticky top-0">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="font-semibold text-sm tracking-tight text-muted-foreground uppercase">Stable Operations</div>
          </header>
          <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/horses" component={Horses} />
              <Route path="/riders" component={Riders} />
              <Route path="/sessions" component={Sessions} />
              <Route path="/attendance" component={Attendance} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;