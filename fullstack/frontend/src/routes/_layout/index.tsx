import { createFileRoute } from "@tanstack/react-router"
import {
  Bell,
  Building2,
  CalendarDays,
  CirclePlus,
  EllipsisVertical,
  MailOpen,
  PenSquare,
  TrendingUp,
  UserRound,
  XCircle,
} from "lucide-react"

const upcomingTasks = [
  { id: "#972304", name: "Task name", date: "23 Feb", highlight: true },
  { id: "#3974", name: "Task name", date: "30 May", highlight: false },
  { id: "#3974", name: "Task name", date: "30 May", highlight: false },
]

const reminders = [
  "Meeting with client at 12 pm",
  "Follow up with project ABC",
]

const projects = Array.from({ length: 5 }, (_, index) => ({
  id: `project-${index + 1}`,
  title: "Projects Title",
  company: "Client Company",
  manager: "Project Manager",
  days: 482,
}))

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
  head: () => ({
    meta: [
      {
        title: "Home - GAMA FLOW",
      },
    ],
  }),
})

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-4xl font-semibold">On Going Projects:</h2>
          <p className="mt-7 text-center text-5xl font-semibold">21</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-4xl font-semibold">Current Tasks:</h2>
          <p className="mt-7 text-center text-5xl font-semibold">98</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-4xl font-semibold">Spending:</h2>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-5xl font-semibold">$372.3</p>
              <p className="mt-3 text-muted-foreground">since March</p>
            </div>
            <div className="text-right text-cyan-400">
              <TrendingUp className="ml-auto size-9" />
              <p className="mt-2 text-3xl font-semibold">20%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="text-4xl font-semibold">Upcoming tasks:</h3>
          <div className="mt-4 space-y-2">
            {upcomingTasks.map((task) => (
              <div
                key={`${task.id}-${task.date}`}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3"
              >
                <div>
                  <p className="text-2xl font-medium">{task.id}</p>
                  <p className="text-muted-foreground">{task.name}</p>
                </div>
                <p className="flex items-center gap-2 text-xl">
                  <CalendarDays
                    className={`size-5 ${task.highlight ? "text-red-400" : "text-muted-foreground"}`}
                  />
                  {task.date}
                </p>
                <button className="rounded-md p-1 hover:bg-accent/50">
                  <EllipsisVertical className="size-5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="text-4xl font-semibold">Reminder:</h3>
          <div className="mt-4 space-y-2">
            {reminders.map((item) => (
              <div
                key={item}
                className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl bg-secondary/60 px-4 py-3"
              >
                <p className="text-xl">{item}</p>
                <button className="rounded-md p-1 hover:bg-accent/50">
                  <XCircle className="size-5 text-muted-foreground" />
                </button>
              </div>
            ))}
            <button className="flex w-full items-center justify-center rounded-xl bg-secondary/60 py-3 hover:bg-secondary transition">
              <CirclePlus className="size-8 text-muted-foreground" />
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="text-4xl font-semibold">Un-invoices bill:</h3>
          <div className="mt-8 flex justify-center">
            <MailOpen className="size-24 text-muted-foreground" />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
        <h3 className="text-4xl font-semibold">On going projects:</h3>
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto pr-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[1.2fr_1fr_1fr_auto_auto] items-center gap-4 rounded-xl bg-secondary/60 px-4 py-3"
            >
              <p className="text-3xl font-medium">{project.title}</p>
              <p className="flex items-center gap-2 text-xl text-muted-foreground">
                <Building2 className="size-6" />
                {project.company}
              </p>
              <p className="flex items-center gap-2 text-xl text-muted-foreground">
                <UserRound className="size-6" />
                {project.manager}
              </p>
              <p className="flex items-center gap-2 text-xl">
                <CalendarDays className="size-6" />
                {project.days} days
              </p>
              <button className="rounded-md border border-border/70 p-2 hover:bg-accent/50 transition">
                <PenSquare className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <button className="fixed bottom-8 right-8 rounded-full border border-cyan-300 bg-cyan-400/80 p-4 text-white shadow-lg">
        <Bell className="size-8" />
      </button>
    </div>
  )
}
