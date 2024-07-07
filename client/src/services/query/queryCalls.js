import { useQuery } from "react-query";
import { getCustomers, getOneCustomer } from "../api/apiCalls";
const token = localStorage.getItem("token");
//this react queryy used for fetching all customer
export const useCustomers = () => {
  const result = useQuery(["customers", token], () => getCustomers({ token }));
  return result;
};

//this react query for fetch one customer
export const useOneCustomer = ({ id }) => {
  console.log("query called");
  const result = useQuery(["customer", id], () =>
    getOneCustomer({ token, id })
  );
  console.log("result:", result);
  return result;
};
