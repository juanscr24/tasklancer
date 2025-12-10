import { DashboardData } from '@/types/dashboard';

interface CardFinancialSnapshotProps {
    total: string | number;
    invoices: DashboardData['recentInvoices'];
}

export function CardFinancialSnapshot({ total, invoices }: CardFinancialSnapshotProps) {
    return (
        <div className="bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1)">
            <h4 className="text-lg font-semibold mb-1">Financial</h4>
            <h4 className="text-lg font-semibold mb-4">Snapshot</h4>

            <div className="text-4xl font-bold mb-6">${Number(total).toFixed(2)}</div>

            <div className="space-y-4">
                {invoices.map((inv, i) => (
                    <div key={i} className="flex justify-between items-start border-b  hover:scale-102 transition-all duration-300 border-(--border-1) pb-3 last:border-0 last:pb-0">
                        <div>
                            <div className="font-medium text-(--text-1)">{inv.code}</div>
                            <div className="text-xs text-(--text-2) mt-0.5">{inv.clientName}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-(--text-1)">${inv.amount}</div>
                            <div className={`text-xs mt-0.5 ${inv.statusText.includes('Overdue') ? 'text-(--priority-high-1)' :
                                inv.statusText.includes('Due in') ? 'text-(--priority-medium-1)' :
                                    'text-(--text-2!)'
                                }`}>
                                {inv.statusText}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
