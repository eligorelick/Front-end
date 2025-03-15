let Pi;

const initializePi = () => {
    if (typeof window !== "undefined" && window.Pi) {
        Pi = window.Pi;
        if (!Pi.isInitialized()) {
            Pi.init({ version: "2.0", sandbox: true }); // ✅ Ensure sandbox mode is enabled
        }
    } else {
        console.error("❌ Pi SDK is not loaded. Make sure to include it correctly.");
    }
};

export const authenticateWithPi = async () => {
    if (typeof window === "undefined") {
        console.error("❌ Pi authentication called in a non-browser environment.");
        return null;
    }

    if (!Pi) initializePi();

    if (!Pi) {
        console.error("❌ Pi SDK is missing. Make sure it's loaded in '_document.js'.");
        return null;
    }

    if (!Pi.isInitialized()) {
        console.error("❌ Pi SDK is not initialized.");
        return null;
    }

    try {
        const scopes = ["username", "payments"];
        const user = await Pi.authenticate(scopes);
        console.log("✅ Authenticated user:", user);
        return user;
    } catch (error) {
        console.error("❌ Pi Authentication Failed:", error.message || error);
        return null;
    }
};
