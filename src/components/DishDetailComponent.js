import React, { Component } from "react";
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
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const minLength = (len) => (val) => !val || val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

function RenderDish({ dish }) {
   if (dish != null) {
    return (
      <FadeTransform
      in
      transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
    );
  } else {
    return <div>No Dish Found</div>;
  }
}

function RenderComment({ dishcom, postComment, dishId }) {
  const curTime = new Date().toDateString();
  // const com = this.dishcom.map(com=>com.comments)
  if (dishcom != null) {
    const com = dishcom.map((com) => {
      return (
        <div>
            <div key={com.id}>
              <div>{com.comment}</div>
              <div>
                -- {com.author}, {curTime}
              </div>
            </div>
        </div>
      );
    });
    return (
      <Stagger in>
      <div>
        {com}
        <Fade in>
        <div>
          <CommentForm dishId={dishId} postComment ={postComment} />
        </div>
        </Fade>
      </div>
      </Stagger>
    );
  } else {
    return <div>No comment Found</div>;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isOpen: false,
    };
    //  this.handleShow = this.handleShow.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    alert(JSON.stringify(values));
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button
          className="btn btn-light border"
          type="button"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil"></span> &nbsp;Submit Comment
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
          <ModalBody>
            <LocalForm
              className="p-2"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  className="form-control"
                  model=".rating"
                  name="rating"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option selected>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Name</Label>
                <Control.text
                  className="form-control"
                  model=".author"
                  id="author"
                  name="author"
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
                <Label htmlFor="comment">Message</Label>
                <Control.textarea
                  className="form-control"
                  rows="6"
                  id="comment"
                  name="comment"
                  model=".comment"
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
  }
}

const DishDetail = (props) => {
  // const [show, setShow] = useState(false);
  //  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const toggleModal = () => setShow(!show);

  // const handleSubmit = (values) => alert(JSON.stringify(values));
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.dish) {
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
            <RenderComment
              dishcom={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>no found</div>;
  }
};
export default DishDetail;
