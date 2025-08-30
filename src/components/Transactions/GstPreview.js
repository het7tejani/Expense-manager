import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const GstPreview = ({ details }) => {
    if (!details) return null;

    return (
        <div id="gst-details-preview" className="form-field-full">
            <p><span>{details.baseLabel}</span>: <span>{formatCurrency(details.baseAmount)}</span></p>
            <p>GST (<span>{details.gstPercentage}</span>%): <span>{formatCurrency(details.gstAmount)}</span></p>
            <p><span>{details.totalLabel}</span>: <span>{formatCurrency(details.totalAmount)}</span></p>
        </div>
    );
};

export default GstPreview;