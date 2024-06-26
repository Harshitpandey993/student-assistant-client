import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import {
  deleteProduct,
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import FormContainer from "../../components/common/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../../types/productConstants";
// import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const match = useParams();
  var productId = match.id;

  const [name, setName] = useState("");

  const [images, setImages] = useState([]);

  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [expiresOn, setExpiresOn] = useState("");
  // const [shippingAddress, setShippingAddress] = useState("");
  // const [shippingCharge, setShippingCharge] = useState("0");

  const [price, setPrice] = useState(0);
  const [negotiable, setNegotiable] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const {
    loading: loadingUpdate,
    error: errorUpdate,

    success: successUpdate,
  } = productUpdate;
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    } else {
      navigate("/login");
      return;
    }

    dispatch({
      type: PRODUCT_UPDATE_RESET,
    });
    if (!userData || successUpdate) {
      navigate("/");
    }
    if (successUpdate && userData.isAdmin) {
      navigate("/admin/productlist");
    }
    if (!product || !product.name || product._id !== productId) {
      dispatch(listProductDetails(productId, userData.token));
    } else {
      setName(product.name);
      // setImages(product.images.map((image) => image).toString());
      setImages(product.images);
      setDescription(product.description);
      // setCategory(product.category);
      // setExpiresOn(product.expiresOn.substring(0, 10));
      // setShippingAddress(product?.shippingAddress?.address);
      // setShippingCharge(product?.shippingAddress?.shippingCharge);

      setPrice(product?.cost?.price);
      setNegotiable(product?.cost?.negotiable);
    }
  }, [dispatch, productId, product, successUpdate, userData]);
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dh3bp7vbd/upload";
  const CLOUDINARY_UPLOAD_PRESET = "qwdzopo4";
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    setUploading(true);
    await axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (res) {
        setImages([...images, res.data.url]);
      })
      .catch(function (err) {
        console.error(err);
      });
    setUploading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(
        productId,
        name,
        images,
        description,
        // category,
        // expiresOn,
        // shippingAddress,
        // shippingCharge,
        price,
        negotiable
      )
    );
  };
  // console.log(images);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
      navigate("/");
    }
  };
  const removeImg = (fileToRemove) => {
    // console.log(fileToRemove);
    const updatedImages = images.filter((file) => file !== fileToRemove);
    setImages(updatedImages);
  };

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="py-2">
        <FormContainer>
          <h1
            className="text-center"
            style={{ fontFamily: "serif", color: "#8991E4" }}
          >
            Edit Product
          </h1>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name of the property </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter what product do you have"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="images">
                <Form.Label>
                  Image <small> *Upload Image only</small>{" "}
                </Form.Label>

                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {images && (
                  <div className="position-relative mt-5">
                    {images.map((ele, index) => (
                      <div
                        key={index}
                        className="d-inline-block position-relative"
                      >
                        <img
                          className="mt-2"
                          src={ele}
                          style={{ height: "100px" }}
                          alt={`image${index + 1}`}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ width: "30px", height: "40px" }}
                          onClick={() => removeImg(ele)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploading && <Loader />}
              </Form.Group>
              {/* <Form.Group controlId="category">
                <Form.Label>Category </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category like: electronics, books, Furniture.. "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId="description">
                <Form.Label>Describe your property </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  row="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="expiresOn">
                <Form.Label>How long is your product for sale? </Form.Label>
                <Form.Control
                  type="date"
                  value={expiresOn}
                  onChange={(e) => setExpiresOn(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId="price">
                <Form.Label>Price </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-5 mt-5" controlId="negotiable">
                <Form.Check
                  type="checkbox"
                  label="Is the price Negotiable?"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              {/* <Form.Group controlId="shippingaddress">
                <Form.Label>Shipping Address </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter where can you deliver"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              {/* <Form.Group controlId="shippingCharge">
                <Form.Label>Shipping Charge </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter how much will you charge for shipping"
                  value={shippingCharge}
                  onChange={(e) => setShippingCharge(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Button className="mb-2 ms-2" type="submit" variant="primary">
                Update
              </Button>
              <Button
                className="mb-2 ms-2"
                variant="danger"
                onClick={() => deleteHandler(product._id)}
              >
                Delete
              </Button>
            </Form>
          )}
        </FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      </div>
      <Footer />
    </>
  );
};

export default ProductEditScreen;
