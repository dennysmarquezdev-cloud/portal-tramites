export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page: string;
}

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export async function searchPexels(query: string, orientation: "landscape" | "portrait" | "square" = "landscape", perPage: number = 10, page: number = 1): Promise<PexelsPhoto[]> {
  if (!PEXELS_API_KEY) {
    console.error("Pexels API key not found");
    return [];
  }

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });

    if (!res.ok) {
      throw new Error("Pexels API Error: " + res.status);
    }

    const data: PexelsResponse = await res.json();
    return data.photos;
  } catch (err) {
    console.error(err);
    return [];
  }
}

