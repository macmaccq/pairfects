import { test, expect } from '@playwright/test'
import fs from 'node:fs'

const ROUTES = ['/', '/about', '/projects', '/members', '/contact']
const WIDTHS = [1440, 1280, 768, 390, 360, 320]
const MEMBERS = [
  { id: 'angel-kate-dela-cruz', name: 'Angel Kate Dela Cruz', photo: 'angel-kate-dela-cruz' },
  { id: 'marc-lorenz-dela-cruz', name: 'Marc Lorenz Dela Cruz', photo: 'marc-lorenz-dela-cruz' },
]
const SOCIAL_DOMAINS = /facebook\.com|instagram\.com|linkedin\.com|github\.com|tiktok\.com/i

function watchErrors(page) {
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  page.on('response', (res) => {
    if (res.status() >= 400 && res.url().startsWith('http://localhost')) errors.push(`${res.status()} ${res.url()}`)
  })
  return errors
}

async function loadFully(page, path) {
  await page.goto(path)
  await page.waitForLoadState('networkidle')
  // Scroll through the page so lazy images load, then wait for every image.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForFunction(() => [...document.images].every((img) => img.complete))
  await page.evaluate(() => document.fonts.ready)
}

async function brokenImages(page) {
  return page.evaluate(() =>
    [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src),
  )
}

async function layoutProblems(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const problems = []
    if (document.documentElement.scrollWidth > vw) {
      problems.push(`page scrollWidth ${document.documentElement.scrollWidth} > ${vw}`)
    }
    const selector = 'h1,h2,h3,h4,p,a,button,li,dd,dt,label,input,textarea,img,figcaption,span'
    document.querySelectorAll(selector).forEach((el) => {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden' || el.closest('.sr-only')) return
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      const text = (el.textContent || el.alt || '').trim().slice(0, 40)
      if (r.right > vw + 1 || r.left < -1) {
        problems.push(`${el.tagName.toLowerCase()} "${text}" spans ${Math.round(r.left)}-${Math.round(r.right)} (vw ${vw})`)
      }
      if (/^(H[1-4]|P|DD|FIGCAPTION)$/.test(el.tagName) && el.scrollWidth > el.clientWidth + 1) {
        problems.push(`${el.tagName.toLowerCase()} text overflows: "${text}"`)
      }
    })
    return problems
  })
}

test.describe('routes', () => {
  for (const path of ROUTES) {
    test(`${path} renders with no console errors`, async ({ page }) => {
      const errors = watchErrors(page)
      await loadFully(page, path)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page).toHaveTitle(/Pairfect/)
      expect(await brokenImages(page)).toEqual([])
      expect(errors).toEqual([])
    })
  }

  test('unknown project slugs and unknown routes show not-found', async ({ page }) => {
    for (const path of ['/projects/some-project', '/projects/example', '/does-not-exist']) {
      await page.goto(path)
      await expect(page.getByTestId('not-found')).toBeVisible()
      await expect(page.locator('h1')).toHaveText('Page not found')
    }
  })
})

test.describe('organization facts', () => {
  test('home hero uses PAIRFECT as the H1 and shows factual highlights', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('PAIRFECT')
    const highlights = page.getByTestId('hero-highlights')
    await expect(highlights).toContainText('Founded')
    await expect(highlights).toContainText('2026')
    await expect(highlights).toContainText('Members')
    await expect(highlights.locator('dd').nth(1)).toHaveText('2')
  })

  test('logo loads in header and footer', async ({ page }) => {
    await loadFully(page, '/')
    const logos = page.getByTestId('org-logo')
    expect(await logos.count()).toBeGreaterThanOrEqual(2)
    for (const logo of await logos.all()) {
      expect(await logo.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)
      expect(await logo.getAttribute('src')).toContain('pairfect-logo')
    }
  })

  test('email, phone and founding year are correct; location is hidden', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByTestId('contact-email')).toHaveText('pairfect@gmail.com')
    await expect(page.getByTestId('contact-phone')).toHaveText('09338277364')
    await expect(page.getByTestId('contact-location')).toHaveCount(0)
    await expect(page.locator('a[href="mailto:pairfect@gmail.com"]').first()).toBeVisible()
    await expect(page.locator('a[href="tel:09338277364"]').first()).toBeVisible()
    const footer = page.getByTestId('site-footer')
    await expect(footer).toContainText('pairfect@gmail.com')
    await expect(footer).toContainText('09338277364')
    await expect(footer).toContainText('Founded 2026')
  })

  test('no WILD DOGS content anywhere', async ({ page }) => {
    for (const path of ROUTES) {
      await page.goto(path)
      await expect(page.locator('body')).not.toContainText(/wild\s*dogs/i)
    }
  })
})

test.describe('members', () => {
  for (const path of ['/', '/members']) {
    test(`${path} shows exactly 2 members with the correct photos`, async ({ page }) => {
      await loadFully(page, path)
      const cards = page.getByTestId('member-card')
      await expect(cards).toHaveCount(2)
      for (const [i, m] of MEMBERS.entries()) {
        const card = cards.nth(i)
        await expect(card).toHaveAttribute('data-member-id', m.id)
        await expect(card.getByTestId('member-name')).toHaveText(m.name)
        const photo = card.getByTestId('member-photo')
        expect(await photo.getAttribute('src')).toContain(m.photo)
        expect(await photo.getAttribute('alt')).toContain(m.name)
        expect(await photo.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)
      }
    })
  }

  test('home hero team visual pairs each name with the right photo', async ({ page }) => {
    await loadFully(page, '/')
    const figures = page.getByTestId('hero-member')
    await expect(figures).toHaveCount(2)
    for (const [i, m] of MEMBERS.entries()) {
      const fig = figures.nth(i)
      await expect(fig).toHaveAttribute('data-member-id', m.id)
      await expect(fig.locator('figcaption')).toContainText(m.name)
      expect(await fig.locator('img').getAttribute('src')).toContain(m.photo)
      expect(await fig.locator('img').getAttribute('alt')).toContain(m.name)
    }
  })

  test('members page shows role, bio, skills and tools for each member', async ({ page }) => {
    await page.goto('/members')
    const cards = page.getByTestId('member-card')
    for (const i of [0, 1]) {
      const card = cards.nth(i)
      await expect(card.getByRole('list', { name: 'Skills' }).locator('li').first()).toBeVisible()
      await expect(card.getByRole('list', { name: 'Tools & Technology' }).locator('li').first()).toBeVisible()
    }
    await expect(cards.nth(0)).toContainText('Creative & Project Lead')
    await expect(cards.nth(1)).toContainText('Web & Technical Lead')
  })
})

