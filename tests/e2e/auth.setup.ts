import { test as setup, expect } from '@playwright/test';

setup('login state', async ({ page }) => {
  await page.goto('/login');

  // ラベルが日本語でも壊れにくい name 属性で指定
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[name="password"]').fill('password');

  await page.getByRole('button', { name: /log in|ログイン/i }).click();

  // ログインできたことをURLでざっくり確認
  await expect(page).not.toHaveURL(/\/login/);

  // ログイン状態を保存
  await page.context().storageState({ path: 'tests/e2e/.auth/state.json' });
});
