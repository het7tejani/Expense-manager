import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const GstSummaryTable = ({ data }) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <section className="view" aria-labelledby="gst-summary-heading" style={{padding: '0', marginTop: '2.5rem'}}>
            <h2 id="gst-summary-heading">GST Summary by Firm</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Firm Name</th>
                            <th>GST Number</th>
                            <th>Output GST (Payable)</th>
                            <th>Input Tax Credit (ITC)</th>
                            <th>Net GST Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((firmGst, index) => (
                            <tr key={index}>
                                <td>{firmGst.firmName}</td>
                                <td>{firmGst.gstNumber}</td>
                                <td>{formatCurrency(firmGst.outputGst)}</td>
                                <td>{formatCurrency(firmGst.inputGst)}</td>
                                <td style={{ color: firmGst.netPayableGst < 0 ? '#27ae60' : '#d35400', fontWeight: 'bold' }}>
                                    {formatCurrency(Math.abs(firmGst.netPayableGst))}
                                    {firmGst.netPayableGst < 0 ? ' (Credit)' : ' (Payable)'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default GstSummaryTable;
