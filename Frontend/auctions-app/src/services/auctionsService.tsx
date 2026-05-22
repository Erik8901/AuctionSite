const API = "http://localhost:5153/api/auction";

export async function allAuctions() {
    const response = await fetch(
        `${API}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (!response.ok) {
        throw new Error("Failed to fetch auctions");
    }

    return response.json();

}