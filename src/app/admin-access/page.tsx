import { verifyPasscode } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter the passcode to manage the content.</CardDescription>
        </CardHeader>
        <CardContent>
            <form action={verifyPasscode} className="space-y-4">
                <div>
                    <label htmlFor="passcode" className="sr-only">Passcode</label>
                    <Input
                        id="passcode"
                        name="passcode"
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Enter
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
