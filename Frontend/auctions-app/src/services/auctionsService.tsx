const API = "http://localhost:5153/api/auction";

export async function allAuctions() {
    try {
        const response = await fetch("http://localhost:5153/api/auction", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Backend error:", text);
            throw new Error("Failed to fetch auctions");
        }

        return await response.json();
    } catch (err) {
        console.error("Fetch failed:", err);
        throw err;
    }
}

