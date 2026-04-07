import { Briefcase, Settings, Users } from "lucide-react"

import { SidebarAppearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
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
  { icon: Briefcase, title: "Projects", path: "/" },
  { icon: Settings, title: "Setting", path: "/settings" },
]

export function AppSidebar() {
  const { user: currentUser } = useAuth()

  const items = currentUser?.is_superuser
    ? [baseItems[0], { icon: Users, title: "People", path: "/admin" }, baseItems[1]]
    : baseItems

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-5 py-6 border-b border-sidebar-border/70 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
        <div className="font-serif font-semibold leading-tight text-2xl tracking-wide group-data-[collapsible=icon]:hidden">
          ADMIN
          <br />
          DASHBOARD
        </div>
        <div className="hidden group-data-[collapsible=icon]:block">
          <Logo variant="icon" />
        </div>
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
