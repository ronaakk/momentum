import { SiteHeader } from '@/components/dashboard/content/SiteHeader'
import { SidebarInset } from '@/components/ui/sidebar'

export default function Dashboard() {
  return (
    <SidebarInset>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <div className="container flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* TODO: Implement the general analytics later */}
                {/* <SectionCards /> */}
                <div className="px-4 lg:px-6">
                  {/* Content goes here */}
                  <div className="rounded-lg border p-6">
                    Dashboard Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarInset>
  )
}