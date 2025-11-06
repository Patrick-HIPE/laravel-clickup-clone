import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tasks', href: '/tasks' }];

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface Props {
  tasks: Task[];
}

export default function Index({ tasks }: Props) {
  const { delete: destroy } = useForm();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Delete task "${title}"?`)) destroy(route('tasks.destroy', id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tasks" />

      <div className="mx-auto w-full max-w-6xl space-y-4 p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
          <Link href={route('tasks.create')}>
            <Button className="cursor-pointer">Create New Task</Button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-background shadow-sm">
          {tasks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <TableCell>{task.id}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{task.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          'capitalize',
                          task.status === 'done' && 'bg-green-100 text-green-700 dark:bg-green-900/30',
                          task.status === 'in_progress' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                          task.status === 'review' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30',
                          task.status === 'todo' && 'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
                        )}
                      >
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          'capitalize',
                          task.priority === 'low' && 'bg-gray-100 text-gray-700 dark:bg-gray-900/30',
                          task.priority === 'medium' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                          task.priority === 'high' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30',
                          task.priority === 'urgent' && 'bg-red-100 text-red-700 dark:bg-red-900/30'
                        )}
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="text-right space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href={route('tasks.edit', task.id)}>
                        <Button size="sm" variant="outline" className="cursor-pointer">Edit</Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(task.id, task.title)}
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-2">No tasks found.</p>
              <Link href={route('tasks.create')}>
                <Button size="sm">Create your first task</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-lg w-full p-6 rounded-xl bg-background border border-border/50 shadow-lg">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold mb-1">{selectedTask.title}</DialogTitle>
                <DialogDescription className="text-sm">Task ID: {selectedTask.id}</DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-0.5">Description</h3>
                  <p className="text-sm leading-snug whitespace-pre-wrap">
                    {selectedTask.description || 'No description provided.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-0.5">Status</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        'capitalize px-2 py-0.5 text-xs',
                        selectedTask.status === 'done' && 'bg-green-100 text-green-700 dark:bg-green-900/30',
                        selectedTask.status === 'in_progress' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                        selectedTask.status === 'review' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30',
                        selectedTask.status === 'todo' && 'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
                      )}
                    >
                      {selectedTask.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-0.5">Priority</h3>
                    <Badge
                      className={cn(
                        'capitalize px-2 py-0.5 text-xs',
                        selectedTask.priority === 'low' && 'bg-gray-100 text-gray-700 dark:bg-gray-900/30',
                        selectedTask.priority === 'medium' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                        selectedTask.priority === 'high' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30',
                        selectedTask.priority === 'urgent' && 'bg-red-100 text-red-700 dark:bg-red-900/30'
                      )}
                    >
                      {selectedTask.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-5 flex justify-end">
                <Button size="sm" onClick={() => setSelectedTask(null)} className="cursor-pointer">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
