const API = "http://localhost:5153/api/auth";

export async function register(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API}/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return response.json();
}

export async function login(
    email: string,
    password: string
) {
    const response = await fetch(
        "http://localhost:5153/api/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    return response.json();
}