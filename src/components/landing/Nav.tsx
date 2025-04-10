"use client"

import Link from "next/link";
import Image from "next/image"
import React from "react";
import { useEffect, useState } from 'react';

function Nav() {
  // for mobile devices
  const [toggleDropdown, setToggleDropdown] = useState(false);


  return (
    <nav>
      <div className="fixed flex justify-between align-center w-full py-5 px-5">
        <Link href="/" className="flex-center gap-2">
          <Image 
            src="/assets/images/momentum-logo.svg"  // Path relative to `public/`
            alt="momentum logo"
            width={200}
            height={200}
          />
        </Link>

        <button className="btn-primary">
          Sign in
        </button>
      </div>
    </nav>
  )
}

export default Nav