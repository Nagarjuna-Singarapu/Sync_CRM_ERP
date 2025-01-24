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
                style={{ float: "right", marginBottom: "20px", padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => navigate("/leads/create")}
            >
                Create New Lead
            </button>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>#</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>First Name</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Last Name</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Company</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Email</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Phone Number</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Lead Source</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Lead Owner</th>
                        <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? (
                        leads.map((lead) => (
                            <tr key={lead.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <td style={{ padding: "10px" }}>{lead.id}</td>
                                <td style={{ padding: "10px" }}>{lead.first_name}</td>
                                <td style={{ padding: "10px" }}>{lead.last_name}</td>
                                <td style={{ padding: "10px" }}>{lead.company}</td>
                                <td style={{ padding: "10px" }}>{lead.email}</td>
                                <td style={{ padding: "10px" }}>{lead.phone}</td>
                                <td style={{ padding: "10px" }}>{lead.lead_source}</td>
                                <td style={{ padding: "10px" }}>{lead.name}</td>
                                <td style={{ padding: "10px" }}>
                                    <button
                                        style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#ffc107", color: "#212529", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                        onClick={() => handleEdit(lead.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                        onClick={() => handleDelete(lead.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>No leads found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Leads;
