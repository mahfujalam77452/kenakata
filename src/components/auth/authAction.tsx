"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoggedIn, clearSession } from "@/lib/utils/session";

/**
 * Shows "Login" (linking to /login) when logged out, or "Logout" (a button
 * that clears the session) when logged in.
 *
 * Client component because login state lives in localStorage (see
 * lib/auth/session.ts), which only exists in the browser — everything else
 * in Header stays a plain server component, only this piece needs JS.
 */
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