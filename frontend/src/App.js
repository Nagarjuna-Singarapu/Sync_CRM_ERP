import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LeadList from './components/Leads';
import CreateLead from "./components/CreateLead";
import BaseLayout from './components/BaseLayout';

const App = () => {
    return (
        <Router>
            <Routes>
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                {/* Private Routes */}
                <Route element={<BaseLayout />}>
                    <Route path="/leads" element={<LeadList />} />
                    <Route path="/leads/create" element={<CreateLead />} />
                    <Route path="/leads/:id/edit" element={<CreateLead />} />
                    <Route path="contacts" element={<h2>Contacts Page</h2>} />
                    <Route path="accounts" element={<h2>Accounts Page</h2>} />
                    <Route path="reports" element={<h2>Reports Page</h2>} />
                    <Route path="profile/view" element={<h2>View Profile Page</h2>} />
                    <Route path="profile/edit" element={<h2>Edit Profile Page</h2>} />
                    <Route path="profile/change-password" element={<h2>Change Password Page</h2>} />
                </Route>
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
