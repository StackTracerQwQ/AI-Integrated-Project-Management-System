import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { PenSquare } from "lucide-react"
import { Suspense } from "react"

import { type UserPublic, UsersService } from "@/client"
import PendingUsers from "@/components/Pending/PendingUsers"

function getUsersQueryOptions() {
  return {
    queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
    queryKey: ["users"],
  }
}

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  beforeLoad: async () => {
    const user = await UsersService.readUserMe()
    if (!user.is_superuser) {
      throw redirect({
        to: "/",
      })
    }
  },
  head: () => ({
    meta: [
      {
        title: "People - Admin Dashboard",
      },
    ],
  }),
})

function UsersTableContent() {
  const { data: users } = useSuspenseQuery(getUsersQueryOptions())

  return (
    <div className="rounded-xl bg-card border border-border/60 overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 text-xl font-semibold border-b border-border/70">
        <p>Name</p>
        <p>Role</p>
        <p>Email</p>
        <p>Password</p>
        <span className="sr-only">Action</span>
      </div>
      <div className="space-y-2 max-h-[65vh] overflow-y-auto p-3">
        {users.data.map((user: UserPublic) => (
          <div
            key={user.id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-xl bg-secondary/60 px-5 py-3"
          >
            <p className="text-2xl truncate">{user.full_name || "Joe P"}</p>
            <p className="text-xl text-muted-foreground">
              {user.is_superuser ? "Executive" : "Project Manager"}
            </p>
            <p className="text-xl text-muted-foreground truncate">{user.email}</p>
            <p className="text-xl">*****23</p>
            <button className="rounded-lg border border-border/70 p-2 hover:bg-accent/50 transition">
              <PenSquare className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersTable() {
  return (
    <Suspense fallback={<PendingUsers />}>
      <UsersTableContent />
    </Suspense>
  )
}

function Admin() {
  return <UsersTable />
}
