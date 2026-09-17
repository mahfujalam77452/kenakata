"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoggedIn, clearSession } from "@/lib/utils/session";


export default function AuthAction() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Check on mount — avoids a server/client mismatch since the server has
  // no way to know localStorage's contents during the initial render.
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  function handleLogout() {
    clearSession();
    setLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  if (loggedIn) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-white/90 transition-colors hover:text-white"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm font-medium text-white/90 transition-colors hover:text-white"
    >
      Login
    </Link>
  );
}