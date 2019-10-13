import React from 'react';
import { Link } from 'react-router-dom';

import img2 from '../Assets/green2.jpg';

class Articale extends React.Component {
    render() {
        var image = {img2},
                title = this.props.data.title,
                subtitle = this.props.data.subtitle;
        return (
            <figure className="snip1584">
                <img src={img2} />
                <figcaption>
                    <h5>{subtitle}</h5>
                </figcaption><Link to="/cart"></Link>
            </figure>
        )
    }
}


export default Articale;