import Image from "next/image";
import logo from "@/assets/sync-logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col justify-center items-center h-screen  bg-[#ECF0F5] relative">
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-7">
        <Image src={logo} alt="Sync Logo" width={100} height={100} />
      </div>
      {children}
    </section>
  );
}
