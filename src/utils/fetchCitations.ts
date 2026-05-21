let cachedCitations: number | null = null;

export async function getCitationCount(): Promise<number> {
  if (cachedCitations !== null) {
    return cachedCitations;
  }

  const apiKey = import.meta.env.SERPAPI_KEY;
  const scholarId = "on-f0-IAAAAJ";
  
  if (!apiKey) {
    console.warn("SERPAPI_KEY is not defined. Using fallback citation count.");
    cachedCitations = 120;
    return cachedCitations;
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${scholarId}&api_key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch citations from SerpApi");
    }
    const data = await res.json();
    cachedCitations = data.author?.cited_by ?? 120;
    return cachedCitations!;
  } catch (e) {
    console.error("Error fetching citations:", e);
    cachedCitations = 120; // fallback
    return cachedCitations;
  }
}
