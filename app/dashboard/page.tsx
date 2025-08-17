import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) {
    redirect("/login")
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name} 👋</h1>
      <p>Email: {session.user?.email}</p>
    </main>
  )
}
