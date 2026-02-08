import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { priorityLabels, statusLabels } from '@/const/labels';

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface TicketCreatePageProps {
    currentUser: User;
    users: User[];
    categories: Category[];
}

export default function TicketCreate({ currentUser, users, categories }: TicketCreatePageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        priority: 'low',
        status: 'open',
        category_id: '',
        requester_id: currentUser.id,
        assignee_id: '',
        due_at: '',
    });

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        post(route('tickets.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    新規チケット作成
                </h2>
            }
        >
            <Head title="新規チケット作成" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                            >
                                <div>
                                    <InputLabel htmlFor="title" value="タイトル" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                        placeholder="チケットのタイトルを入力"
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="body" value="詳細" />
                                    <textarea
                                        id="body"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows={5}
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        placeholder="チケットの詳細内容を入力"
                                    />
                                    <InputError className="mt-2" message={errors.body} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="priority" value="優先度" />
                                        <select
                                            id="priority"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value)}
                                        >
                                            {Object.entries(priorityLabels).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError className="mt-2" message={errors.priority} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="status" value="ステータス" />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            {Object.entries(statusLabels).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError className="mt-2" message={errors.status} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="category_id" value="カテゴリー" />
                                        <select
                                            id="category_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                        >
                                            <option value="">選択してください</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError className="mt-2" message={errors.category_id} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="assignee_id" value="担当者" />
                                        <select
                                            id="assignee_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.assignee_id}
                                            onChange={(e) => setData('assignee_id', e.target.value)}
                                        >
                                            <option value="">未割り当て</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError className="mt-2" message={errors.assignee_id} />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="due_at" value="期限" />
                                    <TextInput
                                        id="due_at"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={data.due_at}
                                        onChange={(e) => setData('due_at', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.due_at} />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link href={route('tickets.index') as string}>
                                        <SecondaryButton disabled={processing}>
                                            キャンセル
                                        </SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        作成する
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
