import { useState } from "react";
import { useListRiders, getListRidersQueryKey, useCreateRider, useUpdateRider, useDeleteRider } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RiderLevel } from "@workspace/api-client-react";

const riderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(1, "Contact is required"),
  level: z.enum([RiderLevel.beginner, RiderLevel.intermediate, RiderLevel.advanced, RiderLevel.professional])
});

type RiderFormValues = z.infer<typeof riderSchema>;

export default function Riders() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: riders, isLoading } = useListRiders({ query: { queryKey: getListRidersQueryKey() } });
  
  const createRider = useCreateRider();
  const updateRider = useUpdateRider();
  const deleteRider = useDeleteRider();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRiderId, setEditingRiderId] = useState<number | null>(null);

  const form = useForm<RiderFormValues>({
    resolver: zodResolver(riderSchema),
    defaultValues: { name: "", contact: "", level: RiderLevel.beginner }
  });

  const onSubmit = (data: RiderFormValues) => {
    if (editingRiderId) {
      updateRider.mutate(
        { id: editingRiderId, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListRidersQueryKey() });
            setIsCreateOpen(false);
            setEditingRiderId(null);
            toast({ title: "Rider updated successfully" });
          }
        }
      );
    } else {
      createRider.mutate(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListRidersQueryKey() });
            setIsCreateOpen(false);
            toast({ title: "Rider added successfully" });
          }
        }
      );
    }
  };

  const handleEdit = (rider: any) => {
    form.reset({ name: rider.name, contact: rider.contact, level: rider.level as RiderLevel });
    setEditingRiderId(rider.id);
    setIsCreateOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteRider.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListRidersQueryKey() });
          toast({ title: "Rider deleted successfully" });
        }
      }
    );
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'beginner': return 'outline';
      case 'intermediate': return 'secondary';
      case 'advanced': return 'default';
      case 'professional': return 'primary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Rider Profiles</h1>
          <p className="text-muted-foreground mt-1 text-lg">Manage academy students and riders</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingRiderId(null);
            form.reset({ name: "", contact: "", level: RiderLevel.beginner });
          }
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Rider</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRiderId ? 'Edit Rider' : 'Add New Rider'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="contact" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl><Input {...field} placeholder="Email or Phone" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={createRider.isPending || updateRider.isPending}>
                  {createRider.isPending || updateRider.isPending ? 'Saving...' : 'Save Rider'}
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
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : riders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No riders found. Add your first rider to the database.
                  </TableCell>
                </TableRow>
              ) : (
                riders?.map(rider => (
                  <TableRow key={rider.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{rider.name}</TableCell>
                    <TableCell className="text-muted-foreground">{rider.contact}</TableCell>
                    <TableCell>
                      <Badge variant={getLevelBadgeVariant(rider.level) as any} className="capitalize">
                        {rider.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(rider)}>
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
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete {rider.name} from the database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleDelete(rider.id)}>
                              Delete
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