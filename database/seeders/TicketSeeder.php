<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $categories = Category::all();

        if ($users->isEmpty() || $categories->isEmpty()) {
            return;
        }

        $statuses = ['open', 'in_progress', 'resolved', 'closed'];
        $priorities = ['low', 'normal', 'high', 'urgent'];

        for ($i = 0; $i < 15; $i++) {
            Ticket::create([
                'title' => fake()->sentence(4),
                'body' => fake()->paragraph(2),
                'status' => fake()->randomElement($statuses),
                'priority' => fake()->randomElement($priorities),
                'category_id' => $categories->random()->id,
                'requester_id' => $users->random()->id,
                'assignee_id' => fake()->boolean(70) ? $users->random()->id : null,
                'due_at' => fake()->boolean(60) ? fake()->dateTimeBetween('now', '+30 days') : null,
            ]);
        }
    }
}
