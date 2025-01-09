import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Individual"); // Default role is 'Individual'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    orgName: "",
    licenseNumber: "",
  });

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const payload = {
      email: formData.email,
      password: formData.password,
      role,
      ...(role === "Individual" && {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
      }),
      ...(role === "Organization" && {
        orgName: formData.orgName,
        licenseNumber: formData.licenseNumber,
      }),
    };

    try {
      // Make API request
      const response = await axios.post(
        "http://localhost:5002/register",
        payload
      );
      navigate("/login");
      toast.success("Successfully Registered");
      // alert(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="w-full bg-gray-100 flex items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="md:w-1/2 bg-white m-auto w-3/4"
        style={{ boxShadow: "0 41.8px 33.4px rgba(0, 0, 0, 0.086)" }}
      >
        <h2
          className="text-3xl text-center pt-8 font-bold"
          style={{ fontFamily: "lato" }}
        >
          Register
        </h2>

        {/* form */}
        <form onSubmit={handleSubmit} className="sm:p-10 p-5">
          {/* Role Selection */}
          <div>
            <label className="pr-2 text-lg">
              Choose a Role how you want to Register:
            </label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="p-1 border-2 rounded-md"
            >
              <option value="Individual">Individual</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
          {/* Conditional Fields for Normal Users */}
          {role === "Individual" && (
            <>
              <div>
                <label htmlFor="fullName" className="text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border-2 py-1 pl-2 my-1"
                  required
                />
              </div>
            </>
          )}

          {/* Conditional Fields for Organizations */}
          {role === "Organization" && (
            <>
              <div>
                <label htmlFor="orgName" className="text-lg">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="orgName"
                  placeholder="Organization Name"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  className="w-full border-2 py-1 pl-2 my-1"
                  required
                />
              </div>
            </>
          )}

          {/* Common Fields */}
          <div>
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          {/* Conditional Fields for Normal Users */}
          {role === "Individual" && (
            <>
              <div>
                <label htmlFor="address" className="text-lg">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border-2 py-1 pl-2 my-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-lg">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-2 py-1 pl-2 my-1"
                  required
                />
              </div>
            </>
          )}

          {/* Conditional Fields for Organizations */}
          {role === "Organization" && (
            <>
              <div>
                <label htmlFor="licenseNumber" className="text-lg">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full border-2 py-1 pl-2 my-1"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-5 bg-gray-700 text-white py-2 rounded-lg"
          >
            Register
          </button>
        </form>
        <p className="pl-5 sm:pl-10 pb-5">
          Already have an account?{" "}
          <Link to="/login" className="italic text-gray-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
