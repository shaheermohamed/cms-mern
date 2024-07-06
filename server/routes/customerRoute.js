const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addCustomer,
  fetchCustomers,
  fetchOneCustomer,
  updateOneCustomer,
} = require("../controllers/customerController");

//to add customer
router.post("/addCustomer", verifyToken, addCustomer);

//to fetch customers
router.get("/fetchCustomers", verifyToken, fetchCustomers);

//to fetch one customer
router.get("/fetchOneCustomer/:id", verifyToken, fetchOneCustomer);

//update one customer
router.post("/updateOneCustomer", verifyToken, updateOneCustomer);

module.exports = router;
