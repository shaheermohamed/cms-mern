import { Button, Modal, Space, Spin, Table } from "antd";
import { useCustomers } from "../services/query/queryCalls";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCustomer,
  updateOneCustomer,
  deleteOneCustomer,
} from "../services/api/apiCalls";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  address: yup.string().required("Address is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const {
    data: customerData,
    isLoading,
    refetch,
    isRefetching,
  } = useCustomers();
  const [isEdit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      responsive: ["md", "lg"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setUpdateId(record._id);
              setValue("name", record.name);
              setValue("email", record.email);
              setValue("age", record.age);
              setValue("address", record.address);
              setEdit(true);
              showModal();
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              setDeleteId(record._id);
              setIsDeleteModalOpen(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
    setEdit(false);
    setUpdateId(null);
  };

  const onSubmit = async (data) => {
    if (isEdit) {
      try {
        const response = await updateOneCustomer({
          token,
          id: updateId,
          data,
        });
        console.log(response);
        refetch();
        setEdit(false);
        reset();
        setUpdateId(null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsModalOpen(false);
      }
    } else {
      try {
        const response = await addCustomer({
          token,
          name: data.name,
          email: data.email,
          address: data.address,
          age: data.age,
        });
        console.log(response);
        refetch();
        reset();
      } catch (error) {
        console.error(error);
      } finally {
        setIsModalOpen(false);
      }
    }
  };
  function deleteCustomer() {
    deleteOneCustomer({
      token,
      id: deleteId,
    });
    refetch();
  }

  return (
    <>
      {/* <NavBar /> */}
      <Modal
        title="Basic Modal"
        open={isDeleteModalOpen}
        onOk={() => {
          deleteCustomer();
          setIsDeleteModalOpen(false);
        }}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <p>Are you sure</p>
      </Modal>
      <Modal
        title={isEdit ? "Edit Customer" : "Add Customer"}
        open={isModalOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  {...register("name")}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="age"
                  autoComplete="age"
                  {...register("age")}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="address"
                  autoComplete="address"
                  {...register("address")}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="w-screen h-full mt-[100px] p-10">
        <div className="flex justify-end mb-5">
          <Button
            onClick={() => {
              showModal();
              setEdit(false);
            }}
          >
            Add Customer
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={customerData}
            loading={isLoading || isRefetching}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
