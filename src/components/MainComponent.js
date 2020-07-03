import React, { Component } from 'react';
import Menu from './MenuComponent';
// import DishDetail from './DishDetailComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import '../App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { connect } from 'react-redux';

const MapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };  
  
}

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {

    
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((com) => com.dishId === parseInt(match.params.dishId,10))} />
      );
    }

    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0] }
              promotion={this.props.promotions.filter((promo)=>promo.featured)[0] }
              leader={this.props.leaders.filter((leader)=>leader.featured)[0] } /> 
      );
    }
    return (
      <div>
        <Header />
      
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Route path="/aboutus" component={()=><About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
   
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(MapStateToProps)(Main));