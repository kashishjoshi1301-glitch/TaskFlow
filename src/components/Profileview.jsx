import React from 'react'
import { User } from 'lucide-react'
 
const ProfileView = ({
  tasks,
  userName,
  profileImage,
  handleImageUpload,
  removeProfileImage,
  onLogout,
  theme
}) => {
  const isDark = theme === "dark";
 
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === "High" && !t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
 
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate).setHours(0, 0, 0, 0) < today.getTime()
  ).length;
 
  const nextUp = tasks
    .filter((t) => !t.completed && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);
 
  const card = isDark ? "bg-[#1e293b] border-[#334155] text-[#f1f5f9]" : "bg-white border-[#e3e7ea] text-[#1b262c]";
  const muted = isDark ? "text-[#94a3b8]" : "text-[#5b6b73]";
  const ghostBtn = isDark ? "bg-[#334155] text-[#f1f5f9]" : "bg-[#f1f4f6] text-[#1b262c]";
 
  const Stat = ({ value, label }) => (
    <div className='flex flex-col items-center sm:items-start'>
      <span className='text-xl sm:text-2xl font-bold'>{value}</span>
      <span className={`text-sm ${muted}`}>{label}</span>
    </div>
  );
 
  return (
    <div className={`w-full rounded-lg border p-5 sm:p-8 ${card}`}>
 
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-12 items-center sm:items-start'>
 
        <div className={`w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#22b8cf] ${isDark ? "bg-[#334155]" : "bg-[#dff6fa]"}`}>
          {profileImage ? (
            <img src={profileImage} alt={`${userName}'s profile`} className='w-full h-full object-cover' />
          ) : (
            <User size={56} color={isDark ? "#94a3b8" : "#0c7c92"} />
          )}
        </div>
 
        <div className='flex flex-col gap-4 w-full items-center sm:items-start'>
          <div className='flex flex-col sm:flex-row items-center gap-3'>
            <h1 className='text-2xl font-semibold'>{userName}</h1>
 
            <div className='flex gap-2'>
              <label htmlFor="profile-page-upload" className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-95 ${ghostBtn}`}>
                {profileImage ? "Change photo" : "Add photo"}
                <input
                  id="profile-page-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </label>
 
              {profileImage && (
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-95 ${ghostBtn}`}
                >
                  Remove
                </button>
              )}
 
              <button
                type="button"
                onClick={onLogout}
                className='px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#fbe9e9] text-[#b23a3a] hover:scale-95'
              >
                Log out
              </button>
            </div>
          </div>
 
          <div className='flex gap-8 sm:gap-10'>
            <Stat value={total} label="tasks" />
            <Stat value={completed} label="completed" />
            <Stat value={pending} label="pending" />
          </div>
 
          <p className={`text-sm ${muted}`}>TaskFlow · Free Plan</p>
        </div>
      </div>
 
      <div className='mt-8'>
        <div className='flex justify-between text-sm mb-2'>
          <span className='font-semibold'>Overall progress</span>
          <span className={muted}>{percent}%</span>
        </div>
        <div className={`h-2 w-full rounded-full ${isDark ? "bg-[#334155]" : "bg-[#e3e7ea]"}`}>
          <div className='h-2 rounded-full bg-[#22b8cf] transition-all' style={{ width: `${percent}%` }}></div>
        </div>
        <div className={`flex gap-6 mt-3 text-sm ${muted}`}>
          <span>{highPriority} high priority open</span>
          <span className={overdue > 0 ? "text-[#b23a3a] font-semibold" : ""}>{overdue} overdue</span>
        </div>
      </div>
 

      <div className='mt-8'>
        <h2 className='font-semibold mb-3'>Next up</h2>
        {nextUp.length === 0 ? (
          <p className={`text-sm ${muted}`}>Nothing pending with a due date.</p>
        ) : (
          <ul className='flex flex-col'>
            {nextUp.map((t) => (
              <li key={t.id} className={`flex justify-between gap-3 py-2 border-b text-sm ${isDark ? "border-[#334155]" : "border-[#e3e7ea]"}`}>
                <span className='truncate'>{t.title}</span>
                <span className={`shrink-0 ${muted}`}>
                  {new Date(t.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
 
    </div>
  )
}
 
export default ProfileView
 