test.describe('projects', () => {
  test('projects page shows the coming-soon state and no project cards', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByTestId('projects-coming-soon')).toBeVisible()
    await expect(page.getByTestId('projects-coming-soon')).toContainText('Projects Coming Soon')
    await expect(page.getByTestId('project-grid')).toHaveCount(0)
  })

  test('no links point to project detail pages anywhere', async ({ page }) => {
    for (const path of ROUTES) {
      await page.goto(path)
      await expect(page.locator('a[href^="/projects/"]')).toHaveCount(0)
    }
    await page.goto('/')
    await expect(page.getByTestId('projects-coming-soon')).toBeVisible()
  })
})

test.describe('social links', () => {
  test('no social links or icons are rendered while all URLs are blank', async ({ page }) => {
    for (const path of ROUTES) {
      await page.goto(path)
      const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
      expect(hrefs.filter((h) => SOCIAL_DOMAINS.test(h))).toEqual([])
      expect(hrefs.filter((h) => h === '' || h === '#')).toEqual([])
      await expect(page.getByRole('list', { name: /social media/i })).toHaveCount(0)
    }
  })
})

test.describe('mobile navigation', () => {
  for (const width of [390, 360, 320]) {
    test(`menu opens, navigates, and closes with Escape at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/')
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden()
      const toggle = page.getByRole('button', { name: 'Open menu' })
      await expect(toggle).toBeVisible()
      await toggle.click()
      const menu = page.locator('#mobile-menu')
      await expect(menu).toBeVisible()
      await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
      await menu.getByRole('link', { name: 'Members' }).click()
      await expect(page).toHaveURL(/\/members$/)
      await expect(menu).toBeHidden()

      await page.getByRole('button', { name: 'Open menu' }).click()
      await expect(menu).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(menu).toBeHidden()
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    })
  }

  test('desktop navigation marks the active page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/about')
    const nav = page.getByRole('navigation', { name: 'Main' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()
  })
})

test.describe('contact form', () => {
  test('validates fields and never claims a message was sent', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByTestId('form-notice')).toContainText('does not send messages directly')
    const submit = page.getByRole('button', { name: 'Prepare Email' })

    await submit.click()
    await expect(page.getByTestId('field-error')).toHaveCount(4)
    await expect(page.getByLabel('Name')).toBeFocused()
    await expect(page.getByTestId('form-ready')).toHaveCount(0)

    await page.getByLabel('Name').fill('Test Visitor')
    await page.getByLabel('Email').fill('not-an-email')
    await page.getByLabel('Subject').fill('Hello')
    await page.getByLabel('Message').fill('short')
    await submit.click()
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
    await expect(page.getByText(/at least 10 characters/)).toBeVisible()
    await expect(page.getByTestId('form-ready')).toHaveCount(0)

    await page.getByLabel('Email').fill('visitor@example.com')
    await page.getByLabel('Message').fill('We would like to talk about a website idea.')
    await submit.click()
    await expect(page.getByTestId('field-error')).toHaveCount(0)
    await expect(page.getByTestId('form-ready')).toContainText('has not been sent yet')
    const href = await page.getByTestId('open-email-app').getAttribute('href')
    expect(href).toMatch(/^mailto:pairfect@gmail\.com\?subject=Hello&body=/)
    await expect(page.locator('body')).not.toContainText(/sent successfully|thank you for your message/i)
  })
})

test.describe('responsive layout', () => {
  for (const width of WIDTHS) {
    test(`no horizontal scroll, overflow, or broken images at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const path of [...ROUTES, '/projects/unknown']) {
        await loadFully(page, path)
        expect(await layoutProblems(page), `${path} @ ${width}px`).toEqual([])
        expect(await brokenImages(page), `${path} @ ${width}px`).toEqual([])
      }
      if (width < 768) {
        await page.goto('/')
        await page.getByRole('button', { name: 'Open menu' }).click()
        expect(await layoutProblems(page), `menu @ ${width}px`).toEqual([])
      }
    })
  }
})

test.describe('screenshots for visual review', () => {
  test('capture full pages at 1440, 360 and 320', async ({ page }) => {
    test.setTimeout(180_000)
    fs.mkdirSync('screenshots', { recursive: true })
    for (const width of [1440, 360, 320]) {
      await page.setViewportSize({ width, height: 900 })
      for (const path of ROUTES) {
        await loadFully(page, path)
        const name = path === '/' ? 'home' : path.slice(1)
        await page.screenshot({ path: `screenshots/${width}-${name}.png`, fullPage: true, animations: 'disabled' })
      }
      if (width < 768) {
        await page.goto('/')
        await page.getByRole('button', { name: 'Open menu' }).click()
        await page.screenshot({ path: `screenshots/${width}-menu.png` })
      }
    }
  })
})
