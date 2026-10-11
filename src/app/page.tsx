import { LeadsDashboard } from "@/components/organisms/leads-dashboard";
import { SiteHeader } from "@/components/organisms/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SiteHeader />
      <LeadsDashboard />
    </main>
  );
}
