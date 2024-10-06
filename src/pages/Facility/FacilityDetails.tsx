import { Link, useParams } from 'react-router-dom';
import { useFacilityDetailsQuery } from '../../Redux/features/FacilityManagement/FacilityManagement';

const FacilityDetails = () => {
    const { id } = useParams()
    const { data, isLoading } = useFacilityDetailsQuery(id, { skip: !id })

    if (isLoading) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (

        <div className='mx-5'>
            <div className=" my-5  max-w-5xl mx-auto p-5 md:p-10 lg:p-10  shadow-2xl rounded-3xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img
                            src={data?.data?.image}
                            alt={data?.data?.name}
                            className="w-full md:h-72 lg:h-96 object-cover rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300"
                        />
                        <h1 className="absolute bottom-0 md:bottom-0 w-full lg:bottom-0 text-xl md:text-2xl lg:text-4xl font-extrabold text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg shadow-lg">
                            {data?.data?.name}
                        </h1>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="space-y-6">
                            <p className="text-xl text-gray-700 leading-relaxed">{data?.data?.description}</p>

                            <div className="text-lg text-gray-800 font-semibold space-y-4">
                                <p>
                                    <span className="text-indigo-600 font-bold">Location:</span> {data?.data?.location}
                                </p>
                                <p>
                                    <span className="text-indigo-600 font-bold">Price per Hour:</span> ${data?.data?.pricePerHour}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link to={`/facilityBooking/${data?.data?._id}`} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-[#5a9cf3] text-white text-lg font-bold rounded-full shadow-lg hover:bg-gradient-to-l hover:from-[#5a9cf3] hover:to-blue-600 transition-transform transform hover:scale-105">
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute -top-20 -right-16 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-400 opacity-50 rounded-full blur-3xl"></div>
            </div>
        </div>

    );
};

export default FacilityDetails;