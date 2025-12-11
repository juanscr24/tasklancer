import { useState } from 'react';
import { DashboardData } from '@/types/dashboard';
import { QuotationsModal } from '@/components/features/QuotationsModal';
import { Eye } from 'lucide-react';
import { useLocaleStore } from '@/stores/localeStore';

interface CardFinancialSnapshotProps {
    total: number;
    quotations: DashboardData['quotations'];
}

const WALLET_LIMIT = 10000;

export function CardFinancialSnapshot({ total, quotations }: CardFinancialSnapshotProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { messages } = useLocaleStore();
    const t = messages.dashboard.financial;
    const isLimitExceeded = total > WALLET_LIMIT;

    const previewQuotations = quotations.filter(q => q.status === 'COMPLETED').slice(0, 3);

    const showSeeMoreButton = quotations.length > previewQuotations.length;

    return (
        <>
            <div className="bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1) flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-lg font-semibold">{t.title}</h4>
                        <h4 className="text-lg font-semibold text-(--text-2)">{t.snapshot}</h4>
                    </div>
                    {showSeeMoreButton && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-xs bg-(--btn-1) hover:bg-(--btn-2) text-white px-2 py-1 rounded transition-colors flex items-center gap-1"
                        >
                            <Eye size={12} />
                            {t.seeMore}
                        </button>
                    )}
                </div>

                <div className="mb-6">
                    <div className="text-3xl font-bold text-(--text-1)">
                        ${Number(total).toFixed(2)} USD
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <div className="text-xs font-medium text-green-300">
                            {(total * 4200).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs font-medium text-yellow-200">
                            {(total * 0.92).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 flex-1 overflow-hidden">
                    {previewQuotations.length > 0 ? (
                        previewQuotations.map((quote, i) => (
                            <div key={i} className="flex justify-between items-start border-b border-(--border-1) pb-3 last:border-0 last:pb-0 hover:bg-(--bg-1)/50 p-2 rounded transition-colors">
                                <div>
                                    <div className="font-medium text-(--text-1) truncate max-w-[120px]" title={quote.name}>{quote.name}</div>
                                    <div className="text-xs text-(--text-2) mt-0.5">{quote.clientName}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-(--text-1)">${quote.totalPrice.toFixed(2)}</div>
                                    <div className="text-xs text-(--text-2) mt-0.5">{quote.status}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-(--text-2) text-center py-4">
                            {t.noQuotations}
                        </div>
                    )}
                </div>

                {isLimitExceeded && (
                    <div className="mt-4 pt-2 border-t border-(--border-1) text-center">
                        <span className="text-xs text-(--priority-high-1)">
                            {t.walletLimitExceeded} ({WALLET_LIMIT})
                        </span>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <QuotationsModal
                    quotations={quotations}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
