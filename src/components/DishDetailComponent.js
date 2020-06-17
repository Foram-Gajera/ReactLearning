import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div>No Dish Found</div>;
  }
}

function RenderComment({ dishcom }) {
  const curTime = new Date().toDateString();
  // const com = this.dishcom.map(com=>com.comments)
  if (dishcom != null) {
    const com = dishcom.map((com) => {
      return (
        <div key={com.id}>
          <div>{com.comment}</div>
          <div>
            -- {com.author}, {curTime}
          </div>
        </div>
      );
    });
    return <div>{com}</div>;
  } else {
    return <div>No comment Found</div>;
  }
}

const DishDetail = (props) => {
  if (props.dish) {
    // const dish = props.dish;
    // const dishdetail = this.RenderDish(dish);
    // const dishcomments = this.RenderComment(dish.comments);
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-2">
            {/* {dishdetail} */}
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 mt-2">
            <h4>Comments</h4>
            {/* {dishcomments} */}
            <RenderComment dishcom={props.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>no found</div>;
  }
};
export default DishDetail;
