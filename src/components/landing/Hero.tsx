import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <section className="animate-slide-in px-6 md:px-2">
        <div data-aos="fade-up"
            className="relative mx-auto sm:px-5 px-4 max-w-screen-xl py-4 flex items-center aos-init aos-animate">
            <Image 
                src="/assets/images/hero.svg"
                className="mx-auto w-full max-w-[1000px] rounded shadow-2xl" 
                alt="hero"
                width={800}
                height={200}
            />
        </div>
    </section>
  )
}

export default Hero