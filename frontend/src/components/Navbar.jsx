import { UserButton, useUser } from "@clerk/clerk-react"

export default function Navbar() {
  const { isSignedIn, user } = useUser()
  if (!isSignedIn) return null

  return (
    <header className="flex justify-between p-4 bg-gray-200 w-full m-auto max-w-6xl">
        <nav className="flex max-w-6xl justify-between p-4 bg-gray-200 w-full">
        <h1>BOSS, {user?.firstName || "User"}! 👋</h1>
        <div>
          <UserButton />
        </div>
        </nav>
    </header>
  )
}

