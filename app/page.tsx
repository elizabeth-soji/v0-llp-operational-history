import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, ArrowRight } from "lucide-react"

export default function Home() {
  const mockups = [
    {
      id: 1,
      title: "Concept 1: Sidebar Navigation",
      description: "IATA binder structure in left sidebar with main content area and persistent chat",
      href: "/mockup-1",
    },
    {
      id: 2,
      title: "Concept 2: Three-Column Layout",
      description: "Binder structure left, main content center, chat and activity right",
      href: "/mockup-2",
    },
    {
      id: 3,
      title: "Concept 3: Tab-Based Interface",
      description: "Tabbed navigation with binder, timeline, and activity views",
      href: "/mockup-3",
    },
    {
      id: 4,
      title: "Concept 4: Dashboard Overview",
      description: "Card-based dashboard with collapsible binder and prominent timeline",
      href: "/mockup-4",
    },
    {
      id: 5,
      title: "Concept 5: Split-Screen Workflow",
      description: "Dual-pane interface with binder on left and dynamic content on right",
      href: "/mockup-5",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance">End-of-Lease Aircraft Software</h1>
          <p className="text-lg text-muted-foreground text-balance">5 UI/UX Mockup Concepts for Project Management</p>
        </div>

        <Card className="mb-8 border-sky-200 bg-sky-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Plane className="h-8 w-8 text-sky-600" />
              <div>
                <CardTitle className="text-2xl">Projects Dashboard</CardTitle>
                <CardDescription className="text-base">
                  View all aircraft redelivery projects with search, filtering, and status tracking
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700 text-white">
              <Link href="/projects">
                Go to Projects Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">UI Mockup Concepts</h2>
          <p className="text-muted-foreground">Explore different layout concepts for the project detail view</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockups.map((mockup) => (
            <Card key={mockup.id} className="transition-all hover:border-primary">
              <CardHeader>
                <CardTitle>{mockup.title}</CardTitle>
                <CardDescription className="text-pretty">{mockup.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href={mockup.href}>View Mockup</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
