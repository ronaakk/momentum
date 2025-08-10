import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function FAQ() {
  return (
    <div id="faqs" className='mx-auto max-w-6xl flex flex-col justify-center items-center text-center animate-slide-in mt-5 mb-4 px-10'>
        <p className='header text-3xl font-medium md:text-4xl mb-5'>
          Questions & Answers
        </p>
        
        <Accordion className='w-full max-w-3xl mb-5' type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-lg font-bold'>How is Momentum different from other habit platforms?</AccordionTrigger>
            <AccordionContent className='text-left text-base'>
              Momentum is grounded in real, time-tested behavioral science. The goal is to keep things simple, intentional, and sustainable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className='text-lg font-bold'>Is it free?</AccordionTrigger>
            <AccordionContent className='text-left text-base'>
              Yes! The purpose of this platform is to help you build better habits without putting you through paywalls.
            </AccordionContent>
          </AccordionItem>

            <AccordionItem value="item-3">
            <AccordionTrigger className='text-lg font-bold'>Do I need to use it every day?</AccordionTrigger>
            <AccordionContent className='text-left text-base'>
            Nope, Momentum is flexible. While consistency helps, life happens. You can always pick up where you left off without feeling guilty.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className='text-lg font-bold'>Can I track custom habits?</AccordionTrigger>
            <AccordionContent className='text-left text-base'>
            Absolutely. Whether you're trying to stretch every morning, drink more water, or write daily - you can create and track any habit that fits your goals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  )
}

export default FAQ