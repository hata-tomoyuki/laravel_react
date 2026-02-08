import { test, expect } from '@playwright/test';

test('ログイン後にチケット一覧が見れる', async ({ page }) => {
  await page.goto('/tickets');
  await expect(page).toHaveURL(/\/tickets/);

  // setup(project) でログイン済みの storageState を使っている前提だが、
  // 万一ログインが切れていた場合はここで気付けるようにする
  await expect(page).not.toHaveURL(/\/login/);

  // ヘッダー（Index.tsx の固定文言）
  await expect(page.getByRole('heading', { name: 'チケット一覧' })).toBeVisible();
  await expect(page.getByRole('link', { name: '新規チケット作成' })).toBeVisible();

  // 検索・フィルター（モックでも存在するUI）
  await expect(page.getByPlaceholder('キーワードで検索...')).toBeVisible();
  const statusSelect = page.locator('select').first();
  await expect(statusSelect).toBeVisible();
  await expect(statusSelect.locator('option', { hasText: '全てのステータス' })).toHaveCount(1);

  // 本文は「空状態」か「テーブル表示」のどちらか
  const emptyStateHeading = page.getByRole('heading', { name: 'チケットがありません' });
  if ((await emptyStateHeading.count()) > 0) {
    await expect(emptyStateHeading).toBeVisible();
    await expect(page.getByRole('link', { name: 'チケットを作成' })).toBeVisible();
  } else {
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // テーブル見出し（壊れにくい固定カラム）
    await expect(table.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'ステータス' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: '優先度' })).toBeVisible();

    // 1行以上あり、詳細へのリンクが存在すること
    await expect(table.locator('tbody tr').first()).toBeVisible();
    await expect(table.locator('tbody a').first()).toBeVisible();
  }
});
