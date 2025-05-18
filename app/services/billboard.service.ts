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