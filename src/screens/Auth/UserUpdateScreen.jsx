import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { updateUser, getUserDetails } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from "../../types/userConstants";
import Header from "../../components/Header";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ChangePassword from "../../components/ChangePassword";
const UserUpdateScreen = () => {
  const navigate = useNavigate();
  const match = useParams();

  var userId = match.id;

  var i = 1;
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, loading, error } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;
  const productList = useSelector((state) => state.productList);
  const { products, loading: loadinglist } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const [update, setUpdate] = useState(false);

  const { success: successDelete } = productDelete;
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    }
    if (!userData) {
      navigate("/");
      return;
    }
    dispatch(listProducts());

    if (!userData || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });

      if (userData && userData.isAdmin) {
        navigate("/admin/userlist");
      } else {
        navigate("/login");
      }
    } else {
      if (!user?.fullname) {
        dispatch(getUserDetails(userId));
      } else {
        setFullname(user.fullname);
        setUsername(user.username);
        setContact(user?.contact);
        setEmail(user.email);
      }
    }
  }, [userData, user, success, dispatch, userId, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: userId,
        fullname,
        username,
        contact,
      })
    );
  };

  useEffect(() => {
    if (fullname !== "" || username !== "" || contact !== "") {
      if (
        fullname !== userData.fullname ||
        username !== userData.username ||
        contact !== userData.contact
      ) {
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    } else {
      setUpdate(false);
    }
  }, [fullname, username, contact]);

  return (
    <>
      <Header />
      <div className="py-3 ">
        <FormContainer>
          <h1
            className="text-center"
            style={{ fontFamily: "'Gluten', sans-serif", color: "#8991E4" }}
          >
            Details
          </h1>

          {loadingDetails && <Loader />}
          <Form onSubmit={submitHandler} className="mt-2 mb-2">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email Address{" "}
                <small className="slanted">
                  {" "}
                  *Be sure to enter your valid email address
                </small>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label> Username</Form.Label>
              <Form.Control
                type="address"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="contact No">
              <Form.Label>
                Mobile No{" "}
                <small className="slanted">
                  * Be sure to enter a correct 10 digit number starting with 9
                </small>
              </Form.Label>
              <Form.Control
                type="contact"
                placeholder="Enter Mobile No"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={"cfchgvyuvyv"}
                disabled
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId="confirmpassword">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
            {loading && <Loader />}

            <ChangePassword />

            {update ? (
              <Button type="submit" variant="primary" className="ms-2">
                Update Profile
              </Button>
            ) : (
              <Button type="submit" variant="primary" className="ms-2" disabled>
                Update Profile
              </Button>
            )}
          </Form>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Profile updated successfully</Message>
          )}
        </FormContainer>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            {loadinglist ? (
              <Loader />
            ) : (
              <>
                <h3>My Uploads</h3>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm"
                  variant="danger"
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>ID</th>
                      <th>Product Name</th>
                      {/* <th>Category</th> */}
                      <th>Price</th>
                      <th>Negotiable</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {console.log(products)}
                  {console.log(products.length)} */}
                    {userData &&
                      products &&
                      products.length !== 0 &&
                      products.map(
                        (product) =>
                          product &&
                          product.owner?._id === userData._id && (
                            <tr key={product._id}>
                              <td>{i++}</td>
                              <td>{product._id}</td>
                              <td>{product.name}</td>

                              {/* <td>{product.category}</td> */}
                              <td>{product?.cost?.price}</td>
                              <td>
                                {product?.cost?.negotiable ? (
                                  <i
                                    className="fas fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  style={{ width: "35px", height: "30px" }}
                                  onClick={() => deleteHandler(product._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    </>
  );
};

export default UserUpdateScreen;