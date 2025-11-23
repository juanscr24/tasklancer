import { ButtonMode } from "@/components/ui/ButtonMode";
import { LanguageSwitcher } from "@/components/ui";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Home() {
    const t = useTranslations('common');

    return (
        <div className="bg-(--bg-1)">
            <div className="flex gap-4 p-4">
                <ButtonMode />
                <LanguageSwitcher />
            </div>
            <div className="w-1/4">
                <h1 className="">{t('welcome')}</h1>
                <Link href="/auth">Iniciar sesión</Link>
            </div>
        </div>
    );
}
