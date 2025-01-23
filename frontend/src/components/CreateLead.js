import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateLead = () => {
    const [formData, setFormData] = useState({
        name: "",
        restaurant_name: "",
        contact_email: "",
        phone_number: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
            const csrfResponse = await fetch("http://localhost:8000/api/login/", {
                method: "GET",
                credentials: "include",
            });
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;

            const response = await fetch("http://localhost:8000/api/leads/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Lead created successfully!");
                setFormData({
                    name: "",
                    restaurant_name: "",
                    contact_email: "",
                    phone_number: "",
                });
                navigate("/leads");
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error("Error creating lead:", error);
        }
    };

    return (
        <div>
            <h2>Create Lead</h2>
            <form onSubmit={handleSubmit} id="create-lead-form">
                <div className="mb-3">
                    <label htmlFor="lead-name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lead-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lead-restaurant-name" className="form-label">Restaurant Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lead-restaurant-name"
                        name="restaurant_name"
                        value={formData.restaurant_name}
                        onChange={handleChange}
                        required
                    />
                    {errors.restaurant_name && <p style={{ color: "red" }}>{errors.restaurant_name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lead-email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="lead-email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        required
                    />
                    {errors.contact_email && <p style={{ color: "red" }}>{errors.contact_email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lead-phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lead-phone"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone_number && <p style={{ color: "red" }}>{errors.phone_number}</p>}
                </div>
                <div id="error-messages" className="text-danger"></div>
                <button type="submit" className="btn btn-primary">Create Lead</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
};

export default CreateLead;
