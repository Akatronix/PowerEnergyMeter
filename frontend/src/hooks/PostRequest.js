import axios from "axios";

const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    return error.message;
  }
};

export default postData;
