import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password1: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(false);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData);
            setSuccess(true);
            alert(response.data.message);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}

                <input
                    type="password"
                    name="password1"
                    placeholder="Enter Password"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                />
                {errors.password1 && <div className="error-message">{errors.password1}</div>}

                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />
                {errors.password2 && <div className="error-message">{errors.password2}</div>}

                <button type="submit">Sign Up</button>
            </form>

            {errors.password_mismatch && (
                <div className="error-message">{errors.password_mismatch}</div>
            )}
            {errors.email_exists && (
                <div className="error-message">{errors.email_exists}</div>
            )}

            {success && <p>Your account has been created successfully!</p>}

            <p>Already have an account? <a href="/login">Click here to login</a></p>
        </div>
    );
};

export default Signup;
