import type { Seat } from '~/models/seat.model';

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

export async function createSeat(seat: Seat) {
    var response = await fetch("/api/v1/seats", {
        body: JSON.stringify(seat),
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error("Error al crear butaca")
    }
}