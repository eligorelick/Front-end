let Pi;

if (typeof window !== "undefined" && window.Pi) {
    Pi = window.Pi;
    Pi.init({ version: "2.0", sandbox: true }); // ✅ Ensure sandbox mode is enabled
} else {
    console.error("❌ Pi SDK is not loaded.");
}

export const authenticateWithPi = async () => {
    if (!Pi) {
        console.error("❌ Pi SDK is missing. Make sure it's loaded in `_document.js`.");
        return null;
    }

    try {
        const scopes = ["username", "payments"];
        const user = await Pi.authenticate(scopes);
        console.log("✅ Authenticated user:", user);
        return user;
    } catch (error) {
        console.error("❌ Pi Authentication Failed:", error);
        return null;
    }
};
