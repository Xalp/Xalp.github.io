export interface ScholarArticle {
  title: string;
  link: string;
  citation_id: string;
  authors: string;
  publication: string;
  cited_by: { value: number; link: string };
  year: string;
}

export interface ScholarData {
  citations: number;
  articles: ScholarArticle[];
}

let cachedScholarData: ScholarData | null = null;

export async function getCitationCount(): Promise<number> {
  const data = await getScholarData();
  return data.citations;
}

export async function getScholarData(): Promise<ScholarData> {
  if (cachedScholarData !== null) {
    return cachedScholarData;
  }

  const apiKey = import.meta.env.SERPAPI_KEY || process.env.SERPAPI_KEY;
  const scholarId = "on-f0-IAAAAJ";
  
  if (!apiKey) {
    console.warn("SERPAPI_KEY is not defined. Using fallback scholar data.");
    cachedScholarData = { citations: 120, articles: [] };
    return cachedScholarData;
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${scholarId}&api_key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch citations from SerpApi");
    }
    const data = await res.json();
    const articles = data.articles ?? [];
    articles.sort((a: any, b: any) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });

    cachedScholarData = {
      citations: data.cited_by?.table?.citations?.all ?? 120,
      articles: articles,
    };
    return cachedScholarData;
  } catch (e) {
    console.error("Error fetching citations:", e);
    cachedScholarData = { citations: 120, articles: [] }; // fallback
    return cachedScholarData;
  }
}
