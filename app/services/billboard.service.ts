import type { Billboard } from "~/model/billboard.model";

export async function getBillboardToday() {
    var response = await fetch("/api/v1/billboards/today", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    var data = await response.json();
    if (!response.ok) {
        throw new Error("Error fetching billboard data");
    }
    return data;
}

export async function createBooking(booking: any) {
    var response = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        throw new Error("Error creating booking");
    }
}

export async function getAllBookingsToday() {
    var response = await fetch("/api/v1/bookings/today", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    var data = await response.json();
    if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching bookings data:", error);
        throw new Error(error.toString());
    }
    return data;
}

export async function deleteBooking(id: number) {
    var response = await fetch(`/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error deleting booking:", error);
        throw new Error(error.toString());
    }
}

export async function getAllBillboards() {
    var response = await fetch("/api/v1/billboards", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    var data = await response.json();
    if (!response.ok) {
        throw new Error("Error fetching all billboards");
    }
    return data;
}

export async function createBillboard(billboard: Billboard) {
    var response = await fetch("/api/v1/billboards" + ((billboard.id) ? `/${billboard.id}` : ''), {
        method: (billboard.id) ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(billboard),
    });

    if (!response.ok) {
        throw new Error("Error creating billboard");
    }
}