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
    <div className={`border-b pb-3 sm:pb-4 ${isDark ? "border-[#334155]" : "border-[#e3e7ea]"}`}>
      <nav>

        <div className='flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 justify-between items-center h-16 sm:h-[76px] px-4 sm:px-5 lg:px-0 lg:pr-6'>

          <div className='flex flex-row items-center gap-2 sm:gap-3 flex-1 min-w-0'>

            <button
              onClick={onMenuClick}
              aria-label="Open menu"
              className={`lg:hidden shrink-0 p-2 rounded-lg ${isDark ? "bg-[#1e293b] text-[#f1f5f9]" : "bg-white text-[#1b262c]"}`}
            >
              <Menu size={20} />
            </button>

            <div className={`flex flex-row items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-colors flex-1 min-w-0 ${isDark ? "bg-[#1e293b] border-[#334155] text-[#94a3b8] hover:border-[#475569] focus-within:border-[#22b8cf]" : "bg-[#ffffff] border-[#e3e7ea] text-[#9aa5ad] hover:border-[#c7d0d6] focus-within:border-[#22b8cf]"}`}>
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

         
          <div className='flex flex-row items-center gap-3 sm:gap-5 md:gap-6 shrink-0'>

            <button
              type="button"
              onClick={onBellClick}
              aria-label={reminderCount > 0 ? `Notifications, ${reminderCount} due soon` : "Notifications"}
              className={`relative flex items-center justify-center p-2 sm:p-2.5 rounded-full hover:scale-95 transition-transform ${isDark ? "bg-[#1e293b]" : "bg-[#f1f4f6]"}`}
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
              className={`flex justify-center items-center p-2 sm:p-2.5 rounded-full hover:scale-95 transition-all ${isDark ? "bg-[#334155]" : "bg-[#dff6fa]"}`}
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
              className='flex flex-row items-center gap-2 sm:gap-2.5 hover:scale-95 transition-transform pl-1 sm:pl-2 sm:border-l border-current/10'
            >
              <div className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border ${isDark ? "bg-[#334155] border-[#475569]" : "bg-[#dff6fa] border-[#e3e7ea]"}`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className='w-full h-full object-cover' />
                ) : (
                  <User size={18} color={isDark ? "#94a3b8" : "#0c7c92"} />
                )}
              </div>

              <h2 className={`hidden md:block text-sm font-medium max-w-[100px] truncate ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{userName}</h2>
            </button>

          </div>

        </div>
      </nav>
    </div>
  )
}

export default Navbar