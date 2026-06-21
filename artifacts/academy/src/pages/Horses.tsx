import { useState } from "react";
import { useListHorses, getListHorsesQueryKey, useCreateHorse, useUpdateHorse, useDeleteHorse } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { HorseHealthStatus } from "@workspace/api-client-react";

const horseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.coerce.number().min(0, "Age must be positive"),
  healthStatus: z.enum([HorseHealthStatus.healthy, HorseHealthStatus.under_treatment, HorseHealthStatus.retired])
});

type HorseFormValues = z.infer<typeof horseSchema>;

export default function Horses() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: horses, isLoading } = useListHorses({ query: { queryKey: getListHorsesQueryKey() } });
  
  const createHorse = useCreateHorse();
  const updateHorse = useUpdateHorse();
  const deleteHorse = useDeleteHorse();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingHorseId, setEditingHorseId] = useState<number | null>(null);

  const form = useForm<HorseFormValues>({
    resolver: zodResolver(horseSchema),
    defaultValues: { name: "", breed: "", age: 0, healthStatus: HorseHealthStatus.healthy }
  });

  const onSubmit = (data: HorseFormValues) => {
    if (editingHorseId) {
      updateHorse.mutate(
        { id: editingHorseId, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListHorsesQueryKey() });
            setIsCreateOpen(false);
            setEditingHorseId(null);
            toast({ title: "Horse updated successfully" });
          }
        }
      );
    } else {
      createHorse.mutate(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListHorsesQueryKey() });
            setIsCreateOpen(false);
            toast({ title: "Horse added successfully" });
          }
        }
      );
    }
  };

  const handleEdit = (horse: any) => {
    form.reset({ name: horse.name, breed: horse.breed, age: horse.age, healthStatus: horse.healthStatus as HorseHealthStatus });
    setEditingHorseId(horse.id);
    setIsCreateOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteHorse.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListHorsesQueryKey() });
          toast({ title: "Horse deleted successfully" });
        }
      }
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'under_treatment': return 'destructive';
      case 'retired': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Horse Registry</h1>
          <p className="text-muted-foreground mt-1 text-lg">Manage all horses in the stable</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingHorseId(null);
            form.reset({ name: "", breed: "", age: 0, healthStatus: HorseHealthStatus.healthy });
          }
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Horse</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingHorseId ? 'Edit Horse' : 'Add New Horse'}</DialogTitle>
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
                <FormField control={form.control} name="breed" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breed</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="healthStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="under_treatment">Under Treatment</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={createHorse.isPending || updateHorse.isPending}>
                  {createHorse.isPending || updateHorse.isPending ? 'Saving...' : 'Save Horse'}
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
                <TableHead>Breed</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : horses?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No horses found. Add your first horse to the registry.
                  </TableCell>
                </TableRow>
              ) : (
                horses?.map(horse => (
                  <TableRow key={horse.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{horse.name}</TableCell>
                    <TableCell>{horse.breed}</TableCell>
                    <TableCell>{horse.age}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(horse.healthStatus) as any} className="capitalize">
                        {horse.healthStatus.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(horse)}>
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
                              This action cannot be undone. This will permanently delete {horse.name} from the registry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleDelete(horse.id)}>
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