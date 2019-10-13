import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions';
import { Link } from 'react-router-dom';


import woman from '../Assets/woman.jpg';
import man from '../Assets/man.jpg';

class categoryCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryImage : [
                {
                    id: "1",
                    name: "Women",
                    img : (<img key= "1" src={woman} />)
                },
                {
                    id: "2",
                    name: "Men",
                    img : (<img key="2" src={man} />)
                }
            ]
        };
    }

    handleCategory(value ) {
      //  e.preventDefault();
        this.props.getProducts(value)
    }

    render() {
        var image = this.props.photo,
        catID = this.props.catID,
        category = this.props.category;
        const newTo = {
            pathname: "/category/" + catID
          };
        const renderImage =  this.state.categoryImage.map( (cat) => {
            if(category === cat.name)
            return cat.img ;
        })
        return (
            <figure className="snip1584">
                {renderImage}
                <figcaption>
                    <h5>{category}</h5>
                </figcaption><Link to={newTo} ></Link>
            </figure>
        )
    }

}

export default connect(null, { getProducts })(categoryCard);
