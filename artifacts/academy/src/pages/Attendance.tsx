import { useListAttendance, getListAttendanceQueryKey, useUpsertAttendance } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle2, XCircle } from "lucide-react";

export default function Attendance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: attendanceRecords, isLoading } = useListAttendance({ query: { queryKey: getListAttendanceQueryKey() } });
  
  const upsertAttendance = useUpsertAttendance();

  const handleToggleAttendance = (sessionId: number, riderId: number, present: boolean) => {
    upsertAttendance.mutate(
      { data: { sessionId, riderId, present } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAttendanceQueryKey() });
          toast({ 
            title: present ? "Marked as present" : "Marked as absent", 
            duration: 2000 
          });
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Attendance Tracker</h1>
        <p className="text-muted-foreground mt-1 text-lg">Mark rider attendance for scheduled sessions</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Mark Present</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-6 w-10 ml-auto rounded-full" /></TableCell>
                  </TableRow>
                ))
              ) : attendanceRecords?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No sessions found. Schedule some sessions first.
                  </TableCell>
                </TableRow>
              ) : (
                attendanceRecords?.map(record => (
                  <TableRow key={record.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        {new Date(record.sessionDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{record.riderName}</TableCell>
                    <TableCell>
                      {record.present ? (
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Present
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <XCircle className="h-4 w-4" /> Absent
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Switch 
                          checked={record.present} 
                          onCheckedChange={(checked) => handleToggleAttendance(record.sessionId, record.riderId, checked)}
                          disabled={upsertAttendance.isPending}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}