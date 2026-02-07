<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\User;
use Illuminate\Database\Seeder;

class TicketCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tickets = Ticket::all();
        $users = User::all();

        if ($tickets->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($tickets->random(min(10, $tickets->count())) as $ticket) {
            $commentCount = fake()->numberBetween(0, 3);
            for ($i = 0; $i < $commentCount; $i++) {
                TicketComment::create([
                    'ticket_id' => $ticket->id,
                    'user_id' => $users->random()->id,
                    'body' => fake()->paragraph(1),
                ]);
            }
        }
    }
}
