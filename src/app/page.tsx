import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Blocks, DownloadIcon, MonitorPlay, Clapperboard } from "lucide-react";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import bg from "@/assets/collage.jpg";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-12 py-3 backdrop-blur-md shadow fixed w-full top-0 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <Clapperboard size={30} />
          <span className="font-bold text-lg md:text-lg ml-2">FilmVilla</span>
        </Link>
        <div className="flex gap-4">
          <ThemeTogglebutton />
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button size={"lg"} variant={"ghost"} className="text-white">
                Dashboard
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Button asChild>
              <SignInButton
                withSignUp
                mode="modal"
                fallbackRedirectUrl={"/dashboard"}
              />
            </Button>
          </SignedOut>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full min-h-svh text-white flex flex-col items-center justify-center">
          <Image
            src={bg}
            alt="bg"
            width={1200}
            height={800}
            className="absolute w-screen h-screen object-cover -z-20 inset-0 filter brightness-75"
          />
          <div className="absolute w-full h-screen inset-0 -z-10 bg-gradient-to-b from-transparent to-black"></div>
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <Clapperboard className="h-20 w-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Unlimited movies, TV shows, and more.
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Watch anywhere. Cancel anytime.
            </p>
            <div className="flex gap-4">
              <Link href={"/dashboard"}>
                <Button size={"lg"} variant={"secondary"}>
                  Dashboard
                </Button>
              </Link>
              <SignedOut>
                <Button variant={"default"} size={"lg"} asChild>
                  <SignInButton
                    withSignUp
                    mode="modal"
                    fallbackRedirectUrl={"/dashboard"}
                  >
                    Sign Up Now
                  </SignInButton>
                </Button>
              </SignedOut>
            </div>
          </div>
        </section>
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Enjoy on your TV.
              </h2>
              <p className="text-lg md:text-xl mb-8">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
              <Button variant="link" className="text-lg font-medium">
                Learn More
              </Button>
            </div>
            <Image
              src="/st5.avif"
              width="550"
              height="310"
              alt="FilmVilla on TV"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </section>

        <div className="h-0.5 w-3/5 bg-gradient-to-r from-transparent via-primary/80 to-transparent mx-auto my-8" />
        <section className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="dark:bg-primary/40 bg-primary/30 h-20 w-1/5 -left-20 absolute bottom-10 blur-3xl" />
          <div className="dark:bg-primary/40 bg-primary/30 h-20 w-1/5 -right-20 absolute bottom-10 blur-3xl" />
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <DownloadIcon className="h-16 w-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                Download your shows to watch offline.
              </h3>
              <p className="text-lg md:text-xl">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MonitorPlay className="h-16 w-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Watch everywhere.</h3>
              <p className="text-lg md:text-xl">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Blocks className="h-16 w-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                Create profiles for kids.
              </h3>
              <p className="text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background py-8 border-t text-sm text-muted-foreground flex gap-10 items-center justify-center">
        <div className="px-4 md:px-6 text-center ">
          &copy; {new Date().getFullYear()} FilmVilla, Inc.
        </div>
        <a
          href="https://github.com/Xeven777/filmvilla"
          className="hover:text-primary hover:underline"
        >
          🌟Star on Github
        </a>
      </footer>
    </div>
  );
}
