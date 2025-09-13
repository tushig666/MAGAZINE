"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return <Button onClick={() => logout()} variant="outline">Logout</Button>;
}
