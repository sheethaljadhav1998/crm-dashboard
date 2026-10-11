import Image from "next/image";
import logo from "@/assets/logo.svg";

export function Logo() {
    return <Image src={logo} alt="" width={40} height={40} priority className="size-10 shrink-0 rounded-xl shadow-sm" />;
}
