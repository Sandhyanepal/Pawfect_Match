import React, { useEffect, useState } from 'react';
import { User, Mail, PawPrint, Calendar, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import Header from '../component/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const { userDetail } = useSelector(state => state.loginStatus);
    const [requestForm, setRequestForm] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Name cannot be empty');
            return;
        }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/update-name`, {
                userId: userDetail._id,
                fullName: name
            });

            if (response.status === 200) {
                toast.success("Name updated successfully!");
                setIsEditing(false);
                setName('');
            }
        } catch (error) {
            console.error(error.response);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllFormForUser/${userDetail?._id}`);
                setRequestForm(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchForms();
    }, [])

    return (
        <div>
            <Header />
            <div className="w-full max-w-2xl mx-auto p-4">
                {isEditing ? (
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Edit Name</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setName('');
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">User Profile</h2>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Edit Name
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Mail className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Name</p>
                                        <p className="text-sm text-gray-500">{userDetail?.detail?.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Mail className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-gray-500">{userDetail?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <User className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Gender</p>
                                        <p className="text-sm text-gray-500">{userDetail?.preferences?.gender}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Calendar className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Age</p>
                                        <p className="text-sm text-gray-500">{userDetail?.preferences?.age}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <PawPrint className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Breed</p>
                                        <p className="text-sm text-gray-500">{userDetail?.preferences?.breed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full max-w-2xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Meet Forms</h2>
                        {requestForm && requestForm.length > 0 ? (
                            <div className="space-y-4">
                                {requestForm.map((form, index) => (
                                    <div key={form._id} className="p-4 border rounded-md bg-gray-50">
                                        <p className="text-sm font-medium">Full Name: <span className="text-gray-600">{form.fullName}</span></p>
                                        <p className="text-sm font-medium">Status: <span className="text-gray-600">{form?.status}</span></p>
                                        <p className="text-sm font-medium">Submission Date: <span className="text-gray-600">{new Date(form.submissionDate).toLocaleString()}</span></p>

                                        <p className="text-sm font-medium flex items-center gap-2">View Pet :
                                            <NavLink to={`/pet/${form.petId}`}>
                                                <Eye />
                                            </NavLink>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No forms found.</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;