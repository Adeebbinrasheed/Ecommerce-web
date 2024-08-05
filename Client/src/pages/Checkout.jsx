import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { Server } from "../server";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function fetchAddress() {
    try {
      const { data } = await axios.get(`${Server}/api/address/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this address!")) {
      try {
        const { data } = await axios.delete(`${Server}/api/address/single/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchAddress();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-semibold mb-4">Choose Address</h1>
      <button
        onClick={handleShow}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Address
      </button>
      <AddressModal
        handleShow={handleShow}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        fetchAddress={fetchAddress}
      />

      <div className="flex flex-wrap justify-center gap-4">
        {address && address.length > 0 ? (
          address.map((e, i) => (
            <div
              key={i}
              className="w-full md:w-1/3 lg:w-1/4 bg-white border shadow p-4 rounded"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Address - {i + 1}</h2>
                <button
                  onClick={() => deleteHandler(e._id)}
                  className="text-red-500"
                >
                  <MdDelete size={24} />
                </button>
              </div>
              <p className="text-gray-700 mb-2">Address - {e.address}</p>
              <p className="text-gray-700 mb-4">Phone - {e.phone}</p>
              <button
                onClick={() => navigate(`/payment/${e._id}`)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Use Address
              </button>
            </div>
          ))
        ) : (
          <p>No Address Yet</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

const AddressModal = ({
  handleClose,
  show,
  setShow,
  fetchAddress,
}) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Server}/api/address/new`,
        { address, phone },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        fetchAddress();
        setShow(false);
        setAddress("");
        setPhone("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-4 z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Address</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Phone"
              minLength={10}
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
};
