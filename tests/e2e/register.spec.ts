import { test, expect } from '@playwright/test';

test('ユーザー登録できる', async ({ page }) => {
  // 一意なメールを作る（秒まで含めて衝突しにくい）
  const email = `e2e+${Date.now()}@example.com`;
  const password = 'Password123!'; // Breezeのルールに合わせて調整

  await page.goto('/register');

  // Breeze標準のname属性に寄せる（ラベル文言が日本語でも壊れにくい）
  await page.locator('input[name="name"]').fill('E2E New User');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="password_confirmation"]').fill(password);

  // ボタン名は "Register" が多いけど、念のため /register/i
  await page.getByRole('button', { name: /register/i }).click();

  // 登録後はログイン済みになって別ページへ行くはず
  await expect(page).not.toHaveURL(/\/register/);
});
