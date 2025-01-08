import { test, expect } from '@playwright/test';

test('opens MongoDB Designer, adds collection, and checks "New Collection" visibility', async ({
  page,
}) => {
  await page.goto('');

  await page.getByRole('link', { name: 'Launch MongoDB Designer' }).click();
  await expect(page).toHaveURL('http://localhost:5173/editor.html');

  const newButton = page.getByRole('button', { name: 'New' });
  await expect(newButton).toBeVisible();
  await newButton.click();

  const addCollectionButton = page
    .getByRole('button', { name: 'Add Collection' })
    .first();
  await expect(addCollectionButton).toBeVisible();
  await addCollectionButton.click();

  const applyButton = page.getByRole('button', { name: 'Apply' });
  await expect(applyButton).toBeVisible();
  await expect(applyButton).toBeEnabled();
  await applyButton.click();

  const newCollectionText = page.locator('svg g text', {
    hasText: 'New Collection',
  });
  await expect(newCollectionText).toBeVisible();
});
