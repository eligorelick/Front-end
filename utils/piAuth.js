let Pi;

const initializePi = () => {
    if (typeof window !== "undefined" && window.Pi) {
        Pi = window.Pi;
        Pi.init({ version: "2.0", sandbox: true }); // ✅ Pi SDK initialized in sandbox mode
    } else {
        console.error("❌ Pi SDK not loaded. Include Pi SDK script correctly.");
    }
};

export const authenticateWithPi = async () => {
    if (typeof window === "undefined") {
        console.error("❌ Pi authentication called in non-browser environment.");
        return null;
    }

    if (!Pi) initializePi();

    if (!Pi) {
        console.error("❌ Pi SDK is missing after initialization attempt.");
        return null;
    }

    try {
        const scopes = ["username", "payments"];
        const user = await Pi.authenticate(scopes);
        console.log("✅ Authenticated Pi user:", user);
        return user;
    } catch (error) {
        console.error("❌ Pi Authentication Failed:", error.message || error);
        return null;
    }
};
