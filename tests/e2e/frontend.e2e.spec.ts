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

  test('can open post detail page from list link', async ({ page }) => {
    await page.goto('http://localhost:3000/posts')
    const firstPostLink = page.locator('.card h3 a').first()
    const count = await firstPostLink.count()
    test.skip(count === 0, 'No published posts available')

    await firstPostLink.click()
    await expect(page.locator('.article-header h1').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '404' })).toHaveCount(0)
  })

  test('can open course detail page from list link', async ({ page }) => {
    await page.goto('http://localhost:3000/courses')
    const firstCourseLink = page.locator('.card h3 a').first()
    const count = await firstCourseLink.count()
    test.skip(count === 0, 'No published courses available')

    await firstCourseLink.click()
    await expect(page.locator('.article-header h1').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '404' })).toHaveCount(0)
  })
})
