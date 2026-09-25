import React from 'react'
import { Search, Bell, Sun, Moon, User, Menu } from "lucide-react";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  userName,
  profileImage,
  onProfileClick,
  reminderCount = 0,
  onBellClick,
  onMenuClick
}) => {

  const isDark = theme === "dark";

  return (
    <div className={`border-b pb-4 sm:pb-5 ${isDark ? "border-[#334155]" : "border-[#e3e7ea]"}`}>
      <nav>
        
        <div className='flex flex-row flex-wrap gap-3 justify-between items-center pt-4 sm:pt-5 px-4 lg:px-0 lg:pr-6'>

          <div className='flex flex-row items-center gap-3 flex-1 min-w-0'>

            <button
              onClick={onMenuClick}
              aria-label="Open menu"
              className={`lg:hidden shrink-0 p-2 rounded-lg ${isDark ? "bg-[#1e293b] text-[#f1f5f9]" : "bg-white text-[#1b262c]"}`}
            >
              <Menu size={20} />
            </button>

            <div className={`flex flex-row items-center gap-2 px-3 py-2 rounded-lg active:scale-98 hover:scale-98 flex-1 min-w-0 ${isDark ? "bg-[#1e293b] text-[#94a3b8]" : "bg-[#ffffff] text-[#9aa5ad]"}`}>
              <Search size={16} color={isDark ? "#94a3b8" : "#5b6b73"} className='shrink-0' />

              <label htmlFor="task-search" className='sr-only'>Search tasks</label>
              <input
                id="task-search"
                type='text'
                placeholder='Search tasks...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search tasks"
                className={`w-full outline-none text-sm bg-transparent ${isDark ? "text-[#f1f5f9] placeholder-[#64748b]" : "text-[#1b262c]"}`}
              />
            </div>
          </div>

          <div className='flex flex-row items-center gap-3 sm:gap-4 shrink-0'>

            <button
              type="button"
              onClick={onBellClick}
              aria-label={reminderCount > 0 ? `Notifications, ${reminderCount} due soon` : "Notifications"}
              className={`relative flex items-center justify-center p-2 rounded-full hover:scale-95 ${isDark ? "bg-[#1e293b]" : "bg-[#f1f4f6]"}`}
            >
              <Bell size={20} color={isDark ? "#94a3b8" : "#5b6b73"} />
              {reminderCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-[#b23a3a] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1'>
                  {reminderCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`flex justify-center items-center p-2 rounded-full hover:scale-95 transition-all ${isDark ? "bg-[#334155]" : "bg-[#dff6fa]"}`}
            >
              {isDark ? (
                <Sun size={18} color='#f5b73f' />
              ) : (
                <Moon size={18} color='#5b6b73' />
              )}
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              aria-label="Open profile"
              className='flex flex-row items-center gap-2 hover:scale-95'
            >
              <div className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border ${isDark ? "bg-[#334155] border-[#475569]" : "bg-[#dff6fa] border-[#e3e7ea]"}`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className='w-full h-full object-cover' />
                ) : (
                  <User size={18} color={isDark ? "#94a3b8" : "#0c7c92"} />
                )}
              </div>

              <h2 className={`hidden sm:block text-sm font-medium ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{userName}</h2>
            </button>

          </div>

        </div>
      </nav>
    </div>
  )
}

export default Navbar