import React, { useMemo } from 'react';
import { investmentTrends } from '../../data/investmentTrends';
import { getRandomItem } from '../../utils/helpers';

const SuggestionPanel = ({ netProfit }) => {
    const renderIntro = () => {
        if (netProfit > 50000) {
            return <>
                <p><strong>Excellent Performance!</strong> Your firm shows significant profit.</p>
                <p>With strong financials, now is a good time to consider strategic growth and diversification. Below are some trending investment areas. Always conduct thorough research or consult a financial advisor.</p>
            </>;
        } else if (netProfit > 0) {
            return <>
                <p><strong>Good Progress!</strong> Your firm is profitable.</p>
                <p>Maintaining profitability is key. Consider reinvesting in your business or exploring stable long-term growth options. Check out some current trends below for ideas.</p>
            </>;
        }
        return null; // Don't render intro if no profit
    };

    const topStock = useMemo(() => getRandomItem(investmentTrends.topStocksToBuy), []);
    const avoidStock = useMemo(() => getRandomItem(investmentTrends.stocksToAvoid), []);
    const indiaEstate = useMemo(() => getRandomItem(investmentTrends.indiaRealEstate), []);
    const intlEstate = useMemo(() => getRandomItem(investmentTrends.internationalRealEstate), []);
    
    if (netProfit <= 0) return null;

    return (
        <div id="suggestion-panel" className="suggestion-container" aria-labelledby="suggestion-panel-heading">
            <h3 id="suggestion-panel-heading">Investment & Growth Trends</h3>
            <div id="suggestion-intro" className="suggestion-box" aria-live="polite">{renderIntro()}</div>
            <hr className="suggestion-divider" />
            <div className="suggestion-category" aria-labelledby="top-stocks-heading">
                <h4 id="top-stocks-heading" className="suggestion-category-title">🟢 Top Stocks to Watch / Buy</h4>
                <div className="suggestion-item-details">
                    {topStock ? <><h5>{topStock.name}</h5><p>{topStock.reason}</p></> : <p>Loading suggestions...</p>}
                </div>
            </div>
            <div className="suggestion-category" aria-labelledby="stocks-to-avoid-heading">
                <h4 id="stocks-to-avoid-heading" className="suggestion-category-title">🔴 Stocks to Consider Selling / Avoid</h4>
                <div className="suggestion-item-details">
                    {avoidStock ? <><h5>{avoidStock.name}</h5><p>{avoidStock.reason}</p></> : <p>Loading suggestions...</p>}
                </div>
            </div>
            <div className="suggestion-category" aria-labelledby="india-real-estate-heading">
                <h4 id="india-real-estate-heading" className="suggestion-category-title">🏙️ Top Cities/Areas to Invest In (India)</h4>
                <div className="suggestion-item-details">
                    {indiaEstate ? <><h5>{indiaEstate.area}</h5><p><strong>Why:</strong> {indiaEstate.why}</p><p><strong>Type:</strong> {indiaEstate.type}</p></> : <p>Loading suggestions...</p>}
                </div>
            </div>
            <div className="suggestion-category" aria-labelledby="international-hotspots-heading">
                <h4 id="international-hotspots-heading" className="suggestion-category-title">🌍 International Hotspots (For NRI or Diversified Investment)</h4>
                <div className="suggestion-item-details">
                    {intlEstate ? <><h5>{intlEstate.area}</h5><p><strong>Why:</strong> {intlEstate.why}</p><p><strong>Type:</strong> {intlEstate.type}</p></> : <p>Loading suggestions...</p>}
                </div>
            </div>
        </div>
    );
};

export default SuggestionPanel;