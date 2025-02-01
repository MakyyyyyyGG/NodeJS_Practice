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

export default function Signup({ text }) {
  const GoogleSignUp = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
          <DialogDescription>Create an Account </DialogDescription>
        </DialogHeader>
        <p className="text-center">Continue with</p>
        <Button onClick={GoogleSignUp}>Google</Button>
      </DialogContent>
    </Dialog>
  );
}
