import { Suspense } from "react"
import { HomePageContent } from "@/components/users/HomePageContent"

export default function HomePage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
