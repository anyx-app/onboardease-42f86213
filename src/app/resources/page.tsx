import { Metadata } from "next";
import TeamGrid from "@/components/resources/TeamGrid";
import VideoLibrary from "@/components/resources/VideoLibrary";

export const metadata: Metadata = {
  title: "Resources | Team & Training Hub",
  description: "Access the team directory and view training materials and operational resources.",
};

export default function ResourcesPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Team & Training Hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Centralized access to team contact information, role assignments, and our comprehensive library of training videos and operational guides.
        </p>
      </div>

      {/* Team Directory Section */}
      <section id="team-directory" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Team Directory</h2>
            <p className="text-muted-foreground">
              Find contact details and role information for all team members.
            </p>
          </div>
        </div>
        
        <TeamGrid />
      </section>

      {/* Visual Separator */}
      <div aria-hidden="true" className="border-t" />

      {/* Video Library Section */}
      <section id="training-library" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Training Library</h2>
            <p className="text-muted-foreground">
              Browse tutorials, operational procedures, and onboarding materials.
            </p>
          </div>
        </div>

        <VideoLibrary />
      </section>
    </main>
  );
}
