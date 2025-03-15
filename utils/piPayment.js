export const startPiPayment = async (amount) => {
    try {
        const response = await fetch("/api/pi-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Payment error:", error);
        return { success: false };
    }
};
