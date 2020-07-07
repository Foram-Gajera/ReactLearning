import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

// import { Dishes } from './dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

/////////////Dishes///////////////////

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


/////////////Promotions///////////////////


export const fetchPromotions = () => (dispatch) => {

    dispatch(promotionsLoading(true));

    setTimeout(() => {
        dispatch(addPromotions(PROMOTIONS));
    }, 2000);
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = (errmess) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errmess
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_DISHES,
    payload: promotions
});


/////////////Leaders///////////////////


export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    setTimeout(() => {
        dispatch(addLeaders(LEADERS));
    }, 2000);
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_DISHES,
    payload: leaders
});