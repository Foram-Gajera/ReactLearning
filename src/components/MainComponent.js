import React, { Component } from 'react';
import Menu from './MenuComponent';
// import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        promotions: PROMOTIONS,
        comments: COMMENTS,
        leaders: LEADERS
        // selectedDish: null
    };
  }



  render() {

    
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.state.comments.filter((com) => com.dishId === parseInt(match.params.dishId,10))} />
      );
    }

    const HomePage = () =>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0] }
              promotion={this.state.promotions.filter((promo)=>promo.featured)[0] }
              leader={this.state.leaders.filter((leader)=>leader.featured)[0] } /> 

        
        
      );
    }
    return (
      <div>
        <Header />
      
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
   
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
      </div>
    );
  }
}

export default Main;