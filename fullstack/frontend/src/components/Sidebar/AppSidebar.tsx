import { useRouterState } from "@tanstack/react-router"
import { Briefcase, Home, Settings, Users } from "lucide-react"

import { SidebarAppearance } from "@/components/Common/Appearance"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { type Item, Main } from "./Main"
import { User } from "./User"

const baseItems: Item[] = [
  { icon: Home, title: "Home", path: "/" },
  { icon: Briefcase, title: "Project", path: "/items" },
  { icon: Settings, title: "Setting", path: "/settings" },
]

const adminItems: Item[] = [
  { icon: Briefcase, title: "Projects", path: "/admin" },
  { icon: Users, title: "People", path: "/admin/people" },
  { icon: Settings, title: "Setting", path: "/admin/settings" },
]

export function AppSidebar() {
  const { user: currentUser } = useAuth()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAdminSection = pathname.startsWith("/admin")
  const items = isAdminSection ? adminItems : baseItems

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
        {isAdminSection ? (
          <div className="max-w-full break-words font-serif text-3xl font-semibold leading-tight tracking-tight group-data-[collapsible=icon]:text-xl">
            ADMIN DASHBOARD
          </div>
        ) : (
          <div className="font-serif text-4xl font-semibold leading-none tracking-tight group-data-[collapsible=icon]:text-xl">
            GAMA FLOW
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <Main items={items} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarAppearance />
        <User user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
