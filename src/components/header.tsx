"use client"
// import { signIn, signOut } from "@/actions";
// import { auth } from "@/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
// import { ReactNode } from "react";
import HeaderAuth from "./header-auth";
import { useRouter } from "next/navigation";
import HeaderInput from "./header-input";
import ThemeSwitch from "./theme-switch";
import { Suspense } from "react";


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
 
  // const session = await auth();
  // let authContent: ReactNode;
  // if (session?.user) {
  //   authContent = (
  //     <Popover placement="bottom">
  //       <PopoverTrigger>
  //         <Avatar src={session.user.image as string} />
  //       </PopoverTrigger>
  //       <PopoverContent className="p-4">
  //         <form
  //           action={signOut}
  //         >
  //           <Button type="submit">退出</Button>
  //         </form>
  //       </PopoverContent>
  //     </Popover>
  //   );
  // } else {
  //   authContent = (
  //     <>
  //       <NavbarItem className="hidden lg:flex">
  //         <form
  //           action={signIn}
  //         >
  //           <Button type="submit" color="default" href="#" variant="flat">
  //             Sign in
  //           </Button>
  //         </form>
  //       </NavbarItem>
  //       <NavbarItem>
  //         <form
  //           action={signIn}
  //         >
  //           <Button type="submit" color="primary" href="#" variant="flat">
  //             Sign Up
  //           </Button>
  //         </form>
  //       </NavbarItem>
  //     </>
  //   );
  // }
  const router = useRouter();
  return (
    <Navbar className="shadow-md dark:shadow-purple-500">
      <NavbarBrand>
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex gap-1 items-center -ml-2"
        >
          <AcmeLogo />
          <p className="font-bold text-inherit text-lg">DISCUSS</p>
        </div>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <HeaderInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
