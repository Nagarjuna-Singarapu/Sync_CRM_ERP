import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Fetch all leads
    const fetchLeads = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/leads/", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setLeads(data);
            } else {
                console.error("Failed to fetch leads:", data);
            }
        } catch (error) {
            console.error("Error fetching leads:", error);
        }
    };

    // Handle delete lead
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                const csrfResponse = await fetch("http://localhost:8000/api/login/", {
                    method: "GET",
                    credentials: "include",
                });
                const csrfData = await csrfResponse.json();
                const csrfToken = csrfData.csrfToken;

                const response = await fetch(`http://localhost:8000/api/leads/${id}/delete/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                    credentials: "include",
                });

                if (response.ok) {
                    setMessage("Lead deleted successfully.");
                    fetchLeads(); // Refresh the leads list
                } else {
                    const data = await response.json();
                    console.error("Failed to delete lead:", data);
                }
            } catch (error) {
                console.error("Error deleting lead:", error);
            }
        }
    };

    // Handle edit lead
    const handleEdit = (id) => {
        navigate(`/leads/${id}/edit`);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div>
            <h2>Leads</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}

            <button
                style={{ float: "right", marginBottom: "20px" }}
                onClick={() => navigate("/leads/create")}
            >
                Create New Lead
            </button>

            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Restaurant Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? (
                        leads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.restaurant_name}</td>
                                <td>{lead.contact_email}</td>
                                <td>{lead.phone_number}</td>
                                <td>
                                    <button onClick={() => handleEdit(lead.id)}>Edit</button>
                                    <button onClick={() => handleDelete(lead.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No leads found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Leads;