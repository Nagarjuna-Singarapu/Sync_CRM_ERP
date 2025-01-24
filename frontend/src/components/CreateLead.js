import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateLead = () => {
    const [formData, setFormData] = useState({
        name: "",
        first_name: "",
        last_name: "",
        title: "",
        phone: "",
        mobile: "",
        lead_source: "NONE",
        industry: "NONE",
        annual_revenue: "",
        email: "",
        email_opt_out: false,
        company: "",
        fax: "",
        website: "",
        lead_status: "NONE",
        no_of_employees: "",
        rating: "NONE",
        skype_id: "",
        secondary_email: "",
        twitter: "",
        street: "",
        state: "",
        country: "",
        city: "",
        zip_code: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
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
                    first_name: "",
                    last_name: "",
                    title: "",
                    phone: "",
                    mobile: "",
                    lead_source: "NONE",
                    industry: "NONE",
                    annual_revenue: "",
                    email: "",
                    email_opt_out: false,
                    company: "",
                    fax: "",
                    website: "",
                    lead_status: "NONE",
                    no_of_employees: "",
                    rating: "NONE",
                    skype_id: "",
                    secondary_email: "",
                    twitter: "",
                    street: "",
                    state: "",
                    country: "",
                    city: "",
                    zip_code: "",
                    description: "",
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
        <div className="container">
            <h2 className="mb-4">Create Lead</h2>
            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-4">
                    <h4>Personal Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Owner Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                    <h4>Contact Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Mobile</label>
                            <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Secondary Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="secondary_email"
                                value={formData.secondary_email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Business Information */}
                <div className="mb-4">
                    <h4>Business Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Company</label>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Website</label>
                            <input
                                type="url"
                                className="form-control"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Number of Employees</label>
                            <input
                                type="number"
                                className="form-control"
                                name="no_of_employees"
                                value={formData.no_of_employees}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Annual Revenue</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="annual_revenue"
                                value={formData.annual_revenue}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                {/* Lead Source */}
                <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Lead Source</label>
                            <select
                                className="form-select"
                                name="lead_source"
                                value={formData.lead_source}
                                onChange={handleChange}
                            >
                                <option value="NONE">-None-</option>
                                <option value="ADVERTISEMENT">Advertisement</option>
                                <option value="COLD_CALL">Cold Call</option>
                                <option value="EMPLOYEE_REFERRAL">Employee Referral</option>
                                <option value="EXTERNAL_REFERRAL">External Referral</option>
                                <option value="ONLINE_STORE">Online Store</option>
                                <option value="PARTNER">Partner</option>
                                <option value="PUBLIC_RELATIONS">Public Relations</option>
                                <option value="SALES_EMAIL_ALIAS">Sales Email Alias</option>
                                <option value="SEMINAR_PARTNER">Seminar Partner</option>
                                <option value="INTERNAL_SEMINAR">Internal Seminar</option>
                                <option value="TRADE_SHOW">Trade Show</option>
                                <option value="WEB_DOWNLOAD">Web Download</option>
                                <option value="WEB_RESEARCH">Web Research</option>
                                <option value="CHAT">Chat</option>
                                <option value="TWITTER">X (Twitter)</option>
                                <option value="FACEBOOK">Facebook</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Industry</label>
                            <select
                                className="form-select"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                            >
                                <option value="NONE">-None-</option>
                                <option value="ASP">ASP (Application Service Provider)</option>
                                <option value="DATA_TELECOM_OEM">Data/Telecom OEM</option>
                                <option value="ERP">ERP (Enterprise Resource Planning)</option>
                                <option value="GOVERNMENT_MILITARY">Government/Military</option>
                                <option value="LARGE_ENTERPRISE">Large Enterprise</option>
                                <option value="MANAGEMENT_ISV">Management ISV</option>
                                <option value="MSP">MSP (Management Service Provider)</option>
                                <option value="NETWORK_EQUIPMENT_ENTERPRISE">Network Equipment Enterprise</option>
                                <option value="NON_MANAGEMENT_ISV">Non-management ISV</option>
                                <option value="OPTICAL_NETWORKING">Optical Networking</option>
                                <option value="SERVICE_PROVIDER">Service Provider</option>
                                <option value="SMALL_MEDIUM_ENTERPRISE">Small/Medium Enterprise</option>
                                <option value="STORAGE_EQUIPMENT">Storage Equipment</option>
                                <option value="STORAGE_SERVICE_PROVIDER">Storage Service Provider</option>
                                <option value="SYSTEMS_INTEGRATOR">Systems Integrator</option>
                                <option value="WIRELESS_INDUSTRY">Wireless Industry</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Lead Status</label>
                            <select
                                className="form-select"
                                name="lead_status"
                                value={formData.lead_status}
                                onChange={handleChange}
                            >
                                <option value="NONE">-None-</option>
                                <option value="ATTEMPTED_CONTACT">Attempted to Contact</option>
                                <option value="CONTACT_IN_FUTURE">Contact in Future</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="JUNK_LEAD">Junk Lead</option>
                                <option value="LOST_LEAD">Lost Lead</option>
                                <option value="NOT_CONTACTED">Not Contacted</option>
                                <option value="PRE_QUALIFIED">Pre-Qualified</option>
                                <option value="NOT_QUALIFIED">Not Qualified</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Rating</label>
                            <select
                                className="form-select"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                            >
                                <option value="NONE">-None-</option>
                                <option value="ACQUIRED">Acquired</option>
                                <option value="ACTIVE">Active</option>
                                <option value="MARKET_FAILED">Market Failed</option>
                                <option value="PROJECT_CANCELLED">Project Cancelled</option>
                                <option value="SHUT_DOWN">Shut Down</option>
                            </select>
                        </div>
                    </div>
                {/* Address Information */}
                <div className="mb-4">
                    <h4>Address Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Street</label>
                            <textarea
                                className="form-control"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="col-md-6">
                            <label>City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Country</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Zip Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mb-4">
                    <h4>Additional Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Twitter</label>
                            <input
                                type="text"
                                className="form-control"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Fax</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fax"
                                value={formData.fax}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="btn btn-primary">
                        Create Lead
                    </button>
                </div>
            </form>

            {/* Success/Error Messages */}
            {message && <p className="text-success">{message}</p>}
            {Object.keys(errors).length > 0 && (
                <div className="text-danger">
                    {Object.keys(errors).map((field) => (
                        <p key={field}>{errors[field]}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreateLead;
