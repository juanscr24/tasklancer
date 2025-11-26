import Link from "next/link";
import { LanguageSwitcher, ButtonMode } from "@components";

export default function Home() {
    return (
        <div className="bg-(--bg-1)">
            <div className="flex gap-4 p-4">
                <ButtonMode />
                <LanguageSwitcher className="relative" />
            </div>
            <div className="w-1/4">
                <h1 className="">Tasklancer</h1>
                <Link href="/auth">Iniciar sesión</Link>
            </div>
        </div>
    );
}
