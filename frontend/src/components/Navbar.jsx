import { UserButton, useUser } from "@clerk/clerk-react"

function Navbar() {
  return (
    <header>
        <nav className="flex justify-between p-4 bg-gray-200">
        <h1>Welcome, {useUser?.firstName || "User"}! 👋</h1>
        <div>
          <UserButton />
        </div>
        </nav>
    </header>
  )
}

export default Navbar
