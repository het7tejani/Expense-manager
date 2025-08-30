import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
    const { resetAllData } = useAppContext();
    return (
        <footer>
            <div className="footer-content-wrapper">
                <div className="footer-main">
                    <div className="footer-logo-area">
                        <a href="/" className="footer-logo">📊 Expense Manager</a>
                        <p className="footer-copyright">&copy; 2025 EXPENSE MANAGER <br /> All Rights Reserved. Various trademarks held by their respective owners.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Careers</a></li>
                                <li><a href="/">Open Positions</a></li>
                                <li><a href="/">Team</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Community</h4>
                            <ul>
                                <li><a href="/">Blog</a></li>
                                <li><a href="/">Events</a></li>
                                <li><a href="/">Forum</a></li>
                                <li><a href="/">Partners</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Help</h4>
                            <ul>
                                <li><a href="/">Contact Us</a></li>
                                <li><a href="/">Support</a></li>
                                <li><a href="/">FAQs</a></li>
                                <li><a href="/">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-social-icons">
                        <a href="/" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
                        <a href="/" aria-label="Twitter" title="Twitter"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 003.96 8.782a4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.738 4.566 4.647 4.647 0 01-2.104.08 4.66 4.66 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.45 9.45 0 002.323-2.41z"/></svg></a>
                        <a href="/" aria-label="Medium" title="Medium"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M7.076 6.657h4.962c.288 0 .52.232.52.521v10.067c0 .288-.232.52-.52.52H7.076c-.289 0-.521-.232-.521-.52V7.178c0-.289.232-.521.521-.521zm6.615 0h5.123c.288 0 .52.232.52.521v.66c0 .288-.232.52-.52.52h-5.123c-.288 0-.52-.232-.52-.52v-.66c0-.289.232-.521.52-.521zm0 3.91h5.123c.288 0 .52.231.52.52v.66c0 .288-.232.52-.52.52h-5.123c-.288 0-.52-.232-.52-.52v-.66c0-.289.232-.52.52-.52zm0 3.91h5.123c.288 0 .52.232.52.52v.66c0 .288-.232.52-.52.52h-5.123c-.288 0-.52-.231-.52-.52v-.66c0-.288.232-.52.52-.52zm-11.412-.903h3.057c.288 0 .52.232.52.521v3.683c0 .288-.232.52-.52.52H2.279c-.288 0-.52-.232-.52-.52V9.664c0-.289.232-.52.52-.521z"/></svg></a>
                        <a href="/" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                    </div>
                    <button id="reset-all-data-btn" className="button-danger footer-reset-btn" onClick={resetAllData}>Reset All Data</button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;