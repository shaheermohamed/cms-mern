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

export const addProject = async ({
  userId,
  token,
  data,
  selectedImagesUrl,
}) => {
  try {
    const response = await axios.post(
      `${url}/project/add`,
      {
        userId: userId,
        projectName: data.name,
        allImages: selectedImagesUrl,
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

export const addImages = async ({ token, id, selectedImagesUrl }) => {
  try {
    const response = await axios.post(
      `${url}/project/addImages`,
      {
        id: id,
        allImages: selectedImagesUrl,
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

export const getProjects = async ({ token, userId }) => {
  try {
    const response = await axios.get(`${url}/project/fetch/${userId}`, {
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

export const getProject = async ({ token, id }) => {
  console.log("called ir");
  try {
    const response = await axios.get(`${url}/project/fetchOne/${id}`, {
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

export const getViewProject = async ({ id }) => {
  try {
    const response = await axios.get(`${url}/project/view/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error
    );
  }
};
