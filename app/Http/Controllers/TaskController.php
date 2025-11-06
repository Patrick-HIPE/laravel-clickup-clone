<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Models\Task;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::all();
        return Inertia::render('Task/Index', [ 'tasks' => $tasks ]);
    }

    public function create() {
        return Inertia::render('Task/Create', []);
    }

    public function store(StoreTaskRequest $request) {
        $data = $request->validated();
        Task::create($data);
        return redirect()->route('tasks.index')->with('message', 'Task created successfully.');
    }

    public function edit(Task $task) {
        return Inertia::render('Task/Edit', [ 'task' => $task ]);
    }

    public function update(UpdateTaskRequest $request, Task $task) {
        $data = $request->validated();
        $task->update($data);
        return redirect()->route('tasks.index')->with('message', 'Task updated successfully.');
    }

    public function destroy(Task $task) {
        $task->delete();
        return redirect()->route('tasks.index')->with('message', 'Task deleted successfully.');
    }
}
