<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'status' => ['required', 'string', 'in:open,closed,pending'],
            'priority' => ['required', 'string', 'in:low,medium,high'],
            'category_id' => ['required', 'exists:categories,id'],
            'requester_id' => ['required', 'exists:users,id'],
            'assignee_id' => ['nullable', 'exists:users,id'],
            'due_at' => ['nullable', 'date'],
        ];
    }
}
