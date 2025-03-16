let Pi;

const initializePi = () => {
    if (typeof window !== "undefined" && window.Pi) {
        Pi = window.Pi;
        Pi.init({ version: "2.0", sandbox: false }); // ✅ Set to Mainnet
    } else {
        console.error("❌ Pi SDK is not loaded. Make sure it's included in your document.");
    }
};

export const authenticateWithPi = async () => {
    if (typeof window === "undefined") {
        console.error("❌ Pi authentication attempted in a non-browser environment.");
        return null;
    }

    if (!Pi) initializePi();

    if (!Pi) {
        console.error("❌ Pi SDK failed to initialize. Check if it's loaded correctly.");
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