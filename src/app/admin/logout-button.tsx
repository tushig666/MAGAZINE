"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return <Button onClick={handleLogout} variant="outline">Logout</Button>;
}
