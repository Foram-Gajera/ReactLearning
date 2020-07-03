import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Errors, Control } from "react-redux-form";

const required = (val) => val && val.length;
const minLength = (len) => (val) => !val || val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

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
  const [show, setShow] = useState(false);
  //  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleModal = () => setShow(!show);

  const handleSubmit = (values) => alert(JSON.stringify(values));

  if (props.dish) {
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
            <Button
              className="btn btn-light border"
              type="button"
              onClick={handleShow}
            >
              <span className="fa fa-pencil"></span> &nbsp;Submit Comment
            </Button>
          </div>
        </div>
        <Modal isOpen={show} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Comment</ModalHeader>
          <ModalBody>
            <LocalForm
              className="p-2"
              onSubmit={(values) => handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="rate">Rating</Label>
                <Control.select
                  className="form-control"
                  model=".rate"
                  name="rate"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5" selected>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="authername">Name</Label>
                <Control.text
                  className="form-control"
                  model=".authername"
                  id="authername"
                  name="authername"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(12),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".authername"
                  show="touched"
                  messages={{
                    required: "Required field",
                    minLength: "must requires 3 or more characters",
                    maxLength: "not allowed more then 12 characters",
                  }}
                />
              </Row>

              <Row className="form-group">
                <Label htmlFor="message">Message</Label>
                <Control.textarea
                  className="form-control"
                  rows="6"
                  id="message"
                  name="message"
                  model=".message"
                />
              </Row>
              <Row>
                <Button className="btn btn-info" type="submit">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  } else {
    return <div>no found</div>;
  }
};
export default DishDetail;
