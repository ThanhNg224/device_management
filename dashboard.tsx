"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./src/components/AppSidebar"
import { DeviceTable } from "./src/components/DeviceTable"
import { DeviceLogsTable } from "./src/components/DeviceLogsTable"
import { mockDevices } from "./src/data/devicesMock"
import { mockLogs } from "./src/data/logsMock"

export default function Component() {
  const [activeTab, setActiveTab] = React.useState("devices")
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">SunWorld Device Manager</h2>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "devices" && <DeviceTable devices={mockDevices} />}
          {activeTab === "logs" && <DeviceLogsTable logs={mockLogs} />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
