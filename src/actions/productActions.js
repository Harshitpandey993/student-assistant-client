import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_USER_REQUEST,
  PRODUCT_USER_FAIL,
  PRODUCT_USER_SUCCESS,
  // PRODUCT_REVIEW_REQUEST,
  // PRODUCT_REVIEW_FAIL,
  // PRODUCT_REVIEW_SUCCESS,
} from "../types/productConstants";
import axios from "axios";
import { TOAST_ADD } from "../types/userConstants";

export const listProducts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_RESET,
    });
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/products`, config);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUnsoldProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_RESET,
    });
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/products/unsoldproduct`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserProducts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_USER_REQUEST,
    });

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/products/product`, config);

    dispatch({
      type: PRODUCT_USER_SUCCESS,
      payload: data.data.userProducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/products/${id}`, config);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete product by an admin

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(
      `/api/products/${id}`,

      config
    );
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
    dispatch({
      type: TOAST_ADD,
      payload: "PRODUCT DELETED !!!",
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//create the product
//this function simply does not take anything and creates a sample product only which later can be edited
export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    // console.log("reached here");
    // console.log(config);
    const { data } = await axios.post(`/api/products`, formData, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: TOAST_ADD,
      payload: "PRODUCT ADDED !!!",
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update product

export const updateProduct =
  (
    id,
    name,
    images,
    keywords,
    description,
    // expiresOn,
    // address,
    // shippingCharge,
    price,
    negotiable,
    sold
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });
      const {
        userLogin: { userData },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      // console.log("reached here");
      // console.log(config);
      const { data } = await axios.put(
        `/api/products/${id}`,
        {
          name,
          images,
          keywords,
          description,
          // expiresOn,
          // address,
          // shippingCharge,
          price,
          negotiable,
          sold,
        },
        config
      );
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data.data.newProduct,
      });
      dispatch({
        type: TOAST_ADD,
        payload: "PRODUCT UPDATED !!!",
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
