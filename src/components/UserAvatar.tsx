import Image from "next/image";
import { auth } from "../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;
  
  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <Image src={session.user.image as string} alt="User Avatar" />
    </div>
  );
}
