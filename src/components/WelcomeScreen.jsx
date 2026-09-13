import React, { useState } from 'react'
import { SquareCheck } from 'lucide-react'

const WelcomeScreen = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onNameSubmit(name.trim());
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#f1f4f6]'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md'
      >
        <div className='flex flex-row items-center gap-2 justify-center mb-2'>
          <SquareCheck size={32} color='#22b8cf' />
          <h1 className='text-2xl font-bold text-[#1b262c]'>TaskFlow</h1>
        </div>

        <p className='text-center text-[#5b6b73] mb-2'>
         Type Your Name here...
        </p>

        <label htmlFor="user-name" className='sr-only'>Your name</label>
        <input
          id="user-name"
          type="text"
          placeholder="Type Your Name Here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          autoFocus
          className='p-3 rounded-lg border border-[#e3e7ea] outline-none focus:border-[#22b8cf] text-[#1b262c]'
        />

        <button
          type="submit"
          aria-label="Continue to dashboard"
          className='p-3 bg-[#22b8cf] text-white rounded-lg font-semibold hover:scale-97 transition-all'
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default WelcomeScreen