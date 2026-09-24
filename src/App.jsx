import { useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import FilterButtons from './components/FilterButtons';
import WelcomeScreen from './components/WelcomeScreen';
import CalendarView from './Calenderview';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';   // NEW

const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const loadTasks = (name) => {
  if (!name) return [];
  try {
    const saved = localStorage.getItem(`taskflow-tasks-${name}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadImage = (name) => {
  if (!name) return null;
  try {
    return localStorage.getItem(`taskflow-profile-image-${name}`) || null;
  } catch {
    return null;
  }
};

// NEW: dashboard ki task list ki height. 540 badhao => list chhoti, page aur chhota. 540 ghatao => list badi.
const DASHBOARD_LIST_HEIGHT = "clamp(200px, calc(100vh - 540px), 520px)";

const App = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem("taskflow-username") || "");

  const [tasks, setTasks] = useState(() => loadTasks(localStorage.getItem("taskflow-username")));

  const [deletedStack, setDeletedStack] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("taskflow-theme") || "light");

  const [profileImage, setProfileImage] = useState(() => loadImage(localStorage.getItem("taskflow-username")));

  // NEW: reminders on/off (Settings se control hota hai)
  const [remindersEnabled, setRemindersEnabledState] = useState(
    () => localStorage.getItem("taskflow-reminders") !== "off"
  );
  const setRemindersEnabled = (value) => {
    setRemindersEnabledState(value);
    localStorage.setItem("taskflow-reminders", value ? "on" : "off");
    if (!value) setToast([]);
  };

  const [now, setNow] = useState(new Date());
  const [toast, setToast] = useState([]);
  const [showReminders, setShowReminders] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      try {
        localStorage.setItem(`taskflow-profile-image-${userName}`, reader.result);
      } catch {
        alert("The image is too large. Please choose a smaller image.");
      }
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    localStorage.removeItem(`taskflow-profile-image-${userName}`);
  };

  const handleNameSubmit = (name) => {
    localStorage.setItem("taskflow-username", name);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("taskflow-username");
    setDeletedStack([]);
    setActiveItem("Dashboard");
    setProfileImage(null);
    setTasks([]);
    setToast([]);
    setUserName("");
  };

  // NEW: Settings se naam badalna. Tasks/image/notified data naye naam par move hota hai.
  // Error message return karta hai, sab theek ho toh null.
  const handleRename = (raw) => {
    const newName = raw.trim();
    if (!newName) return "Name khali nahi ho sakta.";
    if (newName === userName) return null;

    const prefixes = ["taskflow-tasks-", "taskflow-profile-image-", "taskflow-notified-"];
    if (prefixes.some((p) => localStorage.getItem(p + newName) !== null)) {
      return "Ye naam already kisi aur user ke paas hai.";
    }

    try {
      localStorage.setItem(`taskflow-tasks-${newName}`, JSON.stringify(tasks));
      if (profileImage) localStorage.setItem(`taskflow-profile-image-${newName}`, profileImage);
      const notified = localStorage.getItem(`taskflow-notified-${userName}`);
      if (notified) localStorage.setItem(`taskflow-notified-${newName}`, notified);
    } catch {
      prefixes.forEach((p) => localStorage.removeItem(p + newName));
      return "Storage full hai, naam change nahi ho paya.";
    }

    prefixes.forEach((p) => localStorage.removeItem(p + userName));
    localStorage.setItem("taskflow-username", newName);
    setUserName(newName);
    return null;
  };

  // NEW: is user ka saara data delete karke logout
  const handleDeleteAccount = () => {
    ["taskflow-tasks-", "taskflow-profile-image-", "taskflow-notified-"].forEach((p) =>
      localStorage.removeItem(p + userName)
    );
    handleLogout();
  };

  useEffect(() => {
    if (!userName) return;
    setTasks(loadTasks(userName));
    setProfileImage(loadImage(userName));
  }, [userName]);

  useEffect(() => {
    if (!userName) return;
    localStorage.setItem(`taskflow-tasks-${userName}`, JSON.stringify(tasks));
  }, [tasks, userName]);

  useEffect(() => {
    localStorage.setItem("taskflow-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#0f172a" : "#f1f4f6";
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (userName && remindersEnabled && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [userName, remindersEnabled]);

  const reminders = useMemo(() => {
    const todayKey = toKey(now);
    const t = new Date(now);
    t.setDate(t.getDate() + 1);
    const tomorrowKey = toKey(t);

    return tasks
      .filter((task) => !task.completed && task.dueDate)
      .filter((task) => task.dueDate === tomorrowKey || task.dueDate === todayKey)
      .map((task) => ({ ...task, when: task.dueDate === todayKey ? "today" : "tomorrow" }));
  }, [tasks, now]);

  useEffect(() => {
    // CHANGED: remindersEnabled off ho toh popup/notification nahi aayega
    if (!userName || !remindersEnabled || reminders.length === 0) return;
    const storeKey = `taskflow-notified-${userName}`;
    let notified = [];
    try { notified = JSON.parse(localStorage.getItem(storeKey) || "[]"); } catch { notified = []; }

    const fresh = reminders.filter((r) => !notified.includes(`${r.id}-${r.dueDate}-${r.when}`));
    if (fresh.length === 0) return;

    fresh.forEach((r) => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("TaskFlow reminder", {
          body: `"${r.title}" is due ${r.when}. Time to complete it!`,
        });
      }
    });

    setToast((prev) => [...prev, ...fresh]);
    localStorage.setItem(
      storeKey,
      JSON.stringify([...notified, ...fresh.map((r) => `${r.id}-${r.dueDate}-${r.when}`)])
    );
  }, [reminders, userName, remindersEnabled]);

  const handleBellClick = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setShowReminders((s) => !s);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const inProgressTasks = 0;
  const importantTasks = tasks.filter((task) => task.priority === "High");

  if (!userName) {
    return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
  }

  const isDark = theme === "dark";

  const filterProps = {
    setTasks,
    searchQuery,
    theme,
    deletedStack,
    setDeletedStack,
  };

  return (
    <div className={`${isDark ? "bg-[#0f172a]" : "bg-[#f1f4f6]"} min-h-screen w-full`}>

      {toast.length > 0 && (
        <div
          role="alert"
          className={`fixed top-4 right-4 z-[60] w-[90%] max-w-sm rounded-lg border p-4 shadow-lg ${isDark ? "bg-[#1e293b] border-[#334155] text-[#f1f5f9]" : "bg-white border-[#e3e7ea] text-[#1b262c]"}`}
        >
          <div className='flex justify-between items-start gap-3'>
            <p className='font-semibold'>Reminder</p>
            <button
              type="button"
              onClick={() => setToast([])}
              aria-label="Dismiss reminders"
              className={isDark ? "text-[#94a3b8]" : "text-[#5b6b73]"}
            >✕</button>
          </div>
          <ul className='mt-2 flex flex-col gap-1 text-sm'>
            {toast.map((r) => (
              <li key={`${r.id}-${r.when}`}>
                "{r.title}" is due <span className='font-semibold'>{r.when}</span>. Please complete it.
              </li>
            ))}
          </ul>
        </div>
      )}

      {showReminders && (
        <div
          className={`fixed top-16 right-4 z-[60] w-[90%] max-w-sm rounded-lg border p-4 shadow-lg ${isDark ? "bg-[#1e293b] border-[#334155] text-[#f1f5f9]" : "bg-white border-[#e3e7ea] text-[#1b262c]"}`}
        >
          <div className='flex justify-between items-center mb-2'>
            <p className='font-semibold'>Reminders</p>
            <button
              type="button"
              onClick={() => setShowReminders(false)}
              aria-label="Close reminders"
              className={isDark ? "text-[#94a3b8]" : "text-[#5b6b73]"}
            >✕</button>
          </div>
          {reminders.length === 0 ? (
            <p className={`text-sm ${isDark ? "text-[#94a3b8]" : "text-[#5b6b73]"}`}>
              No tasks due today or tomorrow.
            </p>
          ) : (
            <ul className='flex flex-col gap-2 text-sm'>
              {reminders.map((r) => (
                <li key={`${r.id}-${r.when}`} className='flex justify-between gap-3'>
                  <span className='truncate'>{r.title}</span>
                  <span className={`shrink-0 font-semibold ${r.when === "today" ? "text-[#b23a3a]" : "text-[#8a5f0c]"}`}>
                    Due {r.when}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className='flex flex-row gap-6 items-start relative'>
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className='fixed inset-0 bg-black/40 z-40 lg:hidden'
          ></div>
        )}

        <div
          className={`fixed lg:static top-0 left-0 h-full z-50 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <Sidebar
            activeItem={activeItem}
            setActiveItem={(item) => {
              setActiveItem(item);
              setIsSidebarOpen(false);
            }}
            theme={theme}
            userName={userName}
            profileImage={profileImage}
          />
        </div>

        <main className={`flex flex-col gap-4 lg:gap-6 w-full px-4 lg:px-0 lg:pr-6 pb-6 min-h-screen ${isDark ? "bg-[#0f172a]" : "bg-[#f1f4f6]"}`}>

          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
            setTheme={setTheme}
            userName={userName}
            profileImage={profileImage}
            onProfileClick={() => setActiveItem("Profile")}
            reminderCount={reminders.length}
            onBellClick={handleBellClick}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {activeItem === "Dashboard" && (
            <>
              <StatCard
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                inProgressTasks={inProgressTasks}
                pendingTasks={pendingTasks}
                tasks={tasks}
                setTasks={setTasks}
                theme={theme}
                userName={userName}
              />
              <FilterButtons
                tasks={tasks}
                listMaxHeight= {283}
                {...filterProps}
              />
            </>
          )}

          {activeItem === "My Tasks" && (
            <FilterButtons tasks={tasks} {...filterProps} />
          )}

          {activeItem === "Important" && (
            <FilterButtons tasks={importantTasks} heading="Important Tasks" {...filterProps} />
          )}

          {activeItem === "Profile" && (
            <ProfileView
              tasks={tasks}
              userName={userName}
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              removeProfileImage={removeProfileImage}
              onLogout={handleLogout}
              theme={theme}
            />
          )}

          {activeItem === "Calendar" && (
            <CalendarView
              tasks={tasks}
              setTasks={setTasks}
              theme={theme}
            />
          )}

          {activeItem === "Settings" && (
            <SettingsView
              theme={theme}
              setTheme={setTheme}
              userName={userName}
              tasks={tasks}
              setTasks={setTasks}
              onRename={handleRename}
              remindersEnabled={remindersEnabled}
              setRemindersEnabled={setRemindersEnabled}
              onDeleteAccount={handleDeleteAccount}
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default App