import { useEffect, useState } from "react";
import { removeToken } from "../utils/authToken";
import { getUserData } from "../services/api";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      if (userData && userData.username) {
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${user?.username}`;

  return (
    <header className="flex justify-between p-4 bg-gray-200 w-full m-auto max-w-6xl">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <h1>Welcome, {user?.username} 👋</h1>
        </div>
        <button
          onClick={() => {
            removeToken();
            window.location.reload();
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
}
