import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  redirect('/themes/1');

  return null;
}
