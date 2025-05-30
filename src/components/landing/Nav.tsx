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
    <nav className="flex w-full items-center justify-between sm:px-8">
      <div className="flex justify-between items-center gap-14">
        <Link href="/" className="flex items-center gap-3 py-3">
          <Image 
            src="/assets/images/momentum-logo.svg"  // Path relative to `public/`
            alt="momentum logo"
            width={40}
            height={40}
          />
          <span className="hidden text-slate-950 tracking-wide font-medium sm:block">
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
        <Link href='/login'>
          Log in
        </Link>
      </Button>
    </nav>
  )
}

export default Nav