import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function FAQ() {
  return (
    <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How is Momentum different from other habit apps?</AccordionTrigger>
            <AccordionContent>
              Momentum is grounded in real, time-tested behavioral science. The goal is to keep things simple, intentional, and sustainable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              Yes! The purpose of this platform is to help you build better habits without putting you through paywalls.
            </AccordionContent>

            <AccordionItem value="item-3">
            <AccordionTrigger>Do I need to use it every day?</AccordionTrigger>
            <AccordionContent>
            Nope, Momentum is flexible. While consistency helps, life happens. You can always pick up where you left off without feeling guilty.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I track custom habits?</AccordionTrigger>
            <AccordionContent>
            Absolutely. Whether you're trying to stretch every morning, drink more water, or write daily - you can create and track any habit that fits your goals.
            </AccordionContent>
          </AccordionItem>
          </AccordionItem>


        </Accordion>
    </div>
  )
}

export default FAQ