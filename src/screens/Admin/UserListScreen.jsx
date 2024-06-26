import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import Header from "../../components/common/Header";
import { listUsers, deleteUser } from "../../actions/userActions";
import { useNavigate } from "react-router";
import AdminDeleteAccountModel from "../../components/user/AdminDeleteAccountModel";
import AdminUpdateUser from "../../components/user/AdminUpdateUser";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../../types/userConstants";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  var i = 1;

  const handleEditModalOpen = (user) => {
    setEditUser(user);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    // Optionally, you can reset the editUser state here
    // setEditUser(null);
  };

  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET });
    dispatch({ type: USER_DETAILS_RESET });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    } else {
      navigate("/login");
    }
    if (userData && userData.isAdmin) {
      dispatch(listUsers(userData.token));
    } else {
      navigate("/");
    }
  }, [dispatch, successDelete, userData]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id, userData.token));
    }
  };
  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="ms-5 mt-2">
        <Link to="/" className="button-6" >
          <FaHome /> Back To Home
        </Link>
      </div>
      <div
        className="py-3 d-flex flex-column p-2 "
        style={{ minHeight: "100vh" }}
      >
        <h1
          className="text-center pb-2 "
          style={{ fontFamily: "serif", color: "#8991E4" }}
        >
          Users
        </h1>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
            <Message variant="danger">Oops! Something went wrong on our end</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SN</th>
                {/* <th>ID</th> */}
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>Joined At</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{i++}</td>
                    {/* <td>{user._id}</td> */}
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      {user.isAdmin ? (
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
                      <AdminUpdateUser Edituser={user} />

                      <AdminDeleteAccountModel userId={user._id} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserListScreen;
