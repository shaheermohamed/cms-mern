const Customer = require("../models/Customer");
/**
 * Async function to add a new customer to the database.
 *
 */
const addCustomer = async (req, res) => {
  try {
    const { name, email, address, age } = req.body;
    const newCustomer = new Customer({ name, email, address, age });
    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Customer addition failed" });
  }
};
/**
 * Fetches all customers from the database and sends a JSON response with the customers.
 *
 */
const fetchCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Fetching customers failed" });
  }
};
/**
 * Fetches a single customer from the database based on the provided ID.
 *
 */
const fetchOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const customer = await Customer.findById(id);
    console.log("fetchOneProject:", customer);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Fetching customer" });
  }
};
/**
 * Updates a customer in the database with the provided data.
 *
 */
const updateOneCustomer = async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log("data:", data);
    console.log("id:", id);
    const updateResult = await Customer.updateOne(
      { _id: id },
      {
        $set: {
          name: data.name,
          email: data.email,
          address: data.address,
          age: data.age,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        message: "Customer not found or no images added",
      });
    }

    res
      .status(201)
      .json({ message: "Customer added successfully", updateResult });
  } catch (error) {
    res.status(500).json({ error: "Customer addition failed", error });
  }
};
/**
 * Deletes a customer based on the provided ID from the request parameters.
 *
 */
const deleteOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await Customer.deleteOne({ _id: id });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "Customer not found or no images added",
      });
    }

    res
      .status(201)
      .json({ message: "Customer deleted successfully", deleteResult });
  } catch (error) {
    res.status(500).json({ error: "Customer deletion failed", error });
  }
};

module.exports = {
  addCustomer,
  fetchCustomers,
  fetchOneCustomer,
  updateOneCustomer,
  deleteOneCustomer
};
