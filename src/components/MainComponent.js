import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import '../App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const MapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };  
  
}

const MapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    fetchLeaders: () => { dispatch(fetchLeaders())},
    fetchPromotions: () => { dispatch(fetchPromotions())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});



class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchPromotions();
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errmess}
        comments={this.props.comments.filter((com) => com.dishId === parseInt(match.params.dishId,10))} 
        addComment={this.props.addComment}/>
     
      );
    }

    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0] }
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0] }
              promotionsLoading = {this.props.promotions.isLoading}
              promotionsErrMess = {this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0] } 
              leadersLoading = {this.props.leaders.isLoading}
              leadersErrMess = {this.props.leaders.errMess}
              /> 
             
      );
    }
    return (
      <div>
        <Header />
      
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route path="/aboutus" component={()=><About leaders={this.props.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>} />
          <Redirect to="/home" />
        </Switch>
   
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(MapStateToProps, MapDispatchToProps)(Main));