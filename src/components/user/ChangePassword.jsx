import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Message from "../common/Message";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [val, setVal] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      val.oldPassword === "" ||
      val.newPassword === "" ||
      val.newPassword !== val.confirmPassword
    ) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      dispatch(
        updateUserPassword({
          oldPassword: val.oldPassword,
          newPassword: val.newPassword,
          confirmPassword: val.confirmPassword,
        })
      );
      handleClose();
    }
  }

  return (
    <>
      <Button
        variant="warning"
        className="mt-2 mb-2 ms-2"
        style={{ width: "70px", height: "40px" }}
        onClick={handleShow}
      >
        <RiLockPasswordFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <Message variant="danger">{message}</Message>}
          <input
            placeholder="Current Password"
            className="w-100 mt-3 mb-3"
            value={val.oldPassword}
            onChange={(e) => setVal({ ...val, oldPassword: e.target.value })}
          ></input>
          <input
            placeholder="new Password"
            className="w-100 mt-3 mb-3"
            value={val.newPassword}
            onChange={(e) => setVal({ ...val, newPassword: e.target.value })}
          ></input>
          <input
            placeholder="confirm Password"
            className="w-100 mt-3 mb-3"
            value={val.confirmPassword}
            onChange={(e) =>
              setVal({ ...val, confirmPassword: e.target.value })
            }
          ></input>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div
            onClick={() => navigate("/forgotpassword")}
            className=" button-8"
          >
            Forgot Password
          </div>
          <div className=" button-7" onClick={handleSubmit}>
            Save Changes
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
