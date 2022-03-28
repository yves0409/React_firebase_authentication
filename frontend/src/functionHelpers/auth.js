import axios from "axios";

//CREATING OR UPDATING A USER
export const createUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

//ACTIVE CURRENT USER
export const activeUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/active-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

//ADMIN
export const activeAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/active-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
