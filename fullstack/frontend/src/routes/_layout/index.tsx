import { createFileRoute } from "@tanstack/react-router"
import {
  Building2,
  CalendarDays,
  PenSquare,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
  head: () => ({
    meta: [
      {
        title: "Projects - Admin Dashboard",
      },
    ],
  }),
})

const ongoingProjects = Array.from({ length: 6 }, (_, index) => ({
  id: `ongoing-${index + 1}`,
  title: `Project ${index + 1}`,
  company: "Client Company",
  manager: "Project Manager",
  days: 482 - index * 24,
}))

const delayedProjects = Array.from({ length: 3 }, (_, index) => ({
  id: `delay-${index + 1}`,
  title: `Delayed Project ${index + 1}`,
  company: "Client Company",
  manager: "Project Manager",
  days: 482 + index * 16,
}))

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl bg-card border border-border/60 p-6">
          <p className="text-2xl font-semibold">On going projects:</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-5xl font-semibold">21</p>
              <p className="mt-3 text-muted-foreground">since March</p>
            </div>
            <div className="text-right text-cyan-400">
              <TrendingUp className="size-7 ml-auto" />
              <p className="mt-2 text-2xl font-semibold">20%</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card border border-border/60 p-6">
          <p className="text-2xl font-semibold">Completed projects:</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-5xl font-semibold">1</p>
              <p className="mt-3 text-muted-foreground">since March</p>
            </div>
            <div className="text-right text-red-400">
              <TrendingDown className="size-7 ml-auto" />
              <p className="mt-2 text-2xl font-semibold">20%</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card border border-border/60 p-6">
          <p className="text-2xl font-semibold">Invoices:</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-5xl font-semibold">$1234.2</p>
              <p className="mt-3 text-muted-foreground">since March</p>
            </div>
            <div className="text-right text-cyan-400">
              <TrendingUp className="size-7 ml-auto" />
              <p className="mt-2 text-2xl font-semibold">20%</p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-xl bg-card border border-border/60 p-4 sm:p-5">
        <h2 className="text-2xl font-semibold mb-4">On going projects:</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {ongoingProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[1.2fr_1fr_1fr_auto_auto] items-center gap-4 rounded-xl bg-secondary/60 px-4 py-3"
            >
              <p className="text-xl font-medium truncate">{project.title}</p>
              <p className="flex items-center gap-2 text-muted-foreground text-lg">
                <Building2 className="size-5" />
                {project.company}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-lg">
                <UserRound className="size-5" />
                {project.manager}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <CalendarDays className="size-5" />
                {project.days} days
              </p>
              <button className="rounded-lg border border-border/70 p-2 hover:bg-accent/50 transition">
                <PenSquare className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-card border border-border/60 p-4 sm:p-5">
        <h2 className="text-2xl font-semibold mb-4">Delay projects:</h2>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
          {delayedProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[1.2fr_1fr_1fr_auto_auto] items-center gap-4 rounded-xl bg-secondary/60 px-4 py-3"
            >
              <p className="text-xl font-medium truncate">{project.title}</p>
              <p className="flex items-center gap-2 text-muted-foreground text-lg">
                <Building2 className="size-5" />
                {project.company}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-lg">
                <UserRound className="size-5" />
                {project.manager}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <CalendarDays className="size-5" />
                {project.days} days
              </p>
              <button className="rounded-lg border border-border/70 p-2 hover:bg-accent/50 transition">
                <PenSquare className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
