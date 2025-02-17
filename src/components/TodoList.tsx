import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Trash2, Check, Plus, Clock } from 'lucide-react';
import { BorderBeam } from "@/components/magicui/border-beam";
import { Meteors } from './magicui/meteors';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: Date;
  timeString: string;
  dateString: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTask.trim()) {
      const now = new Date();
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false,
        timestamp: now,
        timeString: now.toLocaleTimeString(),
        dateString: now.toLocaleDateString()
      }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId: number): void => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId: number): void => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black overflow-hidden">
      <Meteors number={20} />
      <BorderBeam duration={10} size={300} />
      <div className="relative w-full max-w-md mx-4">
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
          <div className="absolute inset-0">
            <BorderBeam duration={10} size={300} />
          </div>
          
          <div className="relative p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">To-Do List</h1>
            
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Add a new task..."
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                <Plus size={20} />
              </button>
            </form>

            <div className="max-h-96 overflow-y-auto">
              <ul className="space-y-2">
                {tasks.map((task: Task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleComplete(task.id)}
                            className={`p-1 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-200'}`}
                          >
                            <Check size={16} className="text-white" />
                          </button>
                          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.text}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 ml-8 mt-1 text-sm text-gray-500">
                        <Clock size={12} />
                        <span>{task.timeString} - {task.dateString}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {tasks.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No tasks yet. Add one above!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;