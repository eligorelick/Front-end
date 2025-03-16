let Pi;

const initializePi = () => {
    if (typeof window !== "undefined" && window.Pi) {
        Pi = window.Pi;
        Pi.init({ version: "2.0", sandbox: false }); // Mainnet ready
    } else {
        console.error("❌ Pi SDK not loaded correctly.");
    }
};

export const authenticateWithPi = async () => {
    if (typeof window === "undefined") {
        console.error("❌ Non-browser environment detected.");
        return null;
    }

    if (!Pi) initializePi();

    if (!Pi) {
        console.error("❌ Pi SDK initialization failed.");
        return null;
    }

    try {
        const scopes = ["username", "payments"];
        const user = await Pi.authenticate(scopes);
        console.log("✅ Authenticated Pi user:", user);
        return user;
    } catch (error) {
        console.error("❌ Pi Authentication error:", error);
        return null;
    }
};
