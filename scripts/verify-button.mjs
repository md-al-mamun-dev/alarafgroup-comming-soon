import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

// Create screenshots directory
const screenshotsDir = path.resolve(process.cwd(), "tests/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// 1. Static file server for `out/`
const outDir = path.resolve(process.cwd(), "out");
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath.endsWith("/")) reqPath += "index.html";
  let filePath = path.join(outDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (!req.url.split("?")[0].endsWith("/")) {
      res.writeHead(308, { Location: req.url.split("?")[0] + "/" });
      res.end();
      return;
    }
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + ".html")) {
      filePath = filePath + ".html";
    } else if (fs.existsSync(path.join(filePath, "index.html"))) {
      filePath = path.join(filePath, "index.html");
    } else {
      filePath = path.join(outDir, "404.html");
    }
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = 3333;
server.listen(PORT, async () => {
  console.log(`Verification server running at http://localhost:${PORT}`);

  try {
    const browser = await chromium.launch({
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto(`http://localhost:${PORT}/en/landing-page/design-system/`);
    await page.waitForLoadState("networkidle");

    // Locate the Book Call button
    const button = page.locator('a[href="#book-call"]');
    await button.scrollIntoViewIfNeeded();

    // ── Check Default State ───────────────────────────────────────
    const box = await button.boundingBox();
    console.log(`[Default State] Dimensions: width=${Math.round(box.width)}px, height=${Math.round(box.height)}px`);

    const styles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const circle = el.querySelector("span:nth-child(3)");
      const circleComputed = circle ? window.getComputedStyle(circle) : null;
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;

      return {
        buttonBg: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        gap: computed.gap,
        overflow: computed.overflow,
        fontFamily: labelComputed?.fontFamily,
        fontSize: labelComputed?.fontSize,
        fontWeight: labelComputed?.fontWeight,
        lineHeight: labelComputed?.lineHeight,
        textColor: labelComputed?.color,
        circleBg: circleComputed?.backgroundColor,
        circleWidth: circleComputed?.width,
        circleHeight: circleComputed?.height,
        arrowTransform: svgComputed?.transform,
      };
    });

    console.log("[Default State] Computed Styles:", JSON.stringify(styles, null, 2));

    await button.screenshot({ path: path.join(screenshotsDir, "button-1-default.png") });
    console.log("Saved screenshot: button-1-default.png");

    // ── Mid-Animation ─────────────────────────────────────────────
    // Move mouse over button
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(200); // 200ms into 500ms transition

    await button.screenshot({ path: path.join(screenshotsDir, "button-2-mid-animation.png") });
    console.log("Saved screenshot: button-2-mid-animation.png");

    // ── Full Hover State ──────────────────────────────────────────
    await page.waitForTimeout(400); // Wait for transition completion (total 600ms)

    const hoveredStyles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;

      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        expanderTransform: expanderComputed?.transform,
        arrowRotate: svgComputed?.rotate,
        arrowTransform: svgComputed?.transform,
      };
    });

    console.log("[Hovered State] Computed Styles:", JSON.stringify(hoveredStyles, null, 2));

    await button.screenshot({ path: path.join(screenshotsDir, "button-3-hovered.png") });
    console.log("Saved screenshot: button-3-hovered.png");

    // ── Reverse Animation on Pointer Leave ────────────────────────
    await page.mouse.move(0, 0); // Move away
    await page.waitForTimeout(600); // Wait for reverse transition

    const unhoveredStyles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;

      return {
        buttonBg: computed.backgroundColor,
        arrowTransform: svgComputed?.transform,
      };
    });

    console.log("[Unhovered State] Computed Styles:", JSON.stringify(unhoveredStyles, null, 2));

    await button.screenshot({ path: path.join(screenshotsDir, "button-4-reversed.png") });
    console.log("Saved screenshot: button-4-reversed.png");

    // ── Verify Custom Rotation Variations ─────────────────────────
    const rotate90Btn = page.locator('a[href="#custom-rotate"]');
    await rotate90Btn.scrollIntoViewIfNeeded();
    const r90Box = await rotate90Btn.boundingBox();
    await page.mouse.move(r90Box.x + r90Box.width / 2, r90Box.y + r90Box.height / 2);
    await page.waitForTimeout(400);

    const r90Styles = await rotate90Btn.evaluate((el) => {
      const rotTarget = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const rotComputed = rotTarget ? window.getComputedStyle(rotTarget) : null;
      return {
        rotate: rotComputed?.rotate,
      };
    });
    console.log("[Rotate 90deg Button Hovered]:", JSON.stringify(r90Styles, null, 2));

    const noRotateBtn = page.locator('a[href="#static-icon"]');
    const noRotBox = await noRotateBtn.boundingBox();
    await page.mouse.move(noRotBox.x + noRotBox.width / 2, noRotBox.y + noRotBox.height / 2);
    await page.waitForTimeout(400);

    const noRotStyles = await noRotateBtn.evaluate((el) => {
      const rotTarget = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const rotComputed = rotTarget ? window.getComputedStyle(rotTarget) : null;
      return {
        rotate: rotComputed?.rotate,
      };
    });
    console.log("[No Rotate Button Hovered]:", JSON.stringify(noRotStyles, null, 2));

    const noIconBtn = page.locator('a[href="#no-icon"]');
    const hasIconCircle = await noIconBtn.locator('span.rounded-full').count();
    console.log("[No Icon Button]: hasIconCircle =", hasIconCircle > 0);

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    // ── Verify Secondary Button ("Explore Courses") ───────────────
    const secButton = page.locator('a[href="#courses"]');
    const secBox = await secButton.boundingBox();
    console.log(`[Secondary Button Default] Dimensions: width=${Math.round(secBox.width)}px, height=${Math.round(secBox.height)}px`);

    const secStyles = await secButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        borderRadius: computed.borderRadius,
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        textColor: labelComputed?.color,
        fontFamily: labelComputed?.fontFamily,
        fontSize: labelComputed?.fontSize,
        fontWeight: labelComputed?.fontWeight,
        lineHeight: labelComputed?.lineHeight,
      };
    });
    console.log("[Secondary Button Default] Computed Styles:", JSON.stringify(secStyles, null, 2));

    await secButton.screenshot({ path: path.join(screenshotsDir, "button-sec-default.png") });

    // Hover secondary button
    await page.mouse.move(secBox.x + secBox.width / 2, secBox.y + secBox.height / 2);
    await page.waitForTimeout(450);

    const secHoveredStyles = await secButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
      };
    });
    console.log("[Secondary Button Hovered] Computed Styles:", JSON.stringify(secHoveredStyles, null, 2));
    await secButton.screenshot({ path: path.join(screenshotsDir, "button-sec-hovered.png") });

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(450);

    // Capture hero button pair container screenshot
    const pairContainer = page.locator('.flex.flex-wrap.items-center.gap-4').first();
    await pairContainer.screenshot({ path: path.join(screenshotsDir, "lumivest-hero-pair.png") });
    console.log("Saved screenshot: lumivest-hero-pair.png");

    // ── Verify Lumivest Course Card ──────────────────────────────
    const card = page.locator('.group.relative.flex.flex-col.gap-4.p-4').first();
    await card.scrollIntoViewIfNeeded();

    const cardBox = await card.boundingBox();
    console.log(`[Course Card Default] Dimensions: width=${Math.round(cardBox.width)}px, height=${Math.round(cardBox.height)}px`);

    const cardStyles = await card.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const title = el.querySelector("h3");
      const titleComputed = title ? window.getComputedStyle(title) : null;
      const badge = el.querySelector(".absolute.top-\\[18px\\]");
      const badgeComputed = badge ? window.getComputedStyle(badge) : null;
      const hoverBtn = el.querySelector(".absolute.top-1\\/2.left-1\\/2");
      const hoverBtnComputed = hoverBtn ? window.getComputedStyle(hoverBtn) : null;

      return {
        cardBg: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        padding: computed.padding,
        badgeText: badge?.textContent?.trim(),
        badgeBg: badgeComputed?.backgroundColor,
        badgeRadius: badgeComputed?.borderRadius,
        title: title?.textContent?.trim(),
        titleFont: titleComputed?.fontFamily,
        titleSize: titleComputed?.fontSize,
        titleWeight: titleComputed?.fontWeight,
        hoverButtonOpacity: hoverBtnComputed?.opacity,
      };
    });

    console.log("[Course Card Default] Computed Styles:", JSON.stringify(cardStyles, null, 2));
    await card.screenshot({ path: path.join(screenshotsDir, "card-1-default.png") });

    // Hover over the card
    await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 3);
    await page.waitForTimeout(400);

    const cardHoveredStyles = await card.evaluate((el) => {
      const hoverBtn = el.querySelector(".absolute.top-1\\/2.left-1\\/2");
      const hoverBtnComputed = hoverBtn ? window.getComputedStyle(hoverBtn) : null;
      const overlay = el.querySelector(".backdrop-blur-\\[5px\\]");
      const overlayComputed = overlay ? window.getComputedStyle(overlay) : null;

      return {
        hoverButtonOpacity: hoverBtnComputed?.opacity,
        overlayOpacity: overlayComputed?.opacity,
      };
    });

    console.log("[Course Card Hovered] Computed Styles:", JSON.stringify(cardHoveredStyles, null, 2));
    await card.screenshot({ path: path.join(screenshotsDir, "card-2-hovered.png") });

    // ── Verify Main Landing Page Hero CTA Pair ────────────────────
    await page.goto(`http://localhost:${PORT}/en/landing-page/`);
    await page.waitForLoadState("networkidle");

    const heroPrimaryBtn = page.locator('a:has-text("Explore Our Brands")');
    await heroPrimaryBtn.scrollIntoViewIfNeeded();

    const heroBox = await heroPrimaryBtn.boundingBox();
    const heroHref = await heroPrimaryBtn.getAttribute("href");
    console.log(`[Landing Hero Primary Button] href="${heroHref}", width=${Math.round(heroBox.width)}px, height=${Math.round(heroBox.height)}px`);

    const heroSecondaryBtn = page.locator('a:has-text("Contact Us")').first();
    const secHeroHref = await heroSecondaryBtn.getAttribute("href");
    console.log(`[Landing Hero Secondary Button] href="${secHeroHref}"`);

    // Capture Landing Hero CTA pair default
    const heroCtaContainer = page.locator('.flex.flex-wrap.items-center.gap-4').first();
    await heroCtaContainer.screenshot({ path: path.join(screenshotsDir, "landing-hero-cta-default.png") });
    console.log("Saved screenshot: landing-hero-cta-default.png");

    // Hover Primary Button in Landing Hero
    await page.mouse.move(heroBox.x + heroBox.width / 2, heroBox.y + heroBox.height / 2);
    await page.waitForTimeout(400);

    const heroHoverStyles = await heroPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: svgComputed?.rotate,
      };
    });
    console.log("[Landing Hero Primary Hovered]:", JSON.stringify(heroHoverStyles, null, 2));

    await heroCtaContainer.screenshot({ path: path.join(screenshotsDir, "landing-hero-cta-hovered.png") });
    console.log("Saved screenshot: landing-hero-cta-hovered.png");

    // ── Verify Our Brands Section Lumivest Course Cards ───────────
    const brandsSection = page.locator('#brands');
    await brandsSection.scrollIntoViewIfNeeded();

    const brandCards = brandsSection.locator('.group.relative.flex.flex-col');
    const brandCardsCount = await brandCards.count();
    console.log(`[Landing Brands Section] Card count: ${brandCardsCount}`);

    const cardTitles = await brandCards.locator('h3').allInnerTexts();
    console.log("[Landing Brands Section] Card titles:", cardTitles);

    await brandsSection.screenshot({ path: path.join(screenshotsDir, "brands-section-cards-default.png") });
    console.log("Saved screenshot: brands-section-cards-default.png");

    // Hover first brand card (Fashion)
    const firstCard = brandCards.first();
    const firstCardBox = await firstCard.boundingBox();
    await page.mouse.move(firstCardBox.x + firstCardBox.width / 2, firstCardBox.y + firstCardBox.height / 3);
    await page.waitForTimeout(400);

    const firstCardHoverStyles = await firstCard.evaluate((el) => {
      const overlay = el.querySelector(".backdrop-blur-\\[5px\\]");
      const overlayComputed = overlay ? window.getComputedStyle(overlay) : null;
      const btnWrapper = el.querySelector(".pointer-events-auto");
      const btnComputed = btnWrapper ? window.getComputedStyle(btnWrapper) : null;
      return {
        overlayOpacity: overlayComputed?.opacity,
        buttonOpacity: btnComputed?.opacity,
      };
    });
    console.log("[Landing Brand Card Hovered]:", JSON.stringify(firstCardHoverStyles, null, 2));

    await firstCard.screenshot({ path: path.join(screenshotsDir, "brands-section-cards-hovered.png") });
    console.log("Saved screenshot: brands-section-cards-hovered.png");

    // ── Verify Why Choose Us Section Middle Alignment ─────────────
    const whyChooseUsSection = page.locator('section:has-text("Why Choose Us")');
    await whyChooseUsSection.scrollIntoViewIfNeeded();

    const pillarItems = whyChooseUsSection.locator('.grid > div');
    const pillarCount = await pillarItems.count();
    console.log(`[Why Choose Us] Pillar count: ${pillarCount}`);

    const pillarStyles = await pillarItems.first().evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const heading = el.querySelector("h3");
      const headingComputed = heading ? window.getComputedStyle(heading) : null;
      const paragraph = el.querySelector("p");
      const paragraphComputed = paragraph ? window.getComputedStyle(paragraph) : null;

      return {
        alignItems: computed.alignItems,
        headingTextAlign: headingComputed?.textAlign,
        paragraphTextAlign: paragraphComputed?.textAlign,
      };
    });
    console.log("[Why Choose Us Item Styles]:", JSON.stringify(pillarStyles, null, 2));

    await whyChooseUsSection.screenshot({ path: path.join(screenshotsDir, "why-choose-us-centered.png") });
    console.log("Saved screenshot: why-choose-us-centered.png");

    // ── Verify Landing CTA Banner ("Let's Build the Future Together") ──
    const ctaPrimaryBtn = page.locator('a:has-text("Contact Us Today")').first();
    await ctaPrimaryBtn.scrollIntoViewIfNeeded();

    const ctaBox = await ctaPrimaryBtn.boundingBox();
    const ctaHref = await ctaPrimaryBtn.getAttribute("href");
    console.log(`[Landing CTA Primary Button] href="${ctaHref}", width=${Math.round(ctaBox.width)}px, height=${Math.round(ctaBox.height)}px`);

    const ctaSecondaryBtn = page.locator('a:has-text("View Coming Soon Portal")').first();
    const secCtaHref = await ctaSecondaryBtn.getAttribute("href");
    console.log(`[Landing CTA Secondary Button] href="${secCtaHref}"`);

    // Capture CTA banner container
    const ctaBannerSection = page.locator('section:has-text("Let\'s Build the Future Together")');
    await ctaBannerSection.screenshot({ path: path.join(screenshotsDir, "cta-banner-default.png") });
    console.log("Saved screenshot: cta-banner-default.png");

    // Hover CTA Primary Button
    await page.mouse.move(ctaBox.x + ctaBox.width / 2, ctaBox.y + ctaBox.height / 2);
    await page.waitForTimeout(400);

    const ctaHoverStyles = await ctaPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: svgComputed?.rotate,
      };
    });
    console.log("[Landing CTA Primary Hovered]:", JSON.stringify(ctaHoverStyles, null, 2));

    await ctaBannerSection.screenshot({ path: path.join(screenshotsDir, "cta-banner-hovered.png") });
    console.log("Saved screenshot: cta-banner-hovered.png");

    // ── Verify Header Brand Logo/Wordmark ─────────────────────────
    const brandWordmark = page.locator('header a[href*="landing-page"]').first();
    const brandText = await brandWordmark.innerText();
    const hasAgMonogram = await brandWordmark.locator('div:has-text("AG")').count();
    console.log(`[Header Brand Identity] text="${brandText.trim()}", hasAgMonogram=${hasAgMonogram > 0}`);

    // ── Verify Header "Contact Us" Lumivest Primary Button ────────
    const headerCta = page.locator('header a:has-text("Contact Us")').first();
    const headerBox = await headerCta.boundingBox();
    console.log(`[Header Contact Us Button] width=${Math.round(headerBox.width)}px, height=${Math.round(headerBox.height)}px`);

    const headerStyles = await headerCta.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      return {
        buttonBg: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        fontSize: labelComputed?.fontSize,
        textColor: labelComputed?.color,
        fontFamily: labelComputed?.fontFamily,
      };
    });
    console.log("[Header Contact Us Default]:", JSON.stringify(headerStyles, null, 2));

    const header = page.locator('header').first();
    await header.screenshot({ path: path.join(screenshotsDir, "header-contact-desktop.png") });
    console.log("Saved screenshot: header-contact-desktop.png");

    // Hover Header CTA
    await page.mouse.move(headerBox.x + headerBox.width / 2, headerBox.y + headerBox.height / 2);
    await page.waitForTimeout(400);

    const headerHoverStyles = await headerCta.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: svgComputed?.rotate,
      };
    });
    console.log("[Header Contact Us Hovered]:", JSON.stringify(headerHoverStyles, null, 2));

    await header.screenshot({ path: path.join(screenshotsDir, "header-contact-hovered.png") });
    console.log("Saved screenshot: header-contact-hovered.png");

    // ── Verify Mobile Drawer CTA ──────────────────────────────────
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);

    const menuToggle = page.locator('header button[aria-label="Open menu"]');
    await menuToggle.click();
    await page.waitForTimeout(400);

    const mobileDrawerBtn = page.locator('header .md\\:hidden a:has-text("Contact Us")').first();
    const mobileDrawerBox = await mobileDrawerBtn.boundingBox();
    console.log(`[Mobile Drawer Contact Us Button] width=${Math.round(mobileDrawerBox.width)}px, height=${Math.round(mobileDrawerBox.height)}px`);

    const mobileDrawerHeader = page.locator('header');
    await mobileDrawerHeader.screenshot({ path: path.join(screenshotsDir, "header-contact-mobile.png") });
    console.log("Saved screenshot: header-contact-mobile.png");

    // ── Verify Brands Page Hero CTA Pair ──────────────────────────
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${PORT}/en/landing-page/brands/`);
    await page.waitForLoadState("networkidle");

    const brandsPrimaryBtn = page.locator('a:has-text("Explore Divisions")').first();
    await brandsPrimaryBtn.scrollIntoViewIfNeeded();

    const brandsBox = await brandsPrimaryBtn.boundingBox();
    const brandsHref = await brandsPrimaryBtn.getAttribute("href");
    console.log(`[Brands Hero Primary Button] href="${brandsHref}", width=${Math.round(brandsBox.width)}px, height=${Math.round(brandsBox.height)}px`);

    const brandsSecondaryBtn = page.locator('a:has-text("Contact Group")').first();
    const secBrandsHref = await brandsSecondaryBtn.getAttribute("href");
    console.log(`[Brands Hero Secondary Button] href="${secBrandsHref}"`);

    // Capture Brands Hero CTA pair default
    const brandsCtaContainer = page.locator('.flex.flex-wrap.items-center.gap-4').first();
    await brandsCtaContainer.screenshot({ path: path.join(screenshotsDir, "brands-hero-cta-default.png") });
    console.log("Saved screenshot: brands-hero-cta-default.png");

    // Hover Primary Button in Brands Hero
    await page.mouse.move(brandsBox.x + brandsBox.width / 2, brandsBox.y + brandsBox.height / 2);
    await page.waitForTimeout(400);

    const brandsHoverStyles = await brandsPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: svgComputed?.rotate,
      };
    });
    console.log("[Brands Hero Primary Hovered]:", JSON.stringify(brandsHoverStyles, null, 2));

    await brandsCtaContainer.screenshot({ path: path.join(screenshotsDir, "brands-hero-cta-hovered.png") });
    console.log("Saved screenshot: brands-hero-cta-hovered.png");

    // ── Verify Brands Page CTA Banner ("Partner With Our Brands") ──
    const brandsCtaSection = page.locator('section:has-text("Partner With Our Brands")');
    await brandsCtaSection.scrollIntoViewIfNeeded();

    const brandsCtaPrimaryBtn = brandsCtaSection.locator('a').first();
    const brandsCtaBox = await brandsCtaPrimaryBtn.boundingBox();
    const brandsCtaHref = await brandsCtaPrimaryBtn.getAttribute("href");
    console.log(`[Brands CTA Primary Button] href="${brandsCtaHref}", width=${Math.round(brandsCtaBox.width)}px, height=${Math.round(brandsCtaBox.height)}px`);

    const brandsCtaSecondaryBtn = brandsCtaSection.locator('a').nth(1);
    const brandsSecCtaHref = await brandsCtaSecondaryBtn.getAttribute("href");
    console.log(`[Brands CTA Secondary Button] href="${brandsSecCtaHref}"`);

    await brandsCtaSection.screenshot({ path: path.join(screenshotsDir, "brands-cta-banner-default.png") });
    console.log("Saved screenshot: brands-cta-banner-default.png");

    // Hover Brands CTA Primary Button
    await page.mouse.move(brandsCtaBox.x + brandsCtaBox.width / 2, brandsCtaBox.y + brandsCtaBox.height / 2);
    await page.waitForTimeout(400);

    const brandsCtaHoverStyles = await brandsCtaPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const iconSpan = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: iconComputed?.rotate,
      };
    });
    console.log("[Brands CTA Primary Hovered]:", JSON.stringify(brandsCtaHoverStyles, null, 2));

    await brandsCtaSection.screenshot({ path: path.join(screenshotsDir, "brands-cta-banner-hovered.png") });
    console.log("Saved screenshot: brands-cta-banner-hovered.png");

    // ── Verify Contact Page Hero CTA Pair ──────────────────────────
    await page.goto(`http://localhost:${PORT}/en/landing-page/contact/`);
    await page.waitForLoadState("networkidle");

    const contactPrimaryBtn = page.locator('a:has-text("Send a Message")').first();
    await contactPrimaryBtn.scrollIntoViewIfNeeded();

    const contactBox = await contactPrimaryBtn.boundingBox();
    const contactHref = await contactPrimaryBtn.getAttribute("href");
    console.log(`[Contact Hero Primary Button] href="${contactHref}", width=${Math.round(contactBox.width)}px, height=${Math.round(contactBox.height)}px`);

    const contactSecondaryBtn = page.locator('a:has-text("Call Direct Line")').first();
    const secContactHref = await contactSecondaryBtn.getAttribute("href");
    console.log(`[Contact Hero Secondary Button] href="${secContactHref}"`);

    // Capture Contact Hero CTA pair default
    const contactCtaContainer = page.locator('.flex.flex-wrap.items-center.gap-4').first();
    await contactCtaContainer.screenshot({ path: path.join(screenshotsDir, "contact-hero-cta-default.png") });
    console.log("Saved screenshot: contact-hero-cta-default.png");

    // Hover Primary Button in Contact Hero
    await page.mouse.move(contactBox.x + contactBox.width / 2, contactBox.y + contactBox.height / 2);
    await page.waitForTimeout(400);

    const contactHoverStyles = await contactPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const rotTarget = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const rotComputed = rotTarget ? window.getComputedStyle(rotTarget) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: rotComputed?.rotate,
      };
    });
    console.log("[Contact Hero Primary Hovered]:", JSON.stringify(contactHoverStyles, null, 2));

    await contactCtaContainer.screenshot({ path: path.join(screenshotsDir, "contact-hero-cta-hovered.png") });
    console.log("Saved screenshot: contact-hero-cta-hovered.png");

    // ── Verify Contact Form Submit Button ("Send Message") ─────────
    const formSubmitBtn = page.locator('#contact-form form button[type="submit"]').first();
    await formSubmitBtn.scrollIntoViewIfNeeded();

    const formBtnBox = await formSubmitBtn.boundingBox();
    console.log(`[Contact Form Submit Button] width=${Math.round(formBtnBox.width)}px, height=${Math.round(formBtnBox.height)}px`);

    const formBtnDefaultStyles = await formSubmitBtn.evaluate((el) => {
      const iconWrapper = el.querySelector("span:nth-child(3)");
      const iconWrapperComputed = iconWrapper ? window.getComputedStyle(iconWrapper) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      return {
        iconBg: iconWrapperComputed?.backgroundColor,
        iconColor: svgComputed?.color,
        expanderTransform: expanderComputed?.transform,
      };
    });
    console.log("[Contact Form Submit Default Styles]:", JSON.stringify(formBtnDefaultStyles, null, 2));

    await formSubmitBtn.screenshot({ path: path.join(screenshotsDir, "contact-form-submit-default.png") });
    console.log("Saved screenshot: contact-form-submit-default.png");

    // Hover Contact Form Submit Button
    await page.mouse.move(formBtnBox.x + formBtnBox.width / 2, formBtnBox.y + formBtnBox.height / 2);
    await page.waitForTimeout(400);

    const formBtnHoverStyles = await formSubmitBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const iconSpan = el.querySelector("span:nth-child(3) > span");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        iconRotate: iconComputed?.rotate,
      };
    });
    console.log("[Contact Form Submit Hovered]:", JSON.stringify(formBtnHoverStyles, null, 2));

    await formSubmitBtn.screenshot({ path: path.join(screenshotsDir, "contact-form-submit-hovered.png") });
    console.log("Saved screenshot: contact-form-submit-hovered.png");

    // ── Verify About Page CTA ("Connect With Our Team") ───────────
    await page.goto(`http://localhost:${PORT}/en/landing-page/about/`);
    await page.waitForLoadState("networkidle");

    // Verify "Our Core Values" section middle alignment
    const coreValuesSection = page.locator('section:has-text("Our Core Values")');
    await coreValuesSection.scrollIntoViewIfNeeded();

    const aboutPillars = coreValuesSection.locator('.grid > div');
    const aboutPillarCount = await aboutPillars.count();
    console.log(`[About Core Values] Pillar count: ${aboutPillarCount}`);

    const aboutPillarStyles = await aboutPillars.first().evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const heading = el.querySelector("h3");
      const headingComputed = heading ? window.getComputedStyle(heading) : null;
      const paragraph = el.querySelector("p");
      const paragraphComputed = paragraph ? window.getComputedStyle(paragraph) : null;

      return {
        alignItems: computed.alignItems,
        headingTextAlign: headingComputed?.textAlign,
        paragraphTextAlign: paragraphComputed?.textAlign,
      };
    });
    console.log("[About Core Values Item Styles]:", JSON.stringify(aboutPillarStyles, null, 2));

    await coreValuesSection.screenshot({ path: path.join(screenshotsDir, "about-core-values-centered.png") });
    console.log("Saved screenshot: about-core-values-centered.png");

    const aboutPrimaryBtn = page.locator('a:has-text("Connect With Our Team")').first();
    await aboutPrimaryBtn.scrollIntoViewIfNeeded({ timeout: 10000 });
    const aboutBox = await aboutPrimaryBtn.boundingBox();
    const aboutHref = await aboutPrimaryBtn.getAttribute("href");
    console.log(`[About Page Primary Button] href="${aboutHref}", width=${Math.round(aboutBox.width)}px, height=${Math.round(aboutBox.height)}px`);

    await aboutPrimaryBtn.screenshot({ path: path.join(screenshotsDir, "about-team-cta-default.png") });
    console.log("Saved screenshot: about-team-cta-default.png");

    // Hover About Primary Button
    await page.mouse.move(aboutBox.x + aboutBox.width / 2, aboutBox.y + aboutBox.height / 2);
    await page.waitForTimeout(400);

    const aboutHoverStyles = await aboutPrimaryBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const iconSpan = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderScale: expanderComputed?.scale,
        arrowRotate: iconComputed?.rotate,
      };
    });
    console.log("[About Page Primary Hovered]:", JSON.stringify(aboutHoverStyles, null, 2));

    await aboutPrimaryBtn.screenshot({ path: path.join(screenshotsDir, "about-team-cta-hovered.png") });
    console.log("Saved screenshot: about-team-cta-hovered.png");

    await browser.close();
    server.close();
    console.log("All verifications completed successfully!");
  } catch (err) {
    console.error("Verification error:", err);
    server.close();
    process.exit(1);
  }
});
