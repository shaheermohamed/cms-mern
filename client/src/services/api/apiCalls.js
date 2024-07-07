import axios from "axios";
// const url = "http://localhost:5000";
const url = "https://cms-mern-server.onrender.com"

//this api for register user
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

//this api for login user
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

//this api for authorization of user
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


// this api for adding customer
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

// this api for update user
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

//this api for fetching all customers
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

//this api for fetching one customer

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

// this api for delete one customer
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
