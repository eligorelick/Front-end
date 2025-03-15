import { useState } from "react";
import { authenticateWithPi } from "../utils/piAuth";

const Login = () => {
    const [user, setUser] = useState(null);

    const handlePiLogin = async () => {
        const authenticatedUser = await authenticateWithPi();
        if (authenticatedUser) {
            setUser(authenticatedUser);
            alert(`Logged in as ${authenticatedUser.username}`);
        } else {
            alert("Pi login failed.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handlePiLogin} className="px-4 py-2 bg-purple-500 text-white rounded">
                Login with Pi Network
            </button>
            {user && <p>Welcome, {user.username}!</p>}
        </div>
    );
};

export default Login;
