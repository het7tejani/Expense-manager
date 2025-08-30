import React from 'react';
import { useAppContext } from '../context/AppContext';
import FirmCard from '../components/Firms/FirmCard';

const YourFirms = () => {
    const { firms } = useAppContext();

    const firmList = firms.length > 0
        ? firms.map(firm => <FirmCard key={firm.id} firm={firm} />)
        : <p>No firms added yet. Click "Add Firm" to get started.</p>;

    return (
        <section id="your-firms-view" className="view active-view" aria-labelledby="nav-your-firms">
            <h2>Your Firms</h2>
            <div id="firms-list" className="cards-container">
                {firmList}
            </div>
        </section>
    );
};

export default YourFirms;