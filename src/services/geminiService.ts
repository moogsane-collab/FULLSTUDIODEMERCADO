/**
 * geminiService.ts
 *
 * All Gemini calls go through the /api/gemini serverless proxy.
 * The GEMINI_API_KEY never leaves the server — it is NOT bundled
 * into the frontend build.
 */

export async function generateMarketReport(query: string) {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.json();
}
