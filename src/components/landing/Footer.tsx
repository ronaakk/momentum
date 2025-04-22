import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <div className="flex px-10 pt-10 items-center animate-slide-in justify-between my-5 sm:pt-20  sm:flex-row">
        <p className="text-center md:text-left">
            <span className="mx-auto mt-2 text-base text-gray-900 lg:mx-0">
                ©Momentum 2025
            </span>
        </p>
          
        <Image 
          src="/assets/images/momentum-logo.svg"  // Path relative to `public/`
          alt="momentum logo"
          width={50}
          height={50}
        />
    </div>
  )
}

export default Footer