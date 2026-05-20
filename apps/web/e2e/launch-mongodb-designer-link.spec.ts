import { test, expect } from '@playwright/test';

test('navigates to and verifies MongoDB Designer URL', async ({ page }) => {
  await page.goto('');

  await page.getByRole('link', { name: 'Launch MongoDB Designer' }).click();
  await expect(page).toHaveURL('http://localhost:5173/editor.html');
});
