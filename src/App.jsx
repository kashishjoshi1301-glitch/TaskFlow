import {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import FilterButtons from './components/FilterButtons';
import WelcomeScreen from './components/WelcomeScreen';

const App = () => {
   const dummyTasks = [ 
  {
    id: 1,
    title: "Fix Navbar Responsiveness",
    description: "Navbar breaks on smaller screens, needs a mobile-friendly layout.",
    priority: "High",
    dueDate: "2026-09-10",
    completed: true
  },
  {
    id: 2,
    title: "Deploy Project to Vercel",
    description: "Set up build configuration and deploy the latest version.",
    priority: "High",
    dueDate: "2026-09-11",
    completed: true
  },
  {
    id: 3,
    title: "Update GitHub README",
    description: "Add project features, screenshots and setup instructions.",
    priority: "Low",
    dueDate: "2026-09-12",
    completed: false
  },
  {
    id: 4,
    title: "Complete React Dashboard",
    description: "Finish the TaskFlow dashboard UI and improve the overall layout.",
    priority: "High",
    dueDate: "2026-09-13",
    completed: false
  },
  {
    id: 5,
    title: "Team Standup Meeting",
    description: "Discuss progress, blockers and plan for the sprint.",
    priority: "Medium",
    dueDate: "2026-09-13",
    completed: false
  },
  {
    id: 6,
    title: "Reply to Client Emails",
    description: "Clear out pending emails and confirm next steps with the client.",
    priority: "Medium",
    dueDate: "2026-09-13",
    completed: true
  },
  {
    id: 7,
    title: "Learn React Hooks",
    description: "Practice useState, useEffect and useContext with small examples.",
    priority: "Medium",
    dueDate: "2026-09-14",
    completed: false
  },
  {
    id: 8,
    title: "Build Task Card Component",
    description: "Create reusable task cards with edit, delete and undo functionality.",
    priority: "High",
    dueDate: "2026-09-15",
    completed: false
  },
  {
    id: 9,
    title: "Design Login Page UI",
    description: "Create a clean and responsive login screen with validation states.",
    priority: "Medium",
    dueDate: "2026-09-16",
    completed: false
  },
  {
    id: 10,
    title: "Practice DSA",
    description: "Solve 5 array and string problems.",
    priority: "Medium",
    dueDate: "2026-09-17",
    completed: false
  },
  {
    id: 11,
    title: "Prepare for Interview",
    description: "Revise JavaScript, React and basic CS fundamentals.",
    priority: "High",
    dueDate: "2026-09-18",
    completed: false
  },
  {
    id: 12,
    title: "Refactor Sidebar Component",
    description: "Clean up repeated JSX and extract a reusable NavItem component.",
    priority: "Medium",
    dueDate: "2026-09-19",
    completed: false
  },
  {
    id: 13,
    title: "Write Unit Tests",
    description: "Add unit tests for the FilterButtons and StatCard components.",
    priority: "Medium",
    dueDate: "2026-09-20",
    completed: false
  },
  {
    id: 14,
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits and household essentials for the week.",
    priority: "Low",
    dueDate: "2026-09-21",
    completed: false
  },
  {
    id: 15,
    title: "Research State Management Libraries",
    description: "Compare Redux, Zustand and Context API for the next project.",
    priority: "Low",
    dueDate: "2026-09-22",
    completed: false
  },
  {
    id: 16,
    title: "Read a Chapter of Clean Code",
    description: "Continue reading and take notes on best practices.",
    priority: "Low",
    dueDate: "2026-09-23",
    completed: false
  },
  {
    id: 17,
    title: "Book Dentist Appointment",
    description: "Schedule a routine dental checkup for next week.",
    priority: "Low",
    dueDate: "2026-09-24",
    completed: false
  },
  {
    id: 18,
    title: "Plan Weekend Trip",
    description: "Book tickets and finalize itinerary for the weekend getaway.",
    priority: "Low",
    dueDate: "2026-09-25",
    completed: false
  }

];

   const [tasks, setTasks] = useState(dummyTasks);

   const [profileImage, setProfileImage] = useState(() => {
     return localStorage.getItem("taskflow-profile-image") || null;
   });

   useEffect(() => {
     if (profileImage) {
       localStorage.setItem("taskflow-profile-image", profileImage);
     }
   }, [profileImage]);

   const handleImageUpload = (e) => {
     const file = e.target.files[0];
     if (!file) return;

     const reader = new FileReader();
     reader.onloadend = () => {
       setProfileImage(reader.result);
     };
     reader.readAsDataURL(file);
   };

   const [userName, setUserName] = useState(() => {
     return localStorage.getItem("taskflow-username") || "";
   });

   const [searchQuery, setSearchQuery] = useState("");
   const [activeItem, setActiveItem] = useState("Dashboard");
   const [theme, setTheme] = useState(() => {
     return localStorage.getItem("taskflow-theme") || "light";
   });

   useEffect(() => {
     if (!userName) return;
     const saved = localStorage.getItem(`taskflow-tasks-${userName}`);
     setTasks(saved ? JSON.parse(saved) : []);
   }, [userName]);

   useEffect(() => {
     if (!userName) return;
     localStorage.setItem(`taskflow-tasks-${userName}`, JSON.stringify(tasks));
   }, [tasks, userName]);

   useEffect(() => {
     localStorage.setItem("taskflow-theme", theme);
   }, [theme]);

   useEffect(() => {
     document.body.style.backgroundColor = theme === "dark" ? "#0f172a" : "#f1f4f6";
   }, [theme]);

   const handleNameSubmit = (name) => {
     localStorage.setItem("taskflow-username", name);
     setUserName(name);
   };

   const totalTasks = tasks.length;
   const completedTasks = tasks.filter(task => task.completed).length;
   const pendingTasks = tasks.filter(task => !task.completed).length;
   const inProgressTasks = 0;
   const importantTasks = tasks.filter(task => task.priority === "High");

   if (!userName) {
     return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
   }

  return (
    <div className={`${theme === "dark" ? "bg-[#0f172a]" : "bg-[#f1f4f6]"} min-h-screen w-full`}>
      
      <div className='flex flex-row gap-6 items-start '>
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          theme={theme}
          userName={userName}
          profileImage={profileImage}
          handleImageUpload={handleImageUpload}
        />
          <main className={`flex flex-col gap-6 w-full pr-6 pb-6 min-h-screen ${theme === "dark" ? "bg-[#0f172a]" : "bg-[#f1f4f6]"}`}>

          <Navbar
          searchQuery = {searchQuery}
          setSearchQuery = {setSearchQuery}
          theme = {theme}
          setTheme = {setTheme}
          userName = {userName}
          profileImage={profileImage}
          handleImageUpload={handleImageUpload}
          />

          {activeItem === "Dashboard" && (
            <>
              <StatCard
              totalTasks = {totalTasks}
              completedTasks = {completedTasks}
              inProgressTasks = {inProgressTasks}
              pendingTasks = {pendingTasks}
              tasks = {tasks}
              setTasks = {setTasks}
              theme = {theme}
              userName = {userName}
              />
              <FilterButtons 
              tasks = {tasks}
              setTasks = {setTasks}
              searchQuery = {searchQuery}
              theme = {theme}
              />
            </>
          )}

          {activeItem === "My Tasks" && (
            <FilterButtons 
            tasks = {tasks}
            setTasks = {setTasks}
            searchQuery = {searchQuery}
            theme = {theme}
            />
          )}

          {activeItem === "Calendar" && (
            <div className={`p-6 ${theme === "dark" ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>
              <h1 className='text-2xl font-bold mb-2'>Calendar</h1>
              <p className={theme === "dark" ? "text-[#94a3b8]" : "text-[#5b6b73]"}>Calendar view coming soon.</p>
            </div>
          )}

          {activeItem === "Important" && (
            <FilterButtons 
            tasks = {importantTasks}
            setTasks = {setTasks}
            searchQuery = {searchQuery}
            theme = {theme}
            />
          )}

          {activeItem === "Settings" && (
            <div className={`p-6 ${theme === "dark" ? "text-[#f1f5f9]" : "text-[#1b262c]"}`}>
              <h1 className='text-2xl font-bold mb-2'>Settings</h1>
              <p className={theme === "dark" ? "text-[#94a3b8]" : "text-[#5b6b73]"}>Settings page coming soon.</p>
            </div>
          )}

          </main>
          
      </div>
      
    </div>
  );
};

export default App