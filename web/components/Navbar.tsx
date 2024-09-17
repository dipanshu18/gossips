import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { cookies } from "next/headers";
import LogoutBtn from "./LogoutBtn";
import ProfileCircle from "./ProfileCircle";

function Logo() {
  return (
    <div>
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className="w-8 h-8 object-cover"
        />
        <h1 className="text-xl font-semibold">Gossips</h1>
      </Link>
    </div>
  );
}

function ActionButtons() {
  const session = cookies().get("session")?.value;

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <VisuallyHidden>
                <SheetTitle>Navbar Content</SheetTitle>
              </VisuallyHidden>
              <SheetDescription>
                <div className="mt-10 w-full text-xl text-black dark:text-white flex flex-col items-start space-y-5">
                  {session ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/explore">Explore</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/friend-requests">Friend Requests</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/profile">Profile</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <LogoutBtn />
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link
                          href={"/login"}
                          className="font-normal text-xl text-black dark:text-white"
                        >
                          Login
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={"/signup"}
                          className="font-normal text-xl text-black dark:text-white"
                        >
                          Signup
                        </Link>
                      </SheetClose>
                    </>
                  )}
                  <div className="flex w-full justify-end">
                    <ModeToggle />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex md:items-center md:space-x-5">
        {session ? (
          <>
            <Link href="/explore">Explore</Link>
            <Link href="/friend-requests">Friend Requests</Link>
            <Link href="/profile">
              <ProfileCircle />
            </Link>
            <LogoutBtn />
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Signup</Button>
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur flex justify-between items-center px-10 py-3 border-b">
      <Logo />
      <ActionButtons />
    </nav>
  );
}
