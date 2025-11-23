import { useTranslations } from 'next-intl';

const Dashboard = () => {
    const t = useTranslations('dashboard');

    return (
        <div className="bg-(--bg-1)">{t('title')}</div>
    )
}

export default Dashboard
