import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import type { Ticket } from '@/types/ticket';
import { Head, Link } from '@inertiajs/react';
import { statusLabels, priorityLabels } from '@/const/labels';
import { statusColors, priorityColors } from '@/const/colors';
import { formatDate } from '@/lib/time';

interface TicketDetailPageProps {
    ticket: Ticket;
}

export default function TicketShow({ ticket }: TicketDetailPageProps) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        チケット詳細 #{ticket.id}
                    </h2>
                    <div className="flex gap-2">
                        <Link href={route('tickets.index') as string}>
                            <SecondaryButton>
                                一覧に戻る
                            </SecondaryButton>
                        </Link>
                        <Link href={route('tickets.edit', ticket.id) as string}>
                            <PrimaryButton>
                                編集
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`チケット詳細 #${ticket.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* メインコンテンツエリア */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden p-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                    {ticket.title}
                                </h1>
                                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap min-h-[200px]">
                                    {ticket.body || <span className="text-gray-400 italic">詳細なし</span>}
                                </div>
                            </div>

                            {/* コメントエリア（プレースホルダー） */}
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">コメント</h3>
                                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    コメント機能は準備中です
                                </div>
                            </div>
                        </div>

                        {/* サイドバー（メタデータ） */}
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                                    ステータス情報
                                </h3>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">ステータス</dt>
                                        <dd className="mt-1">
                                            <span className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {statusLabels[ticket.status] || ticket.status}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">優先度</dt>
                                        <dd className="mt-1">
                                            <span className={`font-medium ${priorityColors[ticket.priority] || 'text-gray-500'}`}>
                                                {priorityLabels[ticket.priority] || ticket.priority}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">担当者</dt>
                                        <dd className="mt-1 flex items-center">
                                            {ticket.assignee ? (
                                                <>
                                                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600 mr-2">
                                                        {ticket.assignee.name.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-900">{ticket.assignee.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-400 italic">未割り当て</span>
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">報告者</dt>
                                        <dd className="mt-1 flex items-center">
                                            {ticket.requester ? (
                                                <>
                                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                                        {ticket.requester.name.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-900">{ticket.requester.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-400 italic">-</span>
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">期限</dt>
                                        <dd className="mt-1 text-gray-900">
                                            {ticket.due_at ? (
                                                <span className={new Date(ticket.due_at) < new Date() ? 'text-red-600 font-medium' : ''}>
                                                    {formatDate(ticket.due_at)}
                                                </span>
                                            ) : '-'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden p-6">
                                <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
                                    システム情報
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500">作成日時</dt>
                                        <dd className="text-gray-900">{formatDate(ticket.created_at)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500">最終更新</dt>
                                        <dd className="text-gray-900">{formatDate(ticket.updated_at)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
