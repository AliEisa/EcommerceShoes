import React from 'react';
import { MdPhone , MdLocationOn ,MdEmail } from "react-icons/md";

class Footer extends React.Component {


    render() {
        return (
            <div style={{ background: '#17a2b8' }}>
                <footer className="footer text-center" style={{ paddingTop: '15px', paddingBottom: '15px' }}   >
                    <p className="footer-text" style={{ color: 'white' }} > <MdPhone size={32} /> <span style={{ paddingLeft: '20px' }} > +963 97 174 13 69 </span></p>
                    <p className="footer-text" style={{ color: 'white' }} > <MdLocationOn size={32} /> <span style={{ paddingLeft: '20px' }} > Homs - Syria  </span></p>
                    <p className="footer-text" style={{ color: 'white' }} > <MdEmail size={32} /> <span style={{ paddingLeft: '20px' }} > it@albaath.com </span></p>
                </footer>
            </div>
        );
    }
}


export default Footer;
