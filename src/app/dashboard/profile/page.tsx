import { Clapperboard, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MovieCarousel } from "@/components/movie-carousel";
import { moviedata3 } from "@/lib/data";
import { TrailerCard } from "@/components/trailer-card";
import { getLikedMovies } from "@/action/db";

export default async function Dashboard() {
  const userData = await currentUser();

  if (!userData) {
    redirect("/");
  }

  const likedMovies = await getLikedMovies(userData.id);

  return (
    <div className="flex flex-col min-h-screen pt-10 relative overflow-x-hidden">
      <div className="dark:bg-primary/50 bg-primary/30 h-20 w-3/5 left-1/2 absolute -top-16 blur-3xl" />
      <main className="flex-grow px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Welcome back, {userData.firstName}!
          </h2>

          {/* User Profile and Subscription */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2 bg-gradient-to-r from-card to-primary/20 text-foreground relative">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData.imageUrl} />
                    <AvatarFallback>
                      {(userData.firstName ?? "F")[0]}
                      {(userData.lastName ?? "X")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {userData.fullName}
                    </h3>
                    <p className="text-muted-foreground">
                      {userData.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                <Clapperboard className="md:size-40 text-muted-foreground/20 absolute top-1/2 -translate-y-1/2 right-0 hidden md:block" />
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/profile/settings">
                  <Button variant="outline">Edit Profile</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription className="text-yellow-500">
                  Premium Plan 👑
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Next billing date:</span>
                    <span>
                      {new Date(
                        Date.now() + 25 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Progress value={23} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    25 days left in your billing cycle
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Manage Subscription</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Continue Watching */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Continue Watching</h3>
            <MovieCarousel>
              {moviedata3.map((movie, i) => (
                <TrailerCard key={i} movie={movie} continueWatching />
              ))}
            </MovieCarousel>
          </section>

          {/* Recommended for You */}
          <section className="my-20">
            <h3 className="text-2xl font-semibold mb-4">Liked Movies ❤️</h3>
            <MovieCarousel>
              {likedMovies?.map((movie, i) => (
                <TrailerCard key={i} movie={movie} />
              ))}
              {likedMovies?.length === 0 && (
                <div className="text-muted-foreground mt-4 w-full">
                  No liked movies found. Like some movies to see them here.
                </div>
              )}
            </MovieCarousel>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
            >
              Help Center
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
            >
              Terms of Use
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">© 2024 FILMFLIX</span>
            <Settings className="size-5 text-muted-foreground" />
          </div>
        </div>
      </footer>
    </div>
  );
}
