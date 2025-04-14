"use client"

import Link from "next/link";
import Image from "next/image"
import React from "react";
import { useEffect, useState } from 'react';
import { Button } from "../ui/button";

function Nav() {
  // for mobile devices
  const [toggleDropdown, setToggleDropdown] = useState(false);


  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">

      <div className="flex justify-between items-center gap-14">
        <Link href="/" className="flex items-center gap-3 py-3">
          <Image 
            src="/assets/images/momentum-logo.svg"  // Path relative to `public/`
            alt="momentum logo"
            width={40}
            height={40}
          />
          <span className="hidden text-slate-950 text-foreground tracking-tight sm:block">
            Momentum
          </span>
        </Link>

        <div className="hidden text-slate-700 md:flex md:gap-1">
          <a href="#features" className="hover:text-primary transition">
            <Button variant={"ghost"}>
              Features
            </Button>
          </a>
          <a href="#faqs" className="hover:text-primary transition">
            <Button variant={"ghost"}>
              FAQs
            </Button>
          </a>
        </div>
      </div>
      

      <Button variant={"outline"} className="sign-in">
        <Link href='#'>
          Sign in
        </Link>
      </Button>
    </nav>
  )
}

export default Nav