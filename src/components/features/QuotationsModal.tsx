'use client';

import { X, DollarSign } from 'lucide-react';
import { useLocaleStore } from '@/stores/localeStore';

interface Quotation {
    id: string;
    name: string;
    clientName: string;
    totalPrice: number;
    status: string;
}

interface QuotationsModalProps {
    quotations: Quotation[];
    onClose: () => void;
}

export const QuotationsModal = ({ quotations, onClose }: QuotationsModalProps) => {
    const { messages } = useLocaleStore();
    const t = messages.dashboard.quotationsModal;

    return (
        <div className="fixed inset-0 bg-(--bg-2)/30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-(--bg-2) rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-(--border-1) shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-(--bg-1) flex justify-between items-center">
                    <h2 className="text-xl font-bold text-(--text-1) flex items-center gap-2">
                        <DollarSign size={24} className="text-(--btn-1)" />
                        {t.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-(--bg-1) rounded-lg transition-colors text-(--text-2) hover:text-(--text-1)"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {quotations.length === 0 ? (
                        <div className="text-center text-(--text-2) py-8">
                            {t.noQuotations}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {quotations.map((quote) => (
                                <div
                                    key={quote.id}
                                    className="flex justify-between items-center p-4 bg-(--bg-1) rounded-lg border border-(--border-1) hover:border-(--btn-1)/50 transition-colors"
                                >
                                    <div>
                                        <h3 className="font-semibold text-(--text-1)">{quote.name}</h3>
                                        <p className="text-sm text-(--text-2)">{quote.clientName}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-(--text-1) text-lg">
                                            ${quote.totalPrice.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-(--text-2) uppercase tracking-wider font-medium">
                                            {quote.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-(--bg-1) bg-(--bg-1)/50">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-(--text-2)">{t.totalQuotations}: {quotations.length}</span>
                        <span className="font-bold text-(--text-1)">
                            {t.totalValue}: ${quotations.reduce((sum, q) => sum + q.totalPrice, 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
