const API = "http://localhost:5153/api";

export async function allAuctions() {
    const response = await fetch(
        `${API}`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

            })
        }
    );
    console.log(response.json())
    return response.json();

}

