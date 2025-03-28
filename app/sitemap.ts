import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: Array<{
    path: string;
    changeFrequency?: 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' | 'always' | 'never';
    priority?: number;
  }> = [
      { path: '/', changeFrequency: 'yearly', priority: 1 },
      { path: '/docs/changelog', changeFrequency: 'monthly', priority: 0.8 },
      { path: '/docs/', changeFrequency: 'weekly', priority: 0.5 },
      { path: '/docs/setup', changeFrequency: 'yearly', priority: 1 },
    ]

  const sections = {
    background: [
      'animated-beam', 'blurry-blob', 'diagonal-lines', 'dot', 'grid',
      'hero-parallax', 'interactive-grid', 'lamp', 'moving-gradient',
      'sparkles', 'zigzag',
    ],
    'bento-grid': ['eight', 'glowing-bento', 'gradient', 'three'],
    button: [
      'ai-button', 'algolia-blue-button', 'algolia-white-button', 'duolingo',
      'external-link-button', 'get-started-button', 'hover-border-gradient',
      'moving-border', 'ripple-button', 'shining-button',
      'slide-arrow-button', 'status-button', 'swipe-button', 'toggle-switch',
      'work-button',
    ],
    card: [
      'animated-testimonials', 'card-comment', 'card-spread', 'card-stack',
      'case-study-card', 'comment-reply-card', 'direction-aware-hover',
      'email-feature-card', 'evervault-card', 'flip-card', 'fluid-tabs',
      'github-card-shiny', 'github-card-skew', 'glowing-card', 'hover-effect',
      'integration-pills', 'led-board', 'notice-card', 'notification-card',
      'notify-user-info', 'reminder-scheduler', 'score-card', 'staggered-card',
      'stars-card', 'subscribe-card', 'survey-card', 'swap-card',
      'swap-text-card', 'three-d-card-effect', 'three-d-pin', 'tilted-card',
      'webhooks-card',
    ],
    carousel: ['carousel', 'expandable', 'image-carousel'],
    container: [
      'animated-border-trail', 'animated-dock', 'cursor-tracker',
      'fibonacci-lines', 'marquee', 'nav-tabs', 'scrolling-testimonials',
    ],
  }

  Object.entries(sections).forEach(([category, paths]) => {
    // Add category page
    routes.push({
      path: `/docs/${category}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Add individual item pages, filtering out empty strings
    paths
      .filter(item => item !== '')
      .forEach((item) => {
        routes.push({
          path: `/docs/${category}/${item}`,
          changeFrequency: 'yearly',
          priority: 1,
        })
      })
  })

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `https://mageui.live${path}`,
    lastModified: lastModified.toISOString(), // Convert to ISO string
    changeFrequency,
    priority,
  }))
}