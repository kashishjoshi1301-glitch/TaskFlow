import React from 'react'
import { useState } from 'react'

const FilterButtons = ({tasks, setTasks, searchQuery, theme}) => {
    
    const [isEditing, setIsEditing] = useState(null)
    const [undoTask, setUndoTask] = useState(null);
    const [undoAction, setUndoAction] = useState(null);
    const [isUndoAvailable, setIsUndoAvailable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [sortAsc, setSortAsc] = useState(true);

    const isDark = theme === "dark";

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const isToday = (dueDate) => {
      if (!dueDate) return false;
      const taskDate = new Date(dueDate);
      const today = new Date();
      return isSameDay(taskDate, today);
    };

    const isUpcoming = (dueDate) => {
      if (!dueDate) return false;
      const taskDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() > today.getTime();
    };

    const tabClass = (tabName) =>
      `py-1 px-3 rounded-lg hover:scale-95 transition-colors duration-150 ${
        activeFilter === tabName
          ? "bg-[#0c7c92] text-white font-semibold"
          : isDark
          ? "bg-[#334155] text-[#94a3b8]"
          : "bg-[#f1f4f6] text-[#5b6b73]"
      }`;

    const filteredTasks = tasks.filter((task) => {
      const query = (searchQuery || "").toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      if (activeFilter === "Completed") return task.completed;
      if (activeFilter === "Today") return isToday(task.dueDate);
      if (activeFilter === "Upcoming") return isUpcoming(task.dueDate);
      return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

    const priorityStyles = (priority) => {
      if (priority === "High")
        return { bg: "bg-[#fdeaea]", text: "text-[#b23a3a]", dot: "bg-[#b23a3a]" };
      if (priority === "Medium")
        return { bg: "bg-[#fdf2df]", text: "text-[#8a5f0c]", dot: "bg-[#8a5f0c]" };
      return { bg: "bg-[#e4f7ea]", text: "text-[#1f7a45]", dot: "bg-[#1f7a45]" };
    };

  return (
    <div className='w-full'>
      <div className={`w-full rounded ${isDark ? "bg-[#1e293b]" : "bg-[#ffffff]"}`}>

        <h1 className={`text-xl sm:text-2xl font-bold py-3 px-3 sm:px-5 ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>My Tasks</h1>
        
        <div className='flex flex-col sm:flex-row justify-between gap-3 p-3 sm:p-2 sm:pl-5'>
       
       <div role="group" aria-label="Filter tasks" className='flex flex-row flex-wrap gap-2 sm:gap-5'>
            
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              aria-label="Show all tasks"
              aria-pressed={activeFilter === "All"}
              className={tabClass("All")}
            >All</button>
            <button
              type="button"
              onClick={() => setActiveFilter("Today")}
              aria-label="Show today's tasks"
              aria-pressed={activeFilter === "Today"}
              className={tabClass("Today")}
            >Today</button>
            <button
              type="button"
              onClick={() => setActiveFilter("Upcoming")}
              aria-label="Show upcoming tasks"
              aria-pressed={activeFilter === "Upcoming"}
              className={tabClass("Upcoming")}
            >Upcoming</button>
            <button
              type="button"
              onClick={() => setActiveFilter("Completed")}
              aria-label="Show completed tasks"
              aria-pressed={activeFilter === "Completed"}
              className={tabClass("Completed")}
            >Completed</button>
        </div>
        
        <button
          type="button"
          onClick={() => setSortAsc(!sortAsc)}
          aria-label={sortAsc ? "Sort by due date ascending, click to reverse" : "Sort by due date descending, click to reverse"}
          className={`self-start sm:self-auto px-3 py-1 sm:mr-3 rounded-lg hover:scale-95 text-sm ${isDark ? "bg-[#334155] text-[#94a3b8]" : "bg-[#f1f4f6] text-[#5b6b73]"}`}
        >
            Sort by: Due Date {sortAsc ? "↑" : "↓"}
        </button>
        </div>

        <div className={`flex flex-col p-3 pt-1 justify-center items-start gap-3 ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>
          <div className='max-h-[500px] overflow-y-auto flex flex-col w-full scrollbar-none'>
          {sortedTasks.length === 0 ? (
            <p className={isDark ? "text-[#94a3b8] p-4" : "text-[#5f6b76] p-4"}>
              {tasks.length === 0
                ? "Aapke pass abhi koi task nahi hai — '+ Add New Task' se shuru karein!"
                : "No tasks found."}
            </p>
          ) : (
          sortedTasks.map((task) => {
            const { bg, text, dot } = priorityStyles(task.priority);
            return (

            <div 
            key={task.id}
            className={`flex flex-col gap-3 border-b w-full p-4 rounded ${isDark ? "border-[#334155]" : "border-[#e3e7ea]"}`}
            >

            <div className='flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-4'>

              <div className='flex items-start gap-3 flex-1 min-w-0 w-full sm:w-auto'>
                <label htmlFor={`task-complete-${task.id}`} className='sr-only'>
                  Mark "{task.title}" as {task.completed ? "incomplete" : "complete"}
                </label>
                <input 
                id={`task-complete-${task.id}`}
                type='checkbox'
                checked={task.completed}
                onChange={()=> setTasks(
                  tasks.map((t)=>
                  t.id === task.id
                ? { ...t, completed: !t.completed}
                : t
                )
                )}
                aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                className='w-5 h-5 mt-1 cursor-pointer accent-[#22b8cf] shrink-0'
                />

                <div className='flex flex-col gap-1 min-w-0 flex-1'>
                  {isEditing === task.id ? (
                    <>
                    <label htmlFor={`task-title-${task.id}`} className='sr-only'>Edit task title</label>
                    <input
                    id={`task-title-${task.id}`}
                    type="text"
                    value={task.title}
                    onChange={(e)=> setTasks (
                      tasks.map((t)=>
                      t.id === task.id
                      ? { ...t, title: e.target.value}
                      : t
                      )
                    )
                  }
                  aria-label="Edit task title"
                  className={`w-full text-xl font-semibold rounded outline-none ${isDark ? "bg-[#0f172a] text-[#f1f5f9]" : ""}`}
                    />
                    </>
                 ) : (
                  <h1
                  className={`text-xl font-semibold ${task.completed ? (isDark ? "line-through text-[#f1f5f9]" : "line-through text-[#1b262c]") : ""}`}
                  >
                    {task.title}
                  </h1>
                 )
                 }

                  {isEditing === task.id ? (
                    <>
                    <label htmlFor={`task-desc-${task.id}`} className='sr-only'>Edit task description</label>
                    <input
                    id={`task-desc-${task.id}`}
                    type="text"
                    value={task.description}
                    onChange={(e)=>
                      setTasks (
                        tasks.map((t)=>
                        t.id === task.id
                        ? { ...t, description: e.target.value}
                        : t
                        )
                      )
                    }
                    aria-label="Edit task description"
                    className={`w-full rounded outline-none ${isDark ? "bg-[#0f172a] text-[#f1f5f9]" : ""}`}
                    />
                    </>
                  ) : (
                    <p className={isDark ? "text-[#94a3b8]" : "text-[#5b6b73]"}>{task.description}</p>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-3 shrink-0 pl-8 sm:pl-0'>
                {task.dueDate && (
                  <span className={`flex items-center gap-1 text-sm whitespace-nowrap ${isDark ? "text-[#94a3b8]" : "text-[#5f6b76]"}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className='sr-only'>Due date: </span>
                    {new Date(task.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}

                {task.priority && (
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${bg} ${text}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dot}`} aria-hidden="true"></span>
                    <span className='sr-only'>Priority: </span>
                    {task.priority}
                  </span>
                )}
              </div>

            </div>
            
            <div className='flex flex-wrap gap-3'>

              <button
              type="button"
              className='bg-[#dff6fa] text-[#0a6b7d] px-4 py-2 rounded-lg hover:scale-95'
              onClick={()=> {
                setIsUndoAvailable(true);
                setUndoTask(task);
                setUndoAction("edit");
                setIsEditing(task.id)
              }}
              aria-label={`Edit task "${task.title}"`}
              >Edit</button>

              <button
              type="button"
              onClick={()=> {
                setIsUndoAvailable(true);
                setUndoTask(task);
                setUndoAction("delete");

                setTasks(
                  tasks.filter((t)=> t.id !== task.id)
                );
                setIsEditing(null);

              }}
              aria-label={`Delete task "${task.title}"`}
              className='bg-[#fbe9e9] text-[#b23a3a] px-4 py-2 rounded-lg hover:scale-95'
              >
                Delete
              </button>

            {isUndoAvailable && (
              <button 
              type="button"
              onClick={()=>{
                if (undoTask) {
                  setIsUndoAvailable(false);
                  setTasks((currentTasks) => {
                    const exists = currentTasks.some(
                      (t) => t.id === undoTask.id
                    );

                    if (exists) {
                      return currentTasks.map((t)=>
                      t.id === undoTask.id ? undoTask : t
                    );
                    }
                    return [...currentTasks, undoTask];

                  });
                  setUndoTask(null);
                  setUndoAction(null);
                  setIsEditing(null);
                }
              }}
              aria-label="Undo last action"
              className='bg-[#0c7c92] text-white px-4 py-2 rounded-lg hover:scale-95'>
              Undo</button>
            )}

              {isEditing === task.id && (
                 <button 
                  type="button"
                  className='bg-[#0c7c92] text-white px-4 py-2 rounded-lg w-fit'
                  onClick={()=>setIsEditing(null)}
                  aria-label={`Save changes to "${task.title}"`}
                  >
                    Save
                  </button>
              )}
             
              </div>
      
          </div>

              );
          })
          )}

        </div>
          </div>
      </div>
    </div>
  )
}

export default FilterButtons