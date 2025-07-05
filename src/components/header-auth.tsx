"use client"
import { signIn, signOut } from "@/actions";
import {
  NavbarItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Spinner,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";



export default function HeaderAuth() {
  const {data: session, status } = useSession();
  let authContent: ReactNode;
  if(status === "loading") {
    authContent = (<Spinner/>)
  }
  
 else if (status === "authenticated") {
   authContent = (
     <Popover placement="bottom">
       <PopoverTrigger>
         <Avatar src={session.user?.image as string} />
       </PopoverTrigger>
       <PopoverContent className="p-4">
         <form action={signOut}>
           <Button type="submit">退出</Button>
         </form>
       </PopoverContent>
     </Popover>
   );
 } else {
   authContent = (
     <>
       <NavbarItem className="hidden lg:flex">
         <form action={signIn}>
           <Button type="submit" color="default" href="#" variant="flat">
             Sign in
           </Button>
         </form>
       </NavbarItem>
       <NavbarItem>
         <form action={signIn}>
           <Button type="submit" color="primary" href="#" variant="flat">
             Sign Up
           </Button>
         </form>
       </NavbarItem>
     </>
   );
 }
  return authContent;
}
