export const dynamic = "force-static";

const BASE_URL = "https://wzyns.github.io";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
