import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const url = import.meta.env.DEV_SERVER;
const url = "http://localhost:5000";

export const registerUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${url}/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async ({ email, password }) => {
  console.log("url:", url);
  try {
    const response = await axios.post(`${url}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const authorization = async ({ token }) => {
  try {
    const response = await axios.get(`${url}/protected`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addCustomer = async ({ token, name, email, address, age }) => {
  try {
    const response = await axios.post(
      `${url}/customer/addCustomer`,
      {
        name: name,
        email: email,
        address: address,
        age: age,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};

export const updateOneCustomer = async ({ token, id, data }) => {
  try {
    const response = await axios.post(
      `${url}/customer/updateOneCustomer`,
      {
        id: id,
        data: data,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};

export const getCustomers = async ({ token }) => {
  try {
    const response = await axios.get(`${url}/customer/fetchCustomers`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};

export const getOneCustomer = async ({ token, id }) => {
  try {
    const response = await axios.get(`${url}/customer/fetchOneCustomer/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};

export const deleteOneCustomer = async ({ token, id }) => {
  try {
    const response = await axios.delete(
      `${url}/customer/deleteOneCustomer/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};
