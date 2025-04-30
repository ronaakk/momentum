import React from 'react'
import { LoginForm } from '@/app/(auth)/login/login-form'
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Login",
  description: "Tiny changes, lasting results.",
};

function LogInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium text-xl">
          <Image 
              src="/assets/images/momentum-logo.svg"  // Path relative to `public/`
              alt="momentum logo"
              width={45}
              height={45}
            />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}

export default LogInPage