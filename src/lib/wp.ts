const BASE_URL = "https://wp.jfunki.com/wp-json/wp/v2";

// 1. Your existing Swiss-Army-Knife function
export async function getData(endpoint: string, queryParams: string = "") {
    const formattedParams = queryParams ? `&${queryParams}` : "";
    const url = `${BASE_URL}/${endpoint}?_embed${formattedParams}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
}

// 2. Specialized function for single projects
export async function getProjectBySlug(slug: string) {
    const data = await getData("project", `slug=${slug}`);
    // Return the first item in the array, or null if it's empty
    // single item pattern fetching is for single subpages (projects in this case)
    return data.length > 0 ? data[0] : null;
}

// 3. Specialized function for pages
export async function getPageBySlug(slug: string) {
    const data = await getData("pages", `slug=${slug}`);
    // Return the first item in the array, or null if empty
    return data.length > 0 ? data[0] : null;
}

// 4. Specialized function for life updates
export async function getLifeUpdates() {
   // return entire array since we want to have all images/icons/captions ready at once
   return await getData("life-updates");
}

// 5. Specialized function for global settings proxy page
// 5. A specialized function for global settings proxy page
export async function getGlobalSettings() {
    try {
        // 💡 ISOLATE THIS FETCH: Use a distinct caching lifecycle (1 hour)
        // This stops it from causing a race condition with your page-level queries!
        const res = await fetch(`${BASE_URL}/pages?slug=global-settings`, {
            next: { revalidate: 3600 } // Cache global settings for an hour
        });

        if (!res.ok) throw new Error("Failed to fetch global settings layout node");
        
        const data = await res.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Failed to query global headless metadata configuration:", error);
        return null;
    }
}