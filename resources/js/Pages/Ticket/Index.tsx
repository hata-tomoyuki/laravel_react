import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { Ticket } from '@/types/ticket';
import { Head } from '@inertiajs/react';

interface TicketIndexPageProps {
    tickets: Ticket[];
}

export default function TicketIndex({ tickets }: TicketIndexPageProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    チケット一覧
                </h2>
            }
        >
            <Head title="チケット一覧" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                    <div>
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="p-4 border-b">
                                <h3 className="text-lg font-semibold">
                                    {ticket.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
