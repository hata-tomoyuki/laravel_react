import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import type { Ticket } from '@/types/ticket';
import { Head, Link } from '@inertiajs/react';
import { priorityLabels, statusLabels } from '@/const/labels';
import { priorityColors, statusColors } from '@/const/colors';
import { formatDate } from '@/lib/time';

interface TicketIndexPageProps {
    tickets: Ticket[];
}

export default function TicketIndex({ tickets }: TicketIndexPageProps) {

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        チケット一覧
                    </h2>
                    <Link href={route('ticket.index') as string}>
                        <PrimaryButton>
                            新規チケット作成
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="チケット一覧" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* 検索・フィルターエリア（モック） */}
                    <div className="mb-6 flex gap-4">
                        <div className="flex-1">
                            <TextInput
                                placeholder="キーワードで検索..."
                                className="w-full"
                            />
                        </div>
                        <select className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">全てのステータス</option>
                            <option value="open">未対応</option>
                            <option value="in_progress">対応中</option>
                            <option value="closed">完了</option>
                        </select>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden border border-gray-200">
                        {tickets.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">チケットがありません</h3>
                                <p className="mt-1 text-sm text-gray-500">新しいチケットを作成して追跡を開始しましょう。</p>
                                <div className="mt-6">
                                    <Link href={route('ticket.index') as string}>
                                        <PrimaryButton>
                                            チケットを作成
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル / 内容</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">優先度</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期限</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tickets.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    #{ticket.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                                            {ticket.title}
                                                        </span>
                                                        <span className="text-sm text-gray-500 truncate max-w-xs">
                                                            {ticket.body}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`w-16 px-2 inline-flex justify-center text-xs leading-5 font-semibold rounded-full ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
                                                        {statusLabels[ticket.status] || ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`font-medium ${priorityColors[ticket.priority] || 'text-gray-500'}`}>
                                                        {priorityLabels[ticket.priority] || ticket.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {ticket.assignee ? (
                                                        <div className="flex items-center">
                                                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                                                {ticket.assignee.name.charAt(0)}
                                                            </div>
                                                            {ticket.assignee.name}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 italic">未割り当て</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {ticket.due_at ? (
                                                        <span className={new Date(ticket.due_at) < new Date() ? 'text-red-600 font-medium' : ''}>
                                                            {formatDate(ticket.due_at)}
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
