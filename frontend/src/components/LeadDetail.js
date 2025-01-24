import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLeadDetail } from '../services/api';

const LeadDetail = () => {
    const { id } = useParams();
    const [lead, setLead] = useState(null);

    useEffect(() => {
        const getLeadDetail = async () => {
            try {
                const data = await fetchLeadDetail(id);
                setLead(data);
            } catch (error) {
                console.error('Error fetching lead detail:', error);
            }
        };
        getLeadDetail();
    }, [id]);

    return lead ? (
        <div>
            <h2>{lead.name}</h2>
            <p>Restaurant: {lead.restaurant_name}</p>
            <p>Email: {lead.contact_email}</p>
            <p>Phone: {lead.phone_number}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default LeadDetail;
