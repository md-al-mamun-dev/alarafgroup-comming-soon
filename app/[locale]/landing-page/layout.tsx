

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* On-the-fly Clarity City CDN font import (Zero local package installation) */}
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/combine/npm/@fontsource/clarity-city@5.3.1/400.css,npm/@fontsource/clarity-city@5.3.1/500.css,npm/@fontsource/clarity-city@5.3.1/600.css,npm/@fontsource/clarity-city@5.3.1/700.css,npm/@fontsource/clarity-city@5.3.1/800.css"
      />
      <div className="landing-scope min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}

