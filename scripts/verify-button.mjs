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

    // ── Verify Lumivest Interactive Secondary Button Variants ────────
    console.log("\n── Verifying Lumivest Interactive Secondary Buttons ──");

    // 1. Expand Variant
    const expandBtn = page.locator('a[href="#interactive-expand"]');
    await expandBtn.scrollIntoViewIfNeeded();
    const expandBox = await expandBtn.boundingBox();
    console.log(`[Interactive Expand Button] Dimensions: width=${Math.round(expandBox.width)}px, height=${Math.round(expandBox.height)}px`);

    const expandDefaultStyles = await expandBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        expanderBg: expanderComputed?.backgroundColor,
        expanderScale: expanderComputed?.scale || expanderComputed?.transform,
      };
    });
    console.log("[Interactive Expand Default Styles]:", JSON.stringify(expandDefaultStyles, null, 2));
    await expandBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-expand-default.png") });

    // Hover Expand
    await page.mouse.move(expandBox.x + expandBox.width / 2, expandBox.y + expandBox.height / 2);
    await page.waitForTimeout(450);

    const expandHoverStyles = await expandBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      const iconSpan = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        expanderBg: expanderComputed?.backgroundColor,
        expanderScale: expanderComputed?.scale || expanderComputed?.transform,
        arrowRotate: iconComputed?.rotate || iconComputed?.transform,
      };
    });
    console.log("[Interactive Expand Hovered Styles]:", JSON.stringify(expandHoverStyles, null, 2));
    await expandBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-expand-hovered.png") });

    // Unhover Expand
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 2. Invert Variant
    const invertBtn = page.locator('a[href="#interactive-invert"]');
    await invertBtn.scrollIntoViewIfNeeded();
    const invertBox = await invertBtn.boundingBox();
    console.log(`[Interactive Invert Button] Dimensions: width=${Math.round(invertBox.width)}px, height=${Math.round(invertBox.height)}px`);

    const invertDefaultStyles = await invertBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        expanderBg: expanderComputed?.backgroundColor,
      };
    });
    console.log("[Interactive Invert Default Styles]:", JSON.stringify(invertDefaultStyles, null, 2));
    await invertBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-invert-default.png") });

    // Hover Invert
    await page.mouse.move(invertBox.x + invertBox.width / 2, invertBox.y + invertBox.height / 2);
    await page.waitForTimeout(450);

    const invertHoverStyles = await invertBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      const iconSpan = el.querySelector("span:nth-child(3) > span") || el.querySelector("svg");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        expanderBg: expanderComputed?.backgroundColor,
        arrowRotate: iconComputed?.rotate || iconComputed?.transform,
      };
    });
    console.log("[Interactive Invert Hovered Styles]:", JSON.stringify(invertHoverStyles, null, 2));
    await invertBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-invert-hovered.png") });

    // Unhover Invert
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 3. Slide Variant
    const slideBtn = page.locator('a[href="#interactive-slide"]');
    await slideBtn.scrollIntoViewIfNeeded();
    const slideBox = await slideBtn.boundingBox();
    console.log(`[Interactive Slide Button] Dimensions: width=${Math.round(slideBox.width)}px, height=${Math.round(slideBox.height)}px`);

    const slideDefaultStyles = await slideBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const iconContainer = el.querySelector("span:nth-child(2)") || el.querySelector("svg");
      const iconContainerComputed = iconContainer ? window.getComputedStyle(iconContainer) : null;
      return {
        buttonBg: computed.backgroundColor,
        iconTransform: iconContainerComputed?.transform,
      };
    });
    console.log("[Interactive Slide Default Styles]:", JSON.stringify(slideDefaultStyles, null, 2));
    await slideBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-slide-default.png") });

    // Hover Slide
    await page.mouse.move(slideBox.x + slideBox.width / 2, slideBox.y + slideBox.height / 2);
    await page.waitForTimeout(450);

    const slideHoverStyles = await slideBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const iconContainer = el.querySelector("span:nth-child(2)") || el.querySelector("svg");
      const iconContainerComputed = iconContainer ? window.getComputedStyle(iconContainer) : null;
      return {
        buttonBg: computed.backgroundColor,
        iconTransform: iconContainerComputed?.transform,
      };
    });
    console.log("[Interactive Slide Hovered Styles]:", JSON.stringify(slideHoverStyles, null, 2));
    await slideBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-slide-hovered.png") });

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 4. Outline Fill Variant (with prominent border)
    const outlineBtn = page.locator('a[href="#interactive-outline-fill"]');
    await outlineBtn.scrollIntoViewIfNeeded();
    const outlineBox = await outlineBtn.boundingBox();
    console.log(`[Interactive Outline-Fill Button] Dimensions: width=${Math.round(outlineBox.width)}px, height=${Math.round(outlineBox.height)}px`);

    const outlineDefaultStyles = await outlineBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        textColor: labelComputed?.color,
      };
    });
    console.log("[Interactive Outline-Fill Default Styles]:", JSON.stringify(outlineDefaultStyles, null, 2));
    await outlineBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-outline-fill-default.png") });

    // Hover Outline Fill
    await page.mouse.move(outlineBox.x + outlineBox.width / 2, outlineBox.y + outlineBox.height / 2);
    await page.waitForTimeout(450);

    const outlineHoverStyles = await outlineBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        expanderScale: expanderComputed?.scale || expanderComputed?.transform,
      };
    });
    console.log("[Interactive Outline-Fill Hovered Styles]:", JSON.stringify(outlineHoverStyles, null, 2));
    await outlineBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-outline-fill-hovered.png") });

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 5. Elevate Shadow Variant (with borderless 'none')
    const elevateBtn = page.locator('a[href="#interactive-elevate"]');
    await elevateBtn.scrollIntoViewIfNeeded();
    const elevateBox = await elevateBtn.boundingBox();
    console.log(`[Interactive Elevate Button] Dimensions: width=${Math.round(elevateBox.width)}px, height=${Math.round(elevateBox.height)}px`);

    const elevateDefaultStyles = await elevateBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        transform: computed.transform,
      };
    });
    console.log("[Interactive Elevate Default Styles]:", JSON.stringify(elevateDefaultStyles, null, 2));
    await elevateBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-elevate-default.png") });

    // Hover Elevate
    await page.mouse.move(elevateBox.x + elevateBox.width / 2, elevateBox.y + elevateBox.height / 2);
    await page.waitForTimeout(450);

    const elevateHoverStyles = await elevateBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        transform: computed.transform,
      };
    });
    console.log("[Interactive Elevate Hovered Styles]:", JSON.stringify(elevateHoverStyles, null, 2));
    await elevateBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-elevate-hovered.png") });

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 6. Border Glow Variant (with accent gold border)
    const glowBtn = page.locator('a[href="#interactive-border-glow"]');
    await glowBtn.scrollIntoViewIfNeeded();
    const glowBox = await glowBtn.boundingBox();
    console.log(`[Interactive Border-Glow Button] Dimensions: width=${Math.round(glowBox.width)}px, height=${Math.round(glowBox.height)}px`);

    const glowDefaultStyles = await glowBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
      };
    });
    console.log("[Interactive Border-Glow Default Styles]:", JSON.stringify(glowDefaultStyles, null, 2));
    await glowBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-border-glow-default.png") });

    // Hover Glow
    await page.mouse.move(glowBox.x + glowBox.width / 2, glowBox.y + glowBox.height / 2);
    await page.waitForTimeout(450);

    const glowHoverStyles = await glowBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        buttonBg: computed.backgroundColor,
        boxShadow: computed.boxShadow,
      };
    });
    console.log("[Interactive Border-Glow Hovered Styles]:", JSON.stringify(glowHoverStyles, null, 2));
    await glowBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-border-glow-hovered.png") });

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 7. Verify Live Configurator
    const configBtn = page.locator('a[href="#interactive-configurator"]');
    await configBtn.scrollIntoViewIfNeeded();
    await configBtn.screenshot({ path: path.join(screenshotsDir, "interactive-sec-btn-configurator.png") });
    console.log("Saved screenshot: interactive-sec-btn-configurator.png");

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

    // ── Verify Main Landing Page Hero CTA Pair & Animations ─────
    await page.goto(`http://localhost:${PORT}/en/landing-page/`);
    await page.waitForLoadState("networkidle");

    const heroAnimationInfo = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const badge = document.querySelector("section .inline-flex.items-center");
      const floatingCard = document.querySelector("section .bg-white\\/90");
      const bgImg = document.querySelector("section img");

      return {
        h1HasAnimation: h1?.className.includes("animate-hero-fade-in-up"),
        badgeHasAnimation: badge?.parentElement?.className.includes("animate-hero-fade-in-up"),
        floatingCardHasFloat: floatingCard?.className.includes("animate-ambient-float"),
        bgImgHasAnimation: bgImg?.className.includes("heroImageSettle"),
      };
    });
    console.log("[Landing Hero Animation Verification]:", JSON.stringify(heroAnimationInfo, null, 2));

    await page.screenshot({ path: path.join(screenshotsDir, "hero-animated-loaded.png"), clip: { x: 0, y: 0, width: 1280, height: 750 } });
    console.log("Saved screenshot: hero-animated-loaded.png");

    const floatingCardEl = page.locator("section .bg-white\\/90").first();
    const floatingCardBox = await floatingCardEl.boundingBox();
    if (floatingCardBox) {
      await page.mouse.move(floatingCardBox.x + 40, floatingCardBox.y + 40);
      await page.waitForTimeout(300);
      const floatCardTilt = await floatingCardEl.evaluate((el) => {
        const perspectiveEl = el.closest(".relative");
        return perspectiveEl ? window.getComputedStyle(perspectiveEl).transform : null;
      });
      console.log("[Hero Floating Card 3D Tilt]:", floatCardTilt);
      await page.screenshot({
        path: path.join(screenshotsDir, "hero-floating-card-3d-tilt.png"),
        clip: {
          x: Math.max(0, Math.round(floatingCardBox.x) - 10),
          y: Math.max(0, Math.round(floatingCardBox.y) - 10),
          width: Math.round(floatingCardBox.width) + 20,
          height: Math.round(floatingCardBox.height) + 20,
        },
      });
      console.log("Saved screenshot: hero-floating-card-3d-tilt.png");
    }

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
    await brandsSection.screenshot({ path: path.join(screenshotsDir, "brands-animated-scrolled.png") });
    console.log("Saved screenshot: brands-section-cards-default.png and brands-animated-scrolled.png");

    // Hover first brand card (Fashion) to verify 3D tilt & focal dimming
    const firstCard = brandCards.first();
    const firstCardBox = await firstCard.boundingBox();
    await page.mouse.move(firstCardBox.x + firstCardBox.width * 0.8, firstCardBox.y + firstCardBox.height * 0.2);
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

    const focalShiftStyles = await brandsSection.evaluate((el) => {
      const cardContainers = el.querySelectorAll(".grid > div");
      const card1 = cardContainers[0];
      const card2 = cardContainers[1];
      const card3 = cardContainers[2];

      const card1Computed = card1 ? window.getComputedStyle(card1) : null;
      const card2Computed = card2 ? window.getComputedStyle(card2) : null;
      const card3Computed = card3 ? window.getComputedStyle(card3) : null;

      const tiltEl = card1?.querySelector(".relative");
      const tiltComputed = tiltEl ? window.getComputedStyle(tiltEl) : null;

      return {
        card1Opacity: card1Computed?.opacity,
        card1Transform: card1Computed?.transform,
        card2Opacity: card2Computed?.opacity,
        card3Opacity: card3Computed?.opacity,
        card1TiltTransform: tiltComputed?.transform,
      };
    });
    console.log("[Brands Focal Hierarchy Shift]:", JSON.stringify(focalShiftStyles, null, 2));

    await brandsSection.screenshot({ path: path.join(screenshotsDir, "brands-focal-shift-hovered.png") });
    await firstCard.screenshot({ path: path.join(screenshotsDir, "brands-section-cards-hovered.png") });
    console.log("Saved screenshots: brands-focal-shift-hovered.png and brands-section-cards-hovered.png");

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
    await whyChooseUsSection.screenshot({ path: path.join(screenshotsDir, "values-animated-scrolled.png") });
    console.log("Saved screenshot: why-choose-us-centered.png and values-animated-scrolled.png");

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

    // ── Verify Three Brand Showcase "View Brand Details" Buttons ───
    console.log("\n── Verifying Three Brand Showcase Lumivest Secondary Buttons ──");

    // 1. Fashion Brand CTA
    const fashionBtn = page.locator('a[href*="/landing-page/brands/fashion"]:has-text("View Brand Details")');
    await fashionBtn.scrollIntoViewIfNeeded();
    const fashionBox = await fashionBtn.boundingBox();
    console.log(`[Fashion Brand CTA Default] Dimensions: width=${Math.round(fashionBox.width)}px, height=${Math.round(fashionBox.height)}px`);

    const fashionDefaultStyles = await fashionBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const iconContainer = el.querySelector("span:nth-child(3)");
      const iconContainerComputed = iconContainer ? window.getComputedStyle(iconContainer) : null;
      const hasRoundBadge = iconContainer ? iconContainer.classList.contains("rounded-full") : false;
      return {
        buttonBg: computed.backgroundColor,
        textColor: labelComputed?.color,
        fontSize: labelComputed?.fontSize,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        boxShadow: computed.boxShadow,
        hasRoundBadge,
        expanderBg: expanderComputed?.backgroundColor,
        expanderScale: expanderComputed?.scale || expanderComputed?.transform,
        iconBg: iconContainerComputed?.backgroundColor,
      };
    });
    console.log("[Fashion Brand CTA Default Styles]:", JSON.stringify(fashionDefaultStyles, null, 2));
    await fashionBtn.screenshot({ path: path.join(screenshotsDir, "brands-fashion-cta-default.png") });
    console.log("Saved screenshot: brands-fashion-cta-default.png");

    // Hover Fashion Brand CTA
    await page.mouse.move(fashionBox.x + fashionBox.width / 2, fashionBox.y + fashionBox.height / 2);
    await page.waitForTimeout(450);

    const fashionHoverStyles = await fashionBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;
      const iconContainer = el.querySelector("span:nth-child(3)");
      const iconContainerComputed = iconContainer ? window.getComputedStyle(iconContainer) : null;
      const iconInner = iconContainer ? iconContainer.querySelector("span") : null;
      const iconInnerComputed = iconInner ? window.getComputedStyle(iconInner) : null;
      return {
        buttonBg: computed.backgroundColor,
        expanderBg: expanderComputed?.backgroundColor,
        expanderScale: expanderComputed?.scale || expanderComputed?.transform,
        boxShadow: computed.boxShadow,
        iconSlideTranslate: iconContainerComputed?.translate || iconContainerComputed?.transform,
        arrowRotate: iconInnerComputed?.rotate || iconInnerComputed?.transform,
      };
    });
    console.log("[Fashion Brand CTA Hovered Styles]:", JSON.stringify(fashionHoverStyles, null, 2));
    await fashionBtn.screenshot({ path: path.join(screenshotsDir, "brands-fashion-cta-hovered.png") });
    console.log("Saved screenshot: brands-fashion-cta-hovered.png");

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // 2. Travel Brand CTA
    const travelBtn = page.locator('a[href*="/landing-page/brands/artful-travel"]:has-text("View Brand Details")');
    await travelBtn.scrollIntoViewIfNeeded();
    await travelBtn.screenshot({ path: path.join(screenshotsDir, "brands-travel-cta-default.png") });
    console.log("Saved screenshot: brands-travel-cta-default.png");

    // 3. Agro Brand CTA
    const agroBtn = page.locator('a[href*="/landing-page/brands/agro"]:has-text("View Brand Details")');
    await agroBtn.scrollIntoViewIfNeeded();
    await agroBtn.screenshot({ path: path.join(screenshotsDir, "brands-agro-cta-default.png") });
    console.log("Saved screenshot: brands-agro-cta-default.png");

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

    // ── Verify Connect With Us Social Buttons (Springy Pop & Lift) ───
    const connectSection = page.locator('div:has(> h4:text-is("Connect With Us"))');
    await connectSection.scrollIntoViewIfNeeded();

    const socialGrid = connectSection.locator('.grid');
    const socialButtons = socialGrid.locator('a');
    const socialCount = await socialButtons.count();
    console.log(`[Contact Social Buttons] Found ${socialCount} social buttons`);

    // Verify Facebook button default state
    const fbBtn = socialButtons.first();
    const fbBox = await fbBtn.boundingBox();
    console.log(`[Contact Social FB Default] width=${Math.round(fbBox.width)}px, height=${Math.round(fbBox.height)}px`);

    const fbDefaultStyles = await fbBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const iconSpan = el.querySelector("span:nth-child(3)");
      const iconComputed = iconSpan ? window.getComputedStyle(iconSpan) : null;
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;

      return {
        buttonBg: computed.backgroundColor,
        borderRadius: computed.borderRadius,
        ringWidth: computed.boxShadow,
        labelColor: labelComputed?.color,
        iconColor: svgComputed?.color,
        iconTransform: iconComputed?.transform,
      };
    });
    console.log("[Contact Social FB Default Styles]:", JSON.stringify(fbDefaultStyles, null, 2));

    await connectSection.screenshot({ path: path.join(screenshotsDir, "contact-social-buttons-default.png") });
    console.log("Saved screenshot: contact-social-buttons-default.png");

    // Hover over Facebook button
    await page.mouse.move(fbBox.x + fbBox.width / 2, fbBox.y + fbBox.height / 2);
    await page.waitForTimeout(400);

    const fbHoverStyles = await fbBtn.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const label = el.querySelector("span:nth-child(2)");
      const labelComputed = label ? window.getComputedStyle(label) : null;
      const innerIconSpan = el.querySelector("span:nth-child(3) > span");
      const innerIconComputed = innerIconSpan ? window.getComputedStyle(innerIconSpan) : null;
      const svg = el.querySelector("svg");
      const svgComputed = svg ? window.getComputedStyle(svg) : null;
      const expander = el.querySelector("span:nth-child(1)");
      const expanderComputed = expander ? window.getComputedStyle(expander) : null;

      return {
        buttonBg: computed.backgroundColor,
        labelColor: labelComputed?.color,
        iconColor: svgComputed?.color,
        innerIconTransform: innerIconComputed?.transform,
        innerIconScale: innerIconComputed?.scale,
        innerIconTranslate: innerIconComputed?.translate,
        expanderScale: expanderComputed?.scale,
        expanderTransform: expanderComputed?.transform,
      };
    });
    console.log("[Contact Social FB Hovered Styles]:", JSON.stringify(fbHoverStyles, null, 2));

    await connectSection.screenshot({ path: path.join(screenshotsDir, "contact-social-facebook-hovered.png") });
    console.log("Saved screenshot: contact-social-facebook-hovered.png");

    // Move mouse away to reset hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // ── Verify About Page Animations & 3D Focal Grid ─────────────
    await page.goto(`http://localhost:${PORT}/en/landing-page/about/`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({ path: path.join(screenshotsDir, "about-hero-animated-loaded.png"), clip: { x: 0, y: 0, width: 1280, height: 750 } });
    console.log("Saved screenshot: about-hero-animated-loaded.png");

    // Verify Heritage Section Scroll Reveal & 3D MediaSlot
    const heritageSection = page.locator('section:has-text("Our Heritage")');
    await heritageSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await heritageSection.screenshot({ path: path.join(screenshotsDir, "about-heritage-animated-scrolled.png") });
    console.log("Saved screenshot: about-heritage-animated-scrolled.png");

    // Verify Mission & Vision Section 3D Tilt & Focal Dimming
    const purposeSection = page.locator('section:has-text("Our Guiding Purpose")');
    await purposeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const missionCard = purposeSection.locator('.grid > div').first();
    const missionBox = await missionCard.boundingBox();
    if (missionBox) {
      await page.mouse.move(missionBox.x + missionBox.width * 0.8, missionBox.y + missionBox.height * 0.2);
      await page.waitForTimeout(400);
    }

    const purposeFocalStyles = await purposeSection.evaluate((el) => {
      const cards = el.querySelectorAll(".grid > div");
      const card1 = cards[0];
      const card2 = cards[1];
      const tiltEl = card1?.querySelector(".relative");
      return {
        missionOpacity: card1 ? window.getComputedStyle(card1).opacity : null,
        visionOpacity: card2 ? window.getComputedStyle(card2).opacity : null,
        missionTilt: tiltEl ? window.getComputedStyle(tiltEl).transform : null,
      };
    });
    console.log("[About Purpose Focal Shift]:", JSON.stringify(purposeFocalStyles, null, 2));

    await purposeSection.screenshot({ path: path.join(screenshotsDir, "about-mission-vision-focal-hovered.png") });
    console.log("Saved screenshot: about-mission-vision-focal-hovered.png");

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

    const leadershipSection = page.locator('section:has-text("Our Leadership & Commitment")');
    await leadershipSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await leadershipSection.screenshot({ path: path.join(screenshotsDir, "about-leadership-animated-scrolled.png") });
    console.log("Saved screenshot: about-leadership-animated-scrolled.png");

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
