import React from 'react';
import Card from './card';



var cards = [
    {"image":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg",
  "title":"Burgundy Flemming",
  "subtitle":"Meyve"},
 {"image":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
  "title":"Nigel Nigel",
  "subtitle":"Sebze"},
 {"image":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample120.jpg",
  "title":"Caspian Bellevedere",
  "subtitle":"Yesillik"}
];

class Categtest extends React.Component {



   render() {
       return (
           <div className='cat' style={{paddingTop : '150px'}} >
               <h3> Category </h3>
               <Card data={cards} />
           </div>
       );
   }

}

export default Categtest;
