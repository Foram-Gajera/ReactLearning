import React, { Component } from 'react';
import { Media, Card, CardImg, CardBody, CardText, CardTitle, CardImgOverlay } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDish: null
        };

    }

    onSelectDish(dish){
      this.setState({
        selectedDish: dish
      });
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

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div className="col-12 col-md-5 mt-4">
                <Card key={dish.id} onClick={()=>this.onSelectDish(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
              {menu}
            </div>
            <div className="row">
              <div className="col-12 mt-4">
                {this.renderDish(this.state.selectedDish)}
              </div>
            </div>
          </div>
        );
    }
}

export default Menu;