import React from 'react'
import { useState } from 'react';
import {ClipboardMinus, CircleCheck, Clock, TriangleAlert} from 'lucide-react'

const StatCard = ({
  totalTasks,
  completedTasks, 
  inProgressTasks, 
  pendingTasks,
  tasks,
  setTasks,
  theme,
  userName
}) => {

  const [isAdding, setIsAdding] = useState(false);
  
      const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: ""
      });

  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col gap-2 w-full pl-0.5 ${isDark ? "bg-[#0f172a]" : "bg-[#f1f4f6]"}`}>

      <div className='flex flex-col'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0'>
      <h1 className={`text-2xl sm:text-4xl font-bold p-1 ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>Hello, {userName}!</h1>

      <div className='rounded-lg flex justify-center items-center gap-3 hover:scale-97 w-full sm:w-auto'>
      <button 
      type="button"
      onClick={() => setIsAdding(true)}
      aria-label="Add new task"
      aria-haspopup="dialog"
      className='w-full sm:w-auto p-3 bg-[#0c7c92] text-white rounded-lg hover:scale-97 text-sm sm:text-base'>
        + Add New Task
        </button>
        </div>

      {isAdding && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-task-heading"
          className='fixed inset-bs-15 right-7 flex items-center justify-center z-50'
        >
        <div className={`shadow-lg p-5 rounded-lg mt-4 flex flex-col gap-3 border ${isDark ? "bg-[#1e293b] border-[#334155] text-[#f1f5f9]" : "bg-[#ffffff] border-[#e3e7ea] text-[#1b262c]"}`}>

          <h2 id="add-task-heading" className={`text-lg font-semibold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>Add New Task</h2>

          <label htmlFor="new-task-title" className='sr-only'>Task Title</label>
          <input
          id="new-task-title"
          type = "text"
          placeholder = 'Task Title'
          value = {newTask.title}
          onChange = {(e)=>
            setNewTask({
              ...newTask,
              title: e.target.value
            })
          }
          aria-label="Task title"
          required
          className={`p-2 rounded-lg border outline-none focus:border-[#22b8cf] ${isDark ? "bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder-[#64748b]" : "border-[#e3e7ea] text-[#1b262c] placeholder-[#8a97a0]"}`}
          />

        <label htmlFor="new-task-description" className='sr-only'>Description</label>
        <input 
        id="new-task-description"
        type='text'
        placeholder = 'Description'
        value = {newTask.description}
        onChange={(e) => setNewTask({
          ...newTask,
          description: e.target.value
        })
        } 
        aria-label="Task description"
        className={`p-2 rounded-lg border outline-none focus:border-[#22b8cf] ${isDark ? "bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder-[#64748b]" : "border-[#e3e7ea] text-[#1b262c] placeholder-[#8a97a0]"}`}
        />

        <label htmlFor="new-task-priority" className='sr-only'>Priority</label>
        <select
        id="new-task-priority"
        value = {newTask.priority}
        onChange={(e) => 
          setNewTask({
            ...newTask,
            priority: e.target.value
          })
        }
        aria-label="Task priority"
        className={`p-2 rounded-lg border outline-none focus:border-[#22b8cf] ${isDark ? "bg-[#0f172a] border-[#334155] text-[#f1f5f9]" : "border-[#e3e7ea] text-[#1b262c] bg-white"}`}
        >
          < option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>

        <label htmlFor="new-task-duedate" className='sr-only'>Due Date</label>
        <input
        id="new-task-duedate"
        type = 'date'
        value = {newTask.dueDate}
        onChange={(e) => 
          setNewTask ({
            ...newTask,
            dueDate: e.target.value
          })
        }
        aria-label="Task due date"
        className={`p-2 rounded-lg border outline-none focus:border-[#22b8cf] ${isDark ? "bg-[#0f172a] border-[#334155] text-[#f1f5f9]" : "border-[#e3e7ea] text-[#1b262c]"}`}
        />

        <div className='flex gap-3'>
          <button 
          type='button'
          onClick = {() => {
            if (!newTask.title.trim()) return;

            const task = {
              id: Date.now(),
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              dueDate: newTask.dueDate,
              completed: false
            }

            setTasks ([
              ...tasks, task
            ]);

            setNewTask({
              title: "",
              description: "",
              priority: "Medium",
              dueDate: ""
            });

            setIsAdding(false);
          }}
          aria-label="Confirm add task"
          className = 'bg-[#0c7c92] text-white px-4 py-2 rounded-lg hover:scale-95'
          > Add Task
          </button> 
          <button
          type='button'
          onClick={() => setIsAdding(false)}
          aria-label="Cancel adding task"
          className={`px-4 py-2 rounded-lg hover:scale-95 ${isDark ? "bg-[#334155] text-[#94a3b8]" : "bg-[#f1f4f6] text-[#5b6b73]"}`}
          >Cancel</button>
            </div>
        </div>

        </div>
      )
}

      </div>
      <p className={`text-base sm:text-xl p-1 pb-4 sm:pb-6 ${isDark ? "text-[#94a3b8]" : "text-[#1b262c]"}`}>Let's get things done today!</p>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full'>

      <div className={`flex h-auto sm:h-[12vh] rounded-lg p-3 sm:p-4 justify-start items-center gap-3 sm:gap-5 hover:scale-97 border ${isDark ? "bg-[#1e293b] border-[#334155]" : "bg-[#ffffff] border-[#e3e7ea]"}`}>
        <div className='flex rounded-full p-2 bg-[#dff6fa] shrink-0'>
        <ClipboardMinus size={24} className="sm:w-[35px] sm:h-[35px]" color='#0c7c92' aria-hidden="true"/>
        </div>
        <div className='min-w-0'>
        <p className={`text-xl sm:text-3xl font-bold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{totalTasks}</p>
        <p className={`text-xs sm:text-base truncate ${isDark ? "text-[#94a3b8]" : "text-[#1b262c]"}`}>Total Tasks</p>
        </div>
      </div>

      <div className={`flex h-auto sm:h-[12vh] rounded-lg p-3 sm:p-4 justify-start items-center gap-3 sm:gap-5 hover:scale-97 border ${isDark ? "bg-[#1e293b] border-[#334155]" : "bg-[#ffffff] border-[#e3e7ea]"}`}>
       <div className='flex rounded-full p-2 bg-[#e3f5ec] shrink-0'>
        <CircleCheck size={24} className="sm:w-[35px] sm:h-[35px]" color='#2f9e6e' aria-hidden="true"/>
        </div>
        <div className='min-w-0'>
        <p className={`text-xl sm:text-3xl font-bold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{completedTasks}</p>
        <p className={`text-xs sm:text-base truncate ${isDark ? "text-[#94a3b8]" : "text-[#1b262c]"}`}>Completed</p>
        </div>
      </div>

      <div className={`flex h-auto sm:h-[12vh] rounded-lg p-3 sm:p-4 justify-start items-center gap-3 sm:gap-5 hover:scale-97 border ${isDark ? "bg-[#1e293b] border-[#334155]" : "bg-[#ffffff] border-[#e3e7ea]"}`}>
        <div className='flex rounded-full p-2 bg-[#e7ecfd] shrink-0'>
        <Clock size={24} className="sm:w-[35px] sm:h-[35px]" color='#3651e0' aria-hidden="true"/>
        </div>
        <div className='min-w-0'>
        <p className={`text-xl sm:text-3xl font-bold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{inProgressTasks}</p>
        <p className={`text-xs sm:text-base truncate ${isDark ? "text-[#94a3b8]" : "text-[#1b262c]"}`}>In Progress</p>
        </div>
      </div>

      <div className={`flex h-auto sm:h-[12vh] rounded-lg p-3 sm:p-4 justify-start items-center gap-3 sm:gap-5 hover:scale-97 border ${isDark ? "bg-[#1e293b] border-[#334155]" : "bg-[#ffffff] border-[#e3e7ea]"}`}>
        <div className='flex rounded-full p-2 bg-[#fbeedc] shrink-0'>
        <TriangleAlert size={24} className="sm:w-[35px] sm:h-[35px]" color='#d9922e' aria-hidden="true"/>
        </div>
        <div className='min-w-0'>
        <p className={`text-xl sm:text-3xl font-bold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{pendingTasks}</p>
        <p className={`text-xs sm:text-base truncate ${isDark ? "text-[#94a3b8]" : "text-[#1b262c]"}`}>Pending</p>
        </div>
      </div>

    </div>
    </div>
  )
}

export default StatCard