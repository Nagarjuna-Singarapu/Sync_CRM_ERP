import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");
    
        try {
            // Fetch CSRF token
            const csrfResponse = await fetch("http://localhost:8000/api/login/", {
                method: "GET",
                credentials: "include", // Include cookies
            });
            if (!csrfResponse.ok) {
                throw new Error("Failed to fetch CSRF token");
            }
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;
            console.log("Fetched CSRF Token:", csrfToken);
    
            // Make login POST request
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, // Include CSRF token
                },
                credentials: "include", // Include cookies
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage(data.message);
                console.log("Login successful");
                navigate("/Leads"); // Redirect to the home page
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>
                {errors.invalid_credentials && (
                    <p style={{ color: "red" }}>{errors.invalid_credentials}</p>
                )}
                {message && <p style={{ color: "green" }}>{message}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Click here to signup</a></p>
        </div>
    );
};

export default Login;
