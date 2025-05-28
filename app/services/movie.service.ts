import wfetch from "~/wfetch";

export async function getAllMovies() {
    const response = await wfetch("/api/v1/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener las películas");
    }

    const data = await response.json();
    return data;
}