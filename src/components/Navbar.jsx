import React, { useState } from 'react'
import {Search, Bell, Sun, Moon, SquareCheck, User } from "lucide-react";

const Navbar = ({ searchQuery, setSearchQuery, theme, setTheme, userName, profileImage, handleImageUpload }) => {

  const isDark = theme === "dark";

  return (
    <div className={`border-b pb-5 ${isDark ? "border-[#334155]" : "border-[#e3e7ea]"}`}>
      <nav>
        <div className='flex flex-row gap-3 justify-between items-center pl-4 pt-5 pr-6'>
          <div className='flex flex-row gap-15 justify-center items-center flex-1 min-w-0'>
      
                 <div className={`flex flex-row justify-center items-center gap-2 p-2 rounded active:scale-98 hover:scale-98 w-full max-w-[300px] sm:max-w-none ${isDark ? "bg-[#1e293b] text-[#94a3b8]" : "bg-[#ffffff] text-[#5f6b76]"}`}>
                    <Search size={14} color={isDark ? "#94a3b8" : "#5b6b73"} />

                  <label htmlFor="task-search" className='sr-only'>Search tasks</label>
                  <input 
                  id="task-search"
                  type='text' 
                  placeholder='Search tasks...' 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search tasks"
                  className={`w-full outline-none text-[12px] bg-transparent ${isDark ? "text-[#f1f5f9] placeholder-[#64748b]" : "text-[#1b262c]"}`}
                  >
                  </input>
                  </div>
          </div>

                <div className='flex flex-row justify-center items-center gap-4 sm:gap-10 p-2'>
                  <button
                    type="button"
                    aria-label="Notifications"
                    className='flex hover:scale-95'
                  >
                    <Bell size={24} color={isDark ? "#94a3b8" : "#5b6b73"}/>
                  </button>

                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    className={`flex justify-center items-center p-2 rounded-full hover:scale-95 transition-all ${isDark ? "bg-[#334155]" : "bg-[#dff6fa]"}`}
                  >
                    {isDark ? (
                      <Sun size={20} color='#f5b73f' />
                    ) : (
                      <Moon size={20} color='#5b6b73' />
                    )}
                  </button>

                  <div className='flex flex-row items-center gap-2'>

                    <label htmlFor="navbar-profile-upload" className='cursor-pointer shrink-0'>
                      <span className='sr-only'>Upload profile photo</span>
                      <div className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border ${isDark ? "bg-[#334155] border-[#475569]" : "bg-[#dff6fa] border-[#e3e7ea]"}`}>
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <User size={18} color={isDark ? "#94a3b8" : "#0c7c92"} />
                        )}
                      </div>
                      <input
                        id="navbar-profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        aria-label="Upload profile photo"
                        className='hidden'
                      />
                    </label>

                    <h2 className={`text-sm font-medium ${isDark ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>{userName}</h2>
                  </div>

                </div>

          </div>
      </nav>
    </div>
  )
}

export default Navbar