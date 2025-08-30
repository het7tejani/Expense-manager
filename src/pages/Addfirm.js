import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateId } from '../utils/helpers';

const AddFirm = () => {
    const { addFirm } = useAppContext();
    const navigate = useNavigate();

    const [firmDetails, setFirmDetails] = useState({
        name: '',
        gstNumber: '',
        category: '',
        gstPercentage: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFirmDetails(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newFirm = {
            id: generateId(),
            name: firmDetails.name.trim(),
            gstNumber: firmDetails.gstNumber.trim().toUpperCase(),
            category: firmDetails.category.trim(),
            description: firmDetails.description.trim(),
            gstPercentage: parseFloat(firmDetails.gstPercentage)
        };
        
        if (!newFirm.name || !newFirm.gstNumber || !newFirm.category || isNaN(newFirm.gstPercentage)) {
            alert('Please fill in all required firm details.');
            return;
        }
        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstPattern.test(newFirm.gstNumber)) {
            alert('Invalid GST Number format. It should be like 22AAAAA0000A1Z5.');
            return;
        }

        addFirm(newFirm);
        alert('Firm added successfully!');
        navigate('/your-firms');
    };

    return (
        <section id="add-firm-view" className="view active-view" aria-labelledby="nav-add-firm">
            <h2>Add New Firm</h2>
            <div className="form-container">
                <form id="add-firm-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="firm-name">Firm Name</label>
                            <input type="text" id="firm-name" name="name" required value={firmDetails.name} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="gst-number">GST Number</label>
                            <input type="text" id="gst-number" name="gstNumber" required minLength="15" maxLength="15" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" title="Enter valid GSTIN (e.g., 22AAAAA0000A1Z5)" value={firmDetails.gstNumber} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="firm-category">Category</label>
                            <input type="text" id="firm-category" name="category" required placeholder="e.g., Services, Goods" value={firmDetails.category} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="gst-percentage">GST Percentage (%)</label>
                            <input type="number" id="gst-percentage" name="gstPercentage" required min="0" max="100" step="0.01" value={firmDetails.gstPercentage} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-field-full">
                        <label htmlFor="firm-description">Description</label>
                        <textarea id="firm-description" name="description" rows="3" value={firmDetails.description} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit">Add Firm</button>
                </form>
            </div>
        </section>
    );
};

export default AddFirm;