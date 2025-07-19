import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export default function Home() {
  return (
    <MainLayout>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {APP_NAME}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {APP_DESCRIPTION}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/workflows">Browse Workflows</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Discover, share, and monetize your N8N workflows with our powerful marketplace platform.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Discover Workflows</h3>
              <p className="text-sm text-muted-foreground">
                Browse and search for workflows by category, technology, or keyword.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Share Your Creations</h3>
              <p className="text-sm text-muted-foreground">
                Publish your N8N workflows with detailed documentation and previews.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Monetize Your Work</h3>
              <p className="text-sm text-muted-foreground">
                Set prices for your workflows and connect payment providers.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Track Performance</h3>
              <p className="text-sm text-muted-foreground">
                Get insights into views, downloads, and engagement with your workflows.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Community Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Comment, rate, and review workflows from other creators.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Detailed Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Create rich markdown documentation for your workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join our growing community of N8N workflow creators and users.
          </p>
        </div>
      </section>

      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to get started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Create an account today and start sharing your N8N workflows with the world.
          </p>
          <Button size="lg" asChild className="mt-4">
            <Link href="/auth/register">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
