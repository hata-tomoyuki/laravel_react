import { test, expect } from '@playwright/test';

test('ログインできる', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByLabel(/password/i).fill('password');

  await page.getByRole('button', { name: /log in/i }).click();

  await expect(page).not.toHaveURL(/\/login/);
});
