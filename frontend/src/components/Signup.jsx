import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const GoogleSignUp = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Signup</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signup</DialogTitle>
          <DialogDescription>Create an Account </DialogDescription>
        </DialogHeader>
        <p className="text-center">Continue with</p>
        <Button onClick={GoogleSignUp}>Google</Button>
      </DialogContent>
    </Dialog>
  );
}
