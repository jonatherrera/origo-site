(function () {
  var posts = [
    { slug: 'six-questions-brand-agency', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Six Questions to Ask Before Trusting an Agency With Your Brand', excerpt: 'The questions every business owner should ask before signing the contract — and the answers that separate agencies worth hiring from the ones that aren\'t.' },
    { slug: 'social-media-is-rented-land', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Why Social Media Is Rented Land', excerpt: 'Every piece of content you publish to a social platform is building someone else\'s asset. Here\'s why — and how to keep using social without giving away the equity.' },
    { slug: 'you-dont-own-your-email-list', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'You Don\'t Own Your Email List If You Can\'t Take It With You', excerpt: 'The asset most businesses assume they own — and almost never fully do. Here\'s what real email list ownership looks like and what to do about it.' },
    { slug: 'digital-ownership', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Digital Ownership: Why Your Business Should Own What It Builds Online', excerpt: 'Most businesses don\'t actually own their websites, email lists, or customer data. Here\'s what digital ownership means across six asset types.' },
    { slug: 'on-purpose', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'On Purpose: How Citable Businesses Win AI Visibility', excerpt: 'The businesses winning AI visibility aren\'t doing anything special. They\'re doing the obvious things on purpose — while everyone else is doing them by accident.' },
    { slug: 'citations-are-the-new-clicks', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Citations Are the New Clicks: How AI Search Changed Visibility', excerpt: 'For 25 years, online visibility meant clicks. AI search changed the rules. Now visibility means citations — and most businesses haven\'t noticed yet.' },
    { slug: 'how-to-tell-if-youre-ai-visible', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'How to Tell If Your Business Is AI-Visible', excerpt: 'Three tests you can run in five minutes to find out whether ChatGPT, Claude, and Gemini are recommending your business — or your competitors.' },
    { slug: 'what-is-aeo', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'AEO: How AI Search Is Changing What It Means to Be Found Online', excerpt: 'What Answer Engine Optimization actually is, why it matters now, and what businesses need to do to stay visible as search shifts toward AI.' },
    { slug: 'what-is-a-digital-presence-agency', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'What Is a Digital Presence Agency? The Complete Guide', excerpt: 'A digital presence agency builds and maintains all the digital assets shaping how your business shows up online — brand, web, search, and content.' },
    { slug: 'the-website-is-the-symptom', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'The Website Is the Symptom, Not the Problem', excerpt: 'Most established businesses think they need a new website. They almost always do — but the website is the visible symptom of a deeper problem.' },
    { slug: 'build-on-your-own-land', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Build on Your Own Land: Why You Should Own Your Website', excerpt: 'Most businesses don\'t actually own their websites. They\'re renting on platforms they don\'t control. Here\'s why that matters — and what to do about it.' },
    { slug: 'not-cheaper-better', category: 'digital-strategy', categoryLabel: 'Digital Strategy', title: 'Not Cheaper. Better. How to Use AI Without Losing Trust', excerpt: 'AI is being used by most agencies to ship cheaper work. There\'s another way to use it — to ship better work. The difference is exactly what your customers feel.' },
    { slug: 'why-your-small-business-website-needs-a-professional-redesign-in-2026', category: 'web-design', categoryLabel: 'Website Design', title: 'Why Your Small Business Website Needs a Professional Redesign in 2026', excerpt: 'Most small business websites are not built to generate leads — they are built to look "fine." Here are the most common reasons websites fail to convert.' },
    { slug: '3-ways-to-update-your-website-before-fall-without-a-full-redesign', category: 'web-design', categoryLabel: 'Website Design', title: '3 Ways to Update Your Website Without a Full Redesign', excerpt: 'You don\'t have to tear down your site to make it work harder. Here are three strategic updates that make an immediate difference.' },
    { slug: 'how-to-update-your-website-without-starting-over', category: 'web-design', categoryLabel: 'Website Design', title: 'How to Update Your Website Without Starting Over', excerpt: 'Most small business owners think the only way to fix their website is to start from scratch. The truth is, a handful of thoughtful updates can breathe new life into your site.' },
    { slug: 'how-much-does-a-website-really-cost-in-2025', category: 'web-design', categoryLabel: 'Website Design', title: 'How Much Does a Website Really Cost in 2025?', excerpt: 'Website pricing is confusing because the industry is full of varying levels of quality, transparency, and support. Here\'s an honest breakdown of what you\'re really paying for.' },
    { slug: '5-website-fixes-that-instantly-make-your-small-business-look-more-professional', category: 'web-design', categoryLabel: 'Website Design', title: '5 Website Fixes That Instantly Make Your Small Business Look More Professional', excerpt: 'You don\'t need a full website redesign to make a stronger first impression. A few small, intentional changes can make your site look polished and credible.' },
    { slug: 'why-a-website-redesign-is-the-smartest-investment-for-2025', category: 'web-design', categoryLabel: 'Website Design', title: 'Why a Website Redesign is the Smartest Investment for Your Business', excerpt: 'Your website is working for you or against you whether you think about it or not. If it\'s not bringing in leads, it\'s quietly costing you money every week.' },
    { slug: 'top-website-maintenance-tips-to-keep-your-site-ready-for-end-of-year-traffic', category: 'web-design', categoryLabel: 'Website Design', title: 'Top Website Maintenance Tips to Keep Your Site Ready for Peak Traffic', excerpt: 'When traffic spikes, websites get tested. A well-maintained site handles increased demand smoothly — here are the maintenance steps that prevent costly disruptions.' },
    { slug: 'which-item-is-most-important-for-a-successful-website-design', category: 'web-design', categoryLabel: 'Website Design', title: 'Which Item Is Most Important for a Successful Website Design?', excerpt: 'Visual, functional, or practical — a successful website design strikes a balance between all three. Here\'s what each element contributes and why none can be skipped.' },
    { slug: 'why-web-design-still-matters-in-2023', category: 'web-design', categoryLabel: 'Website Design', title: 'Why Web Design Still Matters', excerpt: 'As apps, podcasts, and social feeds multiply, it\'s easy to wonder if websites are less essential. The truth is, websites remain the irreplaceable cornerstone of any digital presence.' },
    { slug: 'why-hire-a-web-designer', category: 'web-design', categoryLabel: 'Website Design', title: 'Why Hire a Web Designer Instead of DIY: 5 Benefits of Hiring a Pro', excerpt: 'Unless you\'re a professional web designer, getting a high-quality, fully responsive, and intuitive site on your own is a far-fetched idea. Here\'s why hiring a pro makes sense.' },
    { slug: 'simple-seo-fixes-how-to-write-image-alt-text-that-google-loves-and-people-understand', category: 'seo', categoryLabel: 'SEO', title: 'Simple SEO Fixes: How to Write Image Alt Text That Google Loves', excerpt: 'Alt text is one of the most overlooked parts of on-page SEO and one of the easiest to fix. Here\'s how to do it right — in less than 10 seconds per image.' },
    { slug: 'simple-seo-fixes-h1-tags-that-help-seo', category: 'seo', categoryLabel: 'SEO', title: 'Simple SEO Fixes: H1 Tags That Help SEO', excerpt: 'Multiple H1s. Missing H1s. Or a homepage with an H1 that just says "Welcome." Here\'s how to fix your H1 tags the right way.' },
    { slug: 'simple-seo-fixes-how-to-write-meta-descriptions-that-drive-clicks', category: 'seo', categoryLabel: 'SEO', title: 'Simple SEO Fixes: How to Write Meta Descriptions That Drive Clicks', excerpt: 'Your meta description is your pitch to a potential customer scanning search results. Most are blank, boring, or too long. Here\'s how to write one that actually gets clicked.' },
    { slug: 'simple-seo-fixes-how-to-write-title-tags-that-convert', category: 'seo', categoryLabel: 'SEO', title: 'Simple SEO Fixes: How to Write Title Tags That Convert', excerpt: 'Your title tag is your handshake with Google and your pitch to a potential customer. Yet it\'s botched more often than not. Part 1 of the Simple SEO Fixes series.' },
    { slug: 'beyond-seasonal-looks-geo-aeo-strategies-for-year-round-visibility', category: 'seo', categoryLabel: 'SEO', title: 'Beyond Seasonal Looks: GEO & AEO Strategies for Year-Round Visibility', excerpt: 'Seasonal campaigns come and go, but the way people search is changing in ways that last all year. Here\'s how GEO and AEO help your business stay visible.' },
    { slug: 'simple-seo-fixes-you-can-do-without-redesigning-your-website', category: 'seo', categoryLabel: 'SEO', title: 'Simple SEO Fixes You Can Do Without Redesigning Your Website', excerpt: 'If your site is working okay but not getting found, you don\'t need a full redesign. Here are five SEO fixes you can make right now — no developer required.' },
    { slug: 'how-to-get-found-on-google-seo-tips-for-small-business-owner', category: 'seo', categoryLabel: 'SEO', title: 'How to Get Found on Google: SEO Tips for Small Business Owners', excerpt: 'Having a website isn\'t enough — people need to be able to find it. Here\'s a practical breakdown of the SEO strategies that actually move the needle for small businesses.' },
    { slug: 'know-your-audience-why-cracker-barrels-branding-misstep-matters-to-your-business', category: 'branding', categoryLabel: 'Branding', title: 'Know Your Audience — Why Cracker Barrel\'s Branding Misstep Matters to Your Business', excerpt: 'Cracker Barrel spent $10 million on a redesign that alienated their core customers and wiped out nearly $700 million in market value. Here\'s what small businesses can learn.' },
    { slug: 'spring-cleaning-for-your-brand-refreshing-your-business-image-in-2025', category: 'branding', categoryLabel: 'Branding', title: 'Spring Cleaning for Your Brand: Refreshing Your Business Image', excerpt: 'If your business has grown, shifted, or just feels a little outdated, it might be time for a refresh. Here are five practical ways to clean up your brand and digital presence.' },
    { slug: '5-signs-it-might-be-time-to-rebrand-your-small-business', category: 'branding', categoryLabel: 'Branding', title: '5 Signs It Might Be Time to Rebrand Your Small Business', excerpt: 'I held onto my old branding for a long time. Then one day I looked at my website and had a weird realization — this doesn\'t feel like me anymore. Here are the five signs.' },
    { slug: 'mastering-branding-in-2024-how-to-build-a-memorable-and-impactful-brand', category: 'branding', categoryLabel: 'Branding', title: 'Mastering Branding: How to Build a Memorable and Impactful Brand', excerpt: 'Branding is no longer just about a catchy logo or tagline — it\'s about building a full identity that resonates. Here\'s a guide to the essentials of building a lasting brand.' },
    { slug: 'best-branding-practices-you-need-to-follow-in-2022', category: 'branding', categoryLabel: 'Branding', title: 'Best Branding Practices You Need To Follow', excerpt: 'What does it take to be a great brand? In today\'s landscape, branding is all about building trust with your customers and demonstrating what makes your company unique.' },
    { slug: 'googles-android-developer-verification-changes-in-2026-what-small-businesses-need-to-know', category: 'cybersecurity', categoryLabel: 'Cybersecurity', title: 'Google\'s Android Developer Verification Changes in 2026: What Small Businesses Need to Know', excerpt: 'A major Android change is on the calendar for 2026 that could affect how apps get installed on certified Android devices. Here\'s what small businesses need to understand.' },
    { slug: 'google-websites-ends', category: 'announcement', categoryLabel: 'Announcement', title: 'Websites Made with Google Business Profiles Are Being Discontinued', excerpt: 'Google is ending support for websites created through Google Business Profile. Here\'s what it means, what happens to your site, and what to do before the deadline.' },
    { slug: 'what-does-website-maintenance-entails', category: 'maintenance', categoryLabel: 'Website Maintenance', title: 'What Does Website Maintenance Entail: Why Is It Necessary?', excerpt: 'Regular maintenance is as essential to a website\'s healthy growth as regular checkups are to a person. Here\'s what it means, why it matters, and the signs it\'s time.' },
    { slug: 'local-to-nationwide-how-small-businesses-can-scale-their-online-presence', category: 'growth', categoryLabel: 'Small Business Growth', title: 'Local to Nationwide: How Small Businesses Can Scale Their Online Presence', excerpt: 'Small businesses are often closer to scaling nationwide than they realize. Here\'s how to build a brand and SEO strategy that holds up anywhere someone finds you.' }
  ];

  var pathParts = window.location.pathname.replace(/\/$/, '').split('/');
  var currentSlug = pathParts[pathParts.length - 1];
  var current = posts.find(function (p) { return p.slug === currentSlug; });
  if (!current) return;

  var related = posts.filter(function (p) { return p.slug !== currentSlug && p.category === current.category; });

  // Shuffle for variety
  related = related.sort(function () { return Math.random() - 0.5; });

  // If fewer than 3 in same category, fill from others
  if (related.length < 3) {
    var others = posts
      .filter(function (p) { return p.slug !== currentSlug && p.category !== current.category; })
      .sort(function () { return Math.random() - 0.5; });
    related = related.concat(others).slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  if (!related.length) return;

  var cards = related.map(function (p) {
    return '<article class="rp-card">' +
      '<div class="rp-card__accent rp-card__accent--' + p.category + '"></div>' +
      '<div class="rp-card__body">' +
      '<span class="rp-card__category">' + p.categoryLabel + '</span>' +
      '<h3 class="rp-card__title"><a href="/blog/' + p.slug + '">' + p.title + '</a></h3>' +
      '<p class="rp-card__excerpt">' + p.excerpt + '</p>' +
      '<a href="/blog/' + p.slug + '" class="rp-card__link">Read &rarr;</a>' +
      '</div>' +
      '</article>';
  }).join('');

  var section = '<section class="related-posts">' +
    '<div class="container">' +
    '<h2 class="related-posts__heading">Keep Reading</h2>' +
    '<div class="related-posts__grid">' + cards + '</div>' +
    '</div>' +
    '</section>';

  var cta = document.querySelector('.post-cta');
  if (cta) cta.insertAdjacentHTML('beforebegin', section);
})();
