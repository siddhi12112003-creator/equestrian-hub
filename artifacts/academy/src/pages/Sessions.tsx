import { useState } from "react";
import { useListSessions, getListSessionsQueryKey, useCreateSession, useUpdateSession, useDeleteSession, useListHorses, getListHorsesQueryKey, useListRiders, getListRidersQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";

const sessionSchema = z.object({
  riderId: z.coerce.number().min(1, "Rider is required"),
  horseId: z.coerce.number().min(1, "Horse is required"),
  sessionDate: z.string().min(1, "Date is required"),
  sessionTime: z.string().min(1, "Time is required"),
  notes: z.string().optional()
});

type SessionFormValues = z.infer<typeof sessionSchema>;

export default function Sessions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: sessions, isLoading } = useListSessions({ query: { queryKey: getListSessionsQueryKey() } });
  const { data: horses } = useListHorses({ query: { queryKey: getListHorsesQueryKey() } });
  const { data: riders } = useListRiders({ query: { queryKey: getListRidersQueryKey() } });
  
  const createSession = useCreateSession();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: { riderId: 0, horseId: 0, sessionDate: format(new Date(), 'yyyy-MM-dd'), sessionTime: "10:00", notes: "" }
  });

  const onSubmit = (data: SessionFormValues) => {
    if (editingSessionId) {
      updateSession.mutate(
        { id: editingSessionId, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListSessionsQueryKey() });
            setIsCreateOpen(false);
            setEditingSessionId(null);
            toast({ title: "Session updated successfully" });
          }
        }
      );
    } else {
      createSession.mutate(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListSessionsQueryKey() });
            setIsCreateOpen(false);
            toast({ title: "Session scheduled successfully" });
          }
        }
      );
    }
  };

  const handleEdit = (session: any) => {
    form.reset({ 
      riderId: session.riderId, 
      horseId: session.horseId, 
      sessionDate: session.sessionDate, 
      sessionTime: session.sessionTime, 
      notes: session.notes || "" 
    });
    setEditingSessionId(session.id);
    setIsCreateOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteSession.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListSessionsQueryKey() });
          toast({ title: "Session deleted successfully" });
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Session Scheduler</h1>
          <p className="text-muted-foreground mt-1 text-lg">Manage upcoming riding lessons and bookings</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingSessionId(null);
            form.reset({ riderId: 0, horseId: 0, sessionDate: format(new Date(), 'yyyy-MM-dd'), sessionTime: "10:00", notes: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Schedule Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSessionId ? 'Edit Session' : 'Schedule New Session'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="riderId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rider</FormLabel>
                      <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value ? field.value.toString() : undefined}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select rider" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {riders?.map(r => <SelectItem key={r.id} value={r.id.toString()}>{r.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="horseId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horse</FormLabel>
                      <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value ? field.value.toString() : undefined}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select horse" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horses?.map(h => <SelectItem key={h.id} value={h.id.toString()}>{h.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="sessionDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sessionTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl><Input type="time" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl><Textarea {...field} placeholder="Special instructions..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={createSession.isPending || updateSession.isPending}>
                  {createSession.isPending || updateSession.isPending ? 'Saving...' : 'Save Session'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Horse</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : sessions?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No sessions scheduled. Create a new session.
                  </TableCell>
                </TableRow>
              ) : (
                sessions?.map(session => (
                  <TableRow key={session.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="font-medium flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        {new Date(session.sessionDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4" />
                        {session.sessionTime}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{session.riderName}</TableCell>
                    <TableCell>{session.horseName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {session.notes || '-'}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(session)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Session?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently cancel the session for {session.riderName} on {session.horseName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Session</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleDelete(session.id)}>
                              Cancel Session
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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