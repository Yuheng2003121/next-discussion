"use server"

import { redirect } from "next/navigation";



export async function search(formData: FormData) {
  const pnameorcon =  formData.get('pnameorcon') as string;
  if(!pnameorcon) {
    redirect('/')
  }

  redirect(`/search?pnameorcon=${pnameorcon}`);
}