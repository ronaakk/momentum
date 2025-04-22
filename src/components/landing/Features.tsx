import React from 'react'

function Features() {
  return (
    <div id='features' className='animate-slide-in flex flex-col justify-center items-center py-8 md:py-12 space-y-6 sm:px-10 md:px-12'>
      <div className='header font-medium sm:text-4xl'>
        What is Momentum? 
      </div>
      <p className='max-w-3xl text-center pb-4 sm:pb-8 text-lg'>
        A habit-building platform designed to help you stay consistent, track your progress, and create lasting change — one small action at a time.
      </p>

      <div className="grid grid-cols-1 mt-10 gap-6 text-sm sm:grid-cols-2 sm:grid-rows-2">
        <li className="feature-card">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-spotifyGreen">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          <h3 className='mt-6 font-semibold text-gray-950'>Built on what actually works</h3>
          <p className='mt-2 text-gray-600'>Momentum is grounded in real, time-tested habit-building principles — making your actions clear, appealing, simple to follow, and rewarding enough to stick.</p>
        </li>

        <li className='feature-card'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-spotifyGreen">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          <h3 className='mt-6 font-semibold text-gray-950'>Big changes start small</h3>
          <p className='mt-2 text-gray-600'>Focus on the little things — small, consistent actions that build up over time and lead to meaningful, lasting progress.</p>
        </li>

        <li className='feature-card'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-spotifyGreen">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
          <h3 className='mt-6 font-semibold text-gray-950'>Grow your habits, grow your impact</h3>
          <p className='mt-2 text-gray-600'>Momentum is designed to help you not just start, but build on your progress. As your habits strengthen, so does your ability to take on more and aim higher.</p>
        </li>

        <li className='feature-card'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-spotifyGreen">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <h3 className='mt-6 font-semibold text-gray-950'>Showing up matters</h3>
          <p className='mt-2 text-gray-600'>Everyone needs a gentle push sometimes to return to what matters most. Momentum will help you stay on track.</p>
        </li>
      </div>
    </div>
  )
}

export default Features