import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

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
    const { processing, delete:destroy } = useForm();

    const handleDelete = (id: number, title:string) => {
        if(confirm(`Do you want to delete this task? id: ${id}; name: ${title}`)) {
            destroy(route('tasks.destroy', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />

            <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Tasks
                    </h1>
                    <Link href={route('tasks.create')}>
                        <Button className="cursor-pointer">
                            Create New Task
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-border/60 bg-background shadow-sm">
                    {tasks && tasks.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60px]">ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow
                                        key={task.id}
                                        className="hover:bg-muted/40 transition-colors"
                                    >
                                        <TableCell className="font-medium">
                                            {task.id}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            {task.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'capitalize',
                                                    task.status === 'done' &&
                                                        'bg-green-100 text-green-700 dark:bg-green-900/30',
                                                    task.status ===
                                                        'in_progress' &&
                                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                                                    task.status === 'review' &&
                                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30',
                                                    task.status === 'todo' &&
                                                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
                                                )}
                                            >
                                                {task.status.replace('_', ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    'capitalize',
                                                    task.priority === 'low' &&
                                                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30',
                                                    task.priority ===
                                                        'medium' &&
                                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
                                                    task.priority === 'high' &&
                                                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30',
                                                    task.priority ===
                                                        'urgent' &&
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30'
                                                )}
                                            >
                                                {task.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Link
                                                href={route(
                                                    'tasks.edit',
                                                    task.id
                                                )}
                                            >
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="cursor-pointer"
                                                >
                                                    Edit
                                                </Button>
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
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-muted-foreground mb-4">
                                No tasks found.
                            </p>
                            <Link href={route('tasks.create')}>
                                <Button>Create your first task</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
