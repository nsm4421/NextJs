import { ReactNode } from "react";
import LeftSideBar from "./_components/left-side-bar/sidebar";
import RightSideBar from "./_components/right-side-bar/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { RoutePaths } from "@/lib/constant/route";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default async function HomeLayout({ children, modal }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect(RoutePaths.signIn);
  }

  return (
    <div className="w-full h-screen grid grid-cols-[350px_minmax(500px,_1fr)_350px] gap-2 py-2 overflow-y-hidden">
      <LeftSideBar />
      <main className="bg-slate-100 p-2 rounded-lg h-screen">{children}</main>
      <RightSideBar />
      {modal}
    </div>
  );
}
