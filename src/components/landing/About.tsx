import React from 'react'
import { Button } from '../ui/button'
import Link from "next/link";

function About() {
  return (
    <div className="animate-slide-in flex flex-col justify-center items-center py-8 md:py-10 space-y-6 sm:px-10 md:px-12 border-t border-pglightgrey">
      <h1 className="header tracking-tight h-[3rem] sm:h-[4rem] text-2xl leading-normal md:text-5xl lg:text-6xl text-center">
        Tiny actions, lasting change.
      </h1>
      <p className="italic leading text-center text-sm md:text-lg lg:text-xl">
        Consistent, small efforts can lead to powerful transformations over time. It's not about doing everything at once — it's about showing up, day by day, and letting the momentum build. 🚀
      </p>
      <Button variant={"default"} className="px-6 text-base mt-8 bg-spotifyGreen hover:bg-green-600">
        <Link href="/sign-in">
          Get Started
        </Link>
      </Button>
    </div>
  )
}

export default About