import { useState } from "react";
import { useAllFacilityQuery } from "../../../Redux/features/FacilityManagement/FacilityManagement";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { TFacility } from "../../../Types/TFacility";
import { IoLocationOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const AdminFacility = () => {
    const { data } = useAllFacilityQuery(undefined)
    
    const [facilities, setFacilities] = useState([
        {
            _id: '66f7f9a60f56fbeda8d4f6f8',
            name: 'Cricket Stadium A',
            description: 'A large hall suitable for various indoor sports and community events.',
            pricePerHour: 440,
            location: '123 Main Street, Springfield',
            image: 'https://res.cloudinary.com/depy0i4bl/image/upload/v1727528339/aksh-yadav-bY4cqxp7vos-unsplash_hjxn98.jpg',
            isDeleted: false,
        },
        // More example data can be added here...
    ]);

    const handleDelete = (id : string) => {
        // Logic for deleting facility
        const updatedFacilities = facilities.filter(facility => facility._id !== id);
        setFacilities(updatedFacilities);
    };

    const handleEdit = (id : string) => {
        // Logic for editing a facility (Open modal for edit)
    };

    const handleAddNewFacility = () => {
        // Logic for adding a new facility (Open modal for adding)
    };
    return (
        <div>
            <div className="container mx-auto px-4 py-2 md:py-5 lg:py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className=" text-xl md:text-3xl lg:text-4xl font-bold">Facilities Management</h1>
                    <button
                        onClick={handleAddNewFacility}
                        className="btn-sm  btn bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                    >
                        <FaPlus />
                        Add Facility
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Price/Hour</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((facility :TFacility) => (
                                <tr key={facility._id}>
                                    <td className="min-w-60">
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img
                                                        src={facility.image}
                                                        alt={facility.name}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{facility.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="min-w-60">
                                        {facility.description}
                                    </td>
                                    <td className="min-w-52 flex items-center gap-x-2"><IoLocationOutline className="text-xl text-red-500" /> {facility.location}</td>
                                    <td className="min-w-32"><span className="flex items-center gap-x-2"><FaMoneyBill1Wave className="text-blue-500"/> ${facility.pricePerHour}</span></td>
                                    <td className="text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(facility._id)}
                                                className="btn bg-blue-500 hover:bg-blue-600 btn-sm"
                                            >
                                                <FaEdit className="text-white " />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(facility._id)}
                                                className="btn btn-error btn-sm"
                                            >
                                                <FaTrash className="text-white" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminFacility;