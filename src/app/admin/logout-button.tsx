"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/admin-access/actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
