import  React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import { DISHES } from '../shared/dishes';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dishes: DISHES,
            curTime: new Date().toDateString()
         };

        //  const lstcom = this.state.dishes.map(dish => dish.comments);
    }  

    renderDish(dish){
        if(dish!=null){
          return (
            <Card>
              <CardImg src={dish.image} alt={dish.name} />       
              <CardBody>
                <CardTitle>
                  {dish.name}
                </CardTitle>
                <CardText>
                  {dish.description}
                </CardText>
              </CardBody>
            </Card>
          );
        }
        else{
          return(
            <div>
              No Dish Found
            </div>
          );
        }
      }

      renderComment(dishcom){
        // const com = this.dishcom.map(com=>com.comments)
        if(dishcom!=null){
          const com= dishcom.map((com =>{
            return(
              <div key={com.ic}>
                <div>
                  {com.comment}
                </div>
                <div>
                  -- {com.author}, {this.state.curTime}
                </div>
              </div>
              
              )}
          ));
          return(
            <div>
              {com}
            </div>
          );
        }
        else{
          return(
            <div>
              No comment Found
            </div>
          );
        }
      }

        render() {  
          if (this.props.dish) {
              const dish = this.props.dish;
              const dishdetail = this.renderDish(dish);
              const dishcomments = this.renderComment(dish.comments);
              return (
                  <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-5 mt-2">
                      {dishdetail}
                     
                    </div>
                    <div className="col-12 col-md-5 mt-2">
                      <h4>Comments</h4>
                      {dishcomments}
                    </div>  
                    </div> 
                  </div>
               
              );
          }
          else {
              return (<div>no found</div>);
          }
      }

   
}       


export default DishDetail;