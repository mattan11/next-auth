import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/LoginButton';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          Welcome to NextAuth.js
        </h1>
        <p className="text-white text-lg text-center">
          NextAuth.js is a complete open source authentication solution for
          Next.js applications.
        </p>
        <div>
          <LoginButton>
            <Button
              size={'lg'}
              variant={'secondary'}
            >
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
