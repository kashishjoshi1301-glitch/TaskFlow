import React, { useState } from 'react'
import {
  LayoutDashboard,
  List,
  CalendarDays,
  Star,
  Settings,
  SquareCheck,
  User
} from 'lucide-react'

const Sidebar = ({ activeItem, setActiveItem, theme, userName, profileImage, handleImageUpload }) => {

  const sidebarItems = [
    "Dashboard",
    "My Tasks",
    "Calendar",
    "Important",
    "Settings"
  ]

  const isDark = theme === "dark";

  const itemClass = (name) =>
    `flex flex-row w-50 mr-4 justify-start items-center p-1 rounded transition-all ${
      activeItem === name
        ? isDark
          ? "bg-[#1e293b] text-[#38bdf8] border-l-[3px] border-[#22b8cf]"
          : "bg-[#dff6fa] text-[#0a6b7d] border-l-[3px] border-[#22b8cf]"
        : isDark
        ? "text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#1e293b]"
        : "text-[#5b6b73] hover:text-[#1b262c] hover:bg-[#f1f4f6]"
    }`;

  return (
    <div className={`flex flex-col w-60 pl-6 pt-2 pb-4 h-screen border-r ${isDark ? "bg-[#0f172a] border-[#334155]" : "bg-[#ffffff] border-[#e7e3ea]"}`}>

      <div className='flex flex-row justify-start items-center pb-6 pt-4 gap-1 hover:scale-[0.97] transition-all'>
        <SquareCheck size={35} color='#22b8cf' />
        <h1 className={`text-3xl font-semibold ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>
          TaskFlow
        </h1>
      </div>

      <nav aria-label="Main navigation" className='flex flex-col gap-2'>

        <div className={itemClass("Dashboard")}>
          <LayoutDashboard size={20} aria-hidden="true" />
          <button
            onClick={() => setActiveItem(sidebarItems[0])}
            aria-label="Go to Dashboard"
            aria-current={activeItem === "Dashboard" ? "page" : undefined}
            className='px-4 py-2 rounded-lg transition-all'
          >
            Dashboard
          </button>
        </div>

        <div className={itemClass("My Tasks")}>
          <List size={20} aria-hidden="true" />
          <button
            onClick={() => setActiveItem(sidebarItems[1])}
            aria-label="Go to My Tasks"
            aria-current={activeItem === "My Tasks" ? "page" : undefined}
            className='px-4 py-2 rounded-lg transition-all'
          >
            My Tasks
          </button>
        </div>

        <div className={itemClass("Calendar")}>
          <CalendarDays size={20} aria-hidden="true" />
          <button
            onClick={() => setActiveItem(sidebarItems[2])}
            aria-label="Go to Calendar"
            aria-current={activeItem === "Calendar" ? "page" : undefined}
            className='px-4 py-2 rounded-lg transition-all'
          >
            Calendar
          </button>
        </div>

        <div className={itemClass("Important")}>
          <Star size={20} aria-hidden="true" />
          <button
            onClick={() => setActiveItem(sidebarItems[3])}
            aria-label="Go to Important tasks"
            aria-current={activeItem === "Important" ? "page" : undefined}
            className='px-4 py-2 rounded-lg transition-all'
          >
            Important
          </button>
        </div>

        <div className={itemClass("Settings")}>
          <Settings size={20} aria-hidden="true" />
          <button
            onClick={() => setActiveItem(sidebarItems[4])}
            aria-label="Go to Settings"
            aria-current={activeItem === "Settings" ? "page" : undefined}
            className='px-4 py-2 rounded-lg transition-all'
          >
            Settings
          </button>
        </div>

      </nav>

      <div className='flex-1'></div>

      <div className={`flex flex-row items-center gap-3 w-50 mr-4 p-2 rounded-lg transition-all ${isDark ? "hover:bg-[#1e293b]" : "hover:bg-[#f1f4f6]"}`}>

        <label htmlFor="profile-upload" className='cursor-pointer shrink-0'>
          <span className='sr-only'>Upload profile photo</span>
          <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border ${isDark ? "bg-[#334155] border-[#475569]" : "bg-[#dff6fa] border-[#e3e7ea]"}`}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className='w-full h-full object-cover' />
            ) : (
              <User size={20} color={isDark ? "#94a3b8" : "#0c7c92"} />
            )}
          </div>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            aria-label="Upload profile photo"
            className='hidden'
          />
        </label>

        <div className='flex flex-col min-w-0'>
          <p className={`text-sm font-semibold truncate ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{userName}</p>
          <p className={`text-xs truncate ${isDark ? "text-[#94a3b8]" : "text-[#5f6b76]"}`}>Free Plan</p>
        </div>

      </div>

    </div>
  )
}

export default Sidebar