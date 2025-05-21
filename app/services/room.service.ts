export async function getAllSeats() {
    var response = await fetch("/api/v1/seats", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    var data = await response.json();
    if (!response.ok) {
        throw new Error("Error al obtener las butacas");
    }
    return data;
}

export async function getAllRooms() {
    var response = await fetch("/api/v1/rooms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    var data = await response.json();
    if (!response.ok) {
        throw new Error("Error al obtener las salas");
    }
    return data;
}