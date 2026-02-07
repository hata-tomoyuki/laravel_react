<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'バグ', 'slug' => 'bug', 'description' => '不具合・障害の報告'],
            ['name' => '機能要望', 'slug' => 'feature', 'description' => '新機能や改善の要望'],
            ['name' => '問い合わせ', 'slug' => 'inquiry', 'description' => '一般的な問い合わせ'],
            ['name' => 'その他', 'slug' => 'other', 'description' => '上記に当てはまらないもの'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
