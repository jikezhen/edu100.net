import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Edu100\.net/)

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('can navigate to courses page', async ({ page }) => {
    await page.goto('http://localhost:3000/courses')
    await expect(page.locator('h1')).toHaveText('课程')
  })

  test('can navigate to posts page', async ({ page }) => {
    await page.goto('http://localhost:3000/posts')
    await expect(page.locator('h1')).toHaveText('文章')
  })
})
