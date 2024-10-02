import React, { useState } from "react";
import { useAllFacilityQuery, useCreateFacilityMutation, useDeleteFacilityMutation, useUpdateFacilityMutation } from "../../../Redux/features/FacilityManagement/FacilityManagement";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { TFacility } from "../../../Types/TFacility";
import { IoLocationOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { toast } from "sonner";
import { hostSingleImage } from "../../../Utils/ImageUpload";
import Swal from 'sweetalert2'

const AdminFacility = () => {
    const { data, isLoading } = useAllFacilityQuery(undefined)
    const [updateFacilityId, setUpdateFacilityId] = useState('')
    const [updateFacilityInfo, setUpdateFacilityInfo] = useState<TFacility | any>()
    const [createFacilityImage, setCreateFacilityImage] = useState<File | any>()
    const [updateFacilityImage, setUpdateFacilityImage] = useState<File | any>()
    const [createFacility] = useCreateFacilityMutation()
    const [updateFacility] = useUpdateFacilityMutation()
    const [deleteFacility] = useDeleteFacilityMutation()
    const [loading, setLoading] = useState(false)

    const handleDelete = async (id: string) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteFacility(id)
                    if (res?.data?.success) {
                        toast.success(`${res?.data?.massage}`)
                        setLoading(false),
                            (document.getElementById("modalForUpdateFacility") as HTMLDialogElement)!.close()!
                    }
                    if (res?.error) {
                        (res.error as any).data.errorSources.map((err: any) => (
                            toast.error(`${err.message}`)
                        ))
                        setLoading(false)
                    }
                } catch (err: any) {
                    console.log(err);
                    setLoading(false)
                }
            }
        });
    };

    const handleCreateFacility = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        setLoading(true)
        let imageLink
        if (target.image.files?.length > 0) {
            const res = await hostSingleImage([target.image.files[0]])
            imageLink = res[0]
        }

        const facilityInfo = {
            name: target.facilityName.value,
            description: target.facilityDescription.value,
            pricePerHour: Number(target.pricePerHour.value),
            location: target.facilityLocation.value,
            image: imageLink || ''
        }

        try {
            const res = await createFacility(facilityInfo)
            if (res?.data?.success) {
                toast.success(`${res?.data?.massage}`)
                setLoading(false),
                    (document.getElementById("modalForCreateFacility") as HTMLDialogElement)!.close()!
            }
            if (res?.error) {
                (res.error as any).data.errorSources.map((err: any) => (
                    toast.error(`${err.message}`)
                ))
                setLoading(false)
            }
        }
        catch (err: any) {
            console.log(err);
            setLoading(false)
        }

    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            setCreateFacilityImage(URL.createObjectURL(e.currentTarget.files[0]))
        }
    }
    const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            setUpdateFacilityImage(URL.createObjectURL(e.currentTarget.files[0]))
        }
    }

    const handleEditModal = (id: string) => {
        const isExistFacility = data.data.find((element: TFacility) => element._id == id);
        setUpdateFacilityInfo(isExistFacility)
        setUpdateFacilityId(id),
            (document.getElementById('modalForUpdateFacility') as HTMLDialogElement)!.showModal()
    };

    const handleUpdateFacility = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        setLoading(true)
        let imageLink
        if (target.image.files?.length > 0) {
            const res = await hostSingleImage([target.image.files[0]])
            imageLink = res[0]
        }

        const facilityInfo = {
            id: updateFacilityId,
            data: {
                name: target.facilityName.value,
                description: target.facilityDescription.value,
                pricePerHour: Number(target.pricePerHour.value),
                location: target.facilityLocation.value,
                image: imageLink ? imageLink : updateFacilityInfo.image
            }
        }

        try {
            const res = await updateFacility(facilityInfo)
            if (res?.data?.success) {
                toast.success(`${res?.data?.massage}`)
                setLoading(false),
                    (document.getElementById("modalForUpdateFacility") as HTMLDialogElement)!.close()!
            }
            if (res?.error) {
                (res.error as any).data.errorSources.map((err: any) => (
                    toast.error(`${err.message}`)
                ))
                setLoading(false)
            }
        }
        catch (err: any) {
            console.log(err);
            setLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }
    return (
        <div>
            <div className="container mx-auto px-4 py-2 md:py-5 lg:py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className=" text-xl md:text-3xl lg:text-4xl font-bold">Facilities Management</h1>
                    <button
                        onClick={() => (document.getElementById('modalForCreateFacility') as HTMLDialogElement)!.showModal()}
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
                            {data?.data?.map((facility: TFacility) => (
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
                                    <td className="min-w-32"><span className="flex items-center gap-x-2"><FaMoneyBill1Wave className="text-blue-500" /> ${facility.pricePerHour}</span></td>
                                    <td className="text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleEditModal(facility._id)}
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
                {/* Modal for crete Facility */}
                <dialog id="modalForCreateFacility" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className=" md:mx-5 lg:mx-10 relative">
                            <img className="w-1/2 border shadow-md mx-auto rounded-lg mb-3" src={createFacilityImage} alt="" />
                            <form onSubmit={handleCreateFacility} action="">
                                <label className="text-sm" htmlFor="facilityName">Facility Name</label> <br />
                                <input required className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="facilityName" id="facilityName" placeholder="Facility Name" />
                                <label className="text-sm" htmlFor="pricePerHour">Facility Price per hour</label> <br />
                                <input required step="any" className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="number" name="pricePerHour" id="pricePerHour" placeholder="Facility Price per hour" />
                                <label className="text-sm" htmlFor="facilityLocation">Facility Location</label> <br />
                                <input required className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="facilityLocation" id="facilityLocation" placeholder="Facility Location" />
                                <label className="text-sm" htmlFor="facilityDescription">Facility Description</label> <br />
                                <textarea required className="p-2 w-full mb-3 mt-1 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" name="facilityDescription" id="facilityDescription" placeholder="Facility Description" />

                                <label className="text-sm" htmlFor="image">Select Image</label> <br />
                                <input required className="p-2 w-full mb-3 mt-1 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" onChange={handleImage} type="file" accept="image/png, image/jpeg" name="image" id="image" />

                                {
                                    loading ? <div className="btn bg-blue-500 hover:bg-blue-600 text-white"><span className="loading loading-spinner loading-md"></span></div> : <input className="btn bg-blue-500 hover:bg-blue-600 text-white" type="submit" name="" id="" />
                                }

                            </form>
                            <button className=" absolute bottom-0 left-24  btn bg-red-500 hover:bg-red-600 text-white" onClick={() => (document.getElementById("modalForCreateFacility") as HTMLDialogElement)!.close()!}>Close</button>
                        </div>
                    </div>
                </dialog >
                <dialog id="modalForUpdateFacility" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className=" md:mx-5 lg:mx-10 relative">
                            <img className="w-1/2 border shadow-md mx-auto rounded-lg mb-3" src={updateFacilityImage ? updateFacilityImage : updateFacilityInfo?.image} alt="" />
                            <form onSubmit={handleUpdateFacility} action="">
                                <label className="text-sm" htmlFor="facilityName">Facility Name</label> <br />
                                <input defaultValue={updateFacilityInfo?.name} required className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="facilityName" id="facilityName" placeholder="Facility Name" />
                                <label className="text-sm" htmlFor="pricePerHour">Facility Price per hour</label> <br />
                                <input defaultValue={updateFacilityInfo?.pricePerHour} required step="any" className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="number" name="pricePerHour" id="pricePerHour" placeholder="Facility Price per hour" />
                                <label className="text-sm" htmlFor="facilityLocation">Facility Location</label> <br />
                                <input defaultValue={updateFacilityInfo?.location} required className="p-2 w-full mt-1 mb-3 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="facilityLocation" id="facilityLocation" placeholder="Facility Location" />
                                <label className="text-sm" htmlFor="facilityDescription">Facility Description</label> <br />
                                <textarea defaultValue={updateFacilityInfo?.description} required className="p-2 w-full mb-3 mt-1 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" name="facilityDescription" id="facilityDescription" placeholder="Facility Description" />

                                <label className="text-sm" htmlFor="image">Select Image</label> <br />
                                <input className="p-2 w-full mb-3 mt-1 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" onChange={handleUpdateImage} type="file" accept="image/png, image/jpeg" name="image" id="image" />

                                {
                                    loading ? <div className="btn bg-blue-500 hover:bg-blue-600 text-white"><span className="loading loading-spinner loading-md"></span></div> : <input className="btn bg-blue-500 hover:bg-blue-600 text-white" type="submit" name="" id="" />
                                }

                            </form>
                            <button className=" absolute bottom-0 left-24  btn bg-red-500 hover:bg-red-600 text-white" onClick={() => (document.getElementById("modalForUpdateFacility") as HTMLDialogElement)!.close()!}>Close</button>
                        </div>
                    </div>
                </dialog>
            </div >
        </div >
    );
};

export default AdminFacility;