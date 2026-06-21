import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetUpcomingSessions, getGetUpcomingSessionsQueryKey, useGetHealthBreakdown, getGetHealthBreakdownQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Activity, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const { data: upcoming, isLoading: loadingUpcoming } = useGetUpcomingSessions({ query: { queryKey: getGetUpcomingSessionsQueryKey() } });
  const { data: health, isLoading: loadingHealth } = useGetHealthBreakdown({ query: { queryKey: getGetHealthBreakdownQueryKey() } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-lg">Overview of academy operations</p>
      </div>

      {loadingSummary ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium"><Skeleton className="h-4 w-20" /></CardTitle>
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : summary ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Horses</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.totalHorses}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Riders</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.totalRiders}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.upcomingSessionsCount}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.attendanceRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">{summary.presentToday} present today</p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-muted/20">
            <div>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            </div>
            <Link href="/sessions" className="text-sm text-primary flex items-center hover:underline font-medium">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {loadingUpcoming ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : upcoming && upcoming.length > 0 ? (
              <div className="divide-y">
                {upcoming.slice(0, 5).map(session => (
                  <div key={session.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div>
                      <div className="font-medium">{session.riderName} on {session.horseName}</div>
                      <div className="text-sm text-muted-foreground">{new Date(session.sessionDate).toLocaleDateString()} at {session.sessionTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No upcoming sessions found
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-muted/20">
            <div>
              <CardTitle className="text-lg">Horse Health Status</CardTitle>
            </div>
            <Link href="/horses" className="text-sm text-primary flex items-center hover:underline font-medium">
              Manage <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {loadingHealth ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : health ? (
              <div className="divide-y">
                {health.map(item => (
                  <div key={item.status} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      {item.status === 'healthy' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {item.status === 'under_treatment' && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                      {item.status === 'retired' && <Activity className="h-4 w-4 text-gray-400" />}
                      <span className="font-medium capitalize">{item.status.replace('_', ' ')}</span>
                    </div>
                    <div className="font-bold text-lg">{item.count}</div>
                  </div>
                ))}
                {health.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    No health data available
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}