import { useAllFacilityQuery, useFacilityLengthQuery } from "../../Redux/features/FacilityManagement/FacilityManagement";
import { TFacility } from "../../Types/TFacility";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "../../Hooks/Debounce/Debounce";
import { FaSearch } from "react-icons/fa";

export type TFilter = {
  searchTerm?: string;
  sort?: string;
  maxValue?: string;
  minValue?: string;
  category?: string;
  page?: number;
  limit?: number;
  fields?: string;
  debounceValue?: { searchTerm?: string }
};

type TDebounceValue = {
  searchTerm?: string
}

const Facility = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<TDebounceValue>({});
  const { debounceValue, loading } = useDebounce(searchValue);
  const [sortFelid, setSortFelid] = useState<TFilter>({ limit : itemPerPage, page : currentPage, sort : "name"});
  const { data, isLoading } = useAllFacilityQuery(sortFelid)
  const { data : dataForPagination, isLoading : isLoadingTwo} = useFacilityLengthQuery(undefined)

  useEffect(() => {
    if (debounceValue.searchTerm) {
      setSortFelid({ ...sortFelid, searchTerm: debounceValue?.searchTerm })
    }
    else {
      setSortFelid({ limit : itemPerPage, page : currentPage, sort : "name"})
    }
  }, [loading])


  if (isLoading || isLoadingTwo) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setSearchValue({ searchTerm: e.currentTarget.value });
    } else {
      setSearchValue({});
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center my-10">
        <div className="my-5">
          <h1 className="text-4xl font-semibold text-center my-2">
            No Data Found !
          </h1>
          <img
            className="w-[500px] mx-auto "
            src="https://i.ibb.co/74kjdxL/55024593-9264822.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }

  const numberOfPage = Math.ceil(Number(dataForPagination?.data.length) / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handleMinMax = (e: any) => {
    e.preventDefault();
    const minValue = e.currentTarget.minimum.value;
    const maxValue = e.currentTarget.maximum.value;

    if (!minValue || !maxValue) {
      return toast.error("Please Set Price Value");
    }
    if (Number(maxValue) <= Number(minValue)) {
      return toast.error("Please provide grater then value form minimum value");
    }
    setSortFelid({
      ...sortFelid,
      minValue: minValue,
      maxValue: maxValue,
    });
    setCurrentPage(1);
  };

  const handleNextPrePage = (btn: string) => {
    if (btn === "next") {
      if (currentPage < numberOfPage) {
        setCurrentPage(currentPage + 1);
        setSortFelid({
          ...sortFelid,
          page: currentPage + 1,
          limit: itemPerPage,
        });
      }
    }
    if (btn === "pervious") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        setSortFelid({
          ...sortFelid,
          page: currentPage - 1,
          limit: itemPerPage,
        });
      }
    }
  };

  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage as number);
    setSortFelid({ ...sortFelid, page: currentPage, limit: itemPerPage });
  };

  const handlePageViewContent = (e: any) => {
    setCurrentPage(1),
      setSortFelid({ ...sortFelid, page: 1, limit: parseInt(e.target.value) });
    setItemPerPage(parseInt(e.target.value));
  };
  return (
    <div className="">
      <div className=" bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/depy0i4bl/image/upload/v1727635027/image8s20_q5xpfq.jpg')]">
        <div className=" px-5 md:px-10 lg:px-20 w-full md:w-full lg:w-1/2 py-10 md:py-20 lg:py-36 bg-gradient-to-r from-slate-800 bg-opacity-50">
          <p className="text-sm md:text-base lg:text-base text-white font-medium">Facility</p>
          <h1 className=" text-2xl md:text-3xl lg:text-4xl py-2 md:py-3 lg:my-3 font-bold text-white">Enjoy All Facilities</h1>
        </div>
      </div>
      <div className="ml-5 md:ml-5 lg:mx-5">
        <div className="flex items-center gap-x-5">
          <button
            className="btn my-8 block md:block lg:hidden "
            onClick={() =>
              (document.getElementById(
                "my_modal_6"
              ) as HTMLDialogElement)!.showModal()!
            }
          >
            <div className="flex space-x-3 justify-center items-center">
              <p className="text-lg ">Filter</p>
              <img
                className="w-[20px]"
                src="https://i.ibb.co/SsGYLDx/setting-10302722.png"
                alt=""
              />
            </div>
          </button>
          <div className="block md:block lg:hidden">
            <div className="relative">
              <input onChange={handleSearch} placeholder="Search facility hare" className="p-2 w-52 md:w-60 lg:w-60 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="" id="" />
              <FaSearch className="absolute text-slate-500 hover:text-black top-3 cursor-pointer right-3"></FaSearch>
            </div>
          </div>
        </div>
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex flex-wrap justify-center items-center">
              <div className="flex gap-x-5">
                <div className="dropdown w-36">
                  <div tabIndex={10} role="button" className="btn w-full ">
                    Sort by
                  </div>
                  <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            sort: "name",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        A To Z
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            sort: "-name",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Z To A
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            sort: "-price",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        High to Low
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            sort: "price",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Low to High
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="dropdown w-56">
                  <div tabIndex={0} role="button" className="btn w-full ">
                    Sort by Category
                  </div>
                  <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            category: "Indoor Plants",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Indoor Plants
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            category: "Outdoor Plants",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Outdoor Plants
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            category: "Plant Care & Accessories",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Plant Care & Accessories
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            category: "Pots & Planters",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Pots & Planters
                      </button>
                    </li>
                    <li className="mb-2 w-full border rounded-lg selected">
                      <button
                        onClick={() => {
                          setSortFelid({
                            ...sortFelid,
                            category: "Gardening Tools & Supplies",
                            page: 1,
                            limit: itemPerPage,
                          });
                          setCurrentPage(1);
                        }}
                      >
                        Gardening Tools & Supplies
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="my-3">
                <form
                  action=""
                  onSubmit={handleMinMax}
                  className=" flex space-x-2 md:space-x-5"
                >
                  <input
                    type="number"
                    min="1"
                    className="p-2 w-32 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500"
                    placeholder="Price From"
                    name="minimum"
                  />
                  <input
                    type="number"
                    className="p-2 w-32 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500"
                    placeholder="Price To"
                    name="maximum"
                  />

                  <input
                    type="submit"
                    className="btn w-28 p-4 bg-[#3498DB] text-center text-white hover:text-black"
                    name="Search"
                    id=""
                    value="Search"
                  />
                </form>
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={() => setSortFelid({ page: 1, limit: itemPerPage })}
                className="btn mr-3 bg-red-400 text-white hover:text-black"
              >
                Clear Filter
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}

                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className=" my-10 border hidden md:hidden lg:block rounded-lg px-4 py-5">
          <div className=" flex justify-center items-center gap-x-5">
            <h1 className="text-xl font-semibold text-center">Filter</h1><div className="relative">
              <input onChange={handleSearch} placeholder="Search facility hare" className="p-2 w-60 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500" type="text" name="" id="" />
              <FaSearch className="absolute text-slate-500 hover:text-black top-3 cursor-pointer right-3"></FaSearch>
            </div>
          </div>
          <div className="flex space-x-8 justify-center items-center">
            <div className="dropdown w-36">
              <div tabIndex={0} role="button" className="btn w-full ">
                Sort by
              </div>
              <ul className="dropdown-content menu w-full bg-base-100 rounded-box z-[1] p-2 shadow">
                <li className="mb-2 w-full border rounded-lg selected">
                  <button
                    onClick={() => {
                      setSortFelid({
                        ...sortFelid,
                        sort: "name",
                        page: 1,
                        limit: itemPerPage,
                      });
                      setCurrentPage(1);
                    }}
                  >
                    A To Z
                  </button>
                </li>
                <li className="mb-2 w-full border rounded-lg">
                  <button
                    onClick={() => {
                      setSortFelid({
                        ...sortFelid,
                        sort: "-name",
                        page: 1,
                        limit: itemPerPage,
                      });
                      setCurrentPage(1);
                    }}
                  >
                    Z To A
                  </button>
                </li>
                <li className="mb-2 w-full border rounded-lg">
                  <button
                    onClick={() => {
                      setSortFelid({
                        ...sortFelid,
                        sort: "-pricePerHour",
                        page: 1,
                        limit: itemPerPage,
                      });
                      setCurrentPage(1);
                    }}
                  >
                    High to Low
                  </button>
                </li>
                <li className="mb-2 w-full border rounded-lg">
                  <button
                    onClick={() => {
                      setSortFelid({
                        ...sortFelid,
                        sort: "pricePerHour",
                        page: 1,
                        limit: itemPerPage,
                      });
                      setCurrentPage(1);
                    }}
                  >
                    Low to High
                  </button>
                </li>
              </ul>
            </div>
            <div className="my-3">
              <form action="" onSubmit={handleMinMax} className=" flex space-x-5">
                <input
                  type="number"
                  min="1"
                  className="p-2 w-32 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500"
                  placeholder="Price From"
                  name="minimum"
                />
                <input
                  type="number"
                  className="p-2 w-32 outline-none border-2 focus:border-[#3498DB] rounded-lg text-slate-500"
                  placeholder="Price To"
                  name="maximum"
                />

                <input
                  type="submit"
                  className="btn w-28 p-4 bg-[#3498DB] hover:bg-blue-500  text-center text-white "
                  name="Search"
                  id=""
                  value="Search"
                />
              </form>
            </div>
            <button
              onClick={() => setSortFelid({ page: 1, limit: itemPerPage })}
              className="btn bg-red-400 text-white hover:text-black"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
      <div>
        {
          loading ? <div className="flex justify-center my-20">
            <span className="loading loading-dots loading-lg"></span>
          </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 md:m-5 lg:m-10">
            {
              data?.data?.map((facility: TFacility) => (
                <Link key={facility._id} to={`/facilityDetails/${facility._id}`} className="bg-slate-100 hover:outline outline-blue-400 cursor-pointer rounded-lg">
                  <img className="w-full rounded-lg h-[150px] md:h-[220px] lg:h-[300px]" src={facility.image} alt="" />
                  <div className="">
                    <div className="flex gap-x-1 items-center bg-gradient-to-r rounded-tr-full rounded-br-full text-white px-3 from-blue-500 to-[#5a9cf3] w-36 md:w-40 lg:w-40 my-3 py-1">
                      <p className=" md:text-xl lg:text-2xl font-medium ">${facility.pricePerHour}</p><span className="text-sm">/ Per Hour</span>
                    </div>

                    <div className="px-2 pb-3 pt-0">
                      <p className=" md:text-xl lg:text-2xl font-semibold mt-2 mb-1">{facility.name}</p>
                      <p className="block text-sm lg:text-base md:hidden lg:block text-slate-500">{facility.description.length > 55 ? facility.description.slice(0, 55) : facility.description}{facility.description.length > 55 ? '.....' : ''}</p>
                      <p className="text-sm hidden md:block lg:hidden text-slate-500">{facility.description.length > 50 ? facility.description.slice(0, 50) : facility.description}{facility.description.length > 50 ? '.....' : ''}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        }
      </div>
      <div className="my-10">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button onClick={() => handleNextPrePage("pervious")} className="btn">
            Previous
          </button>
          {pages.map((page) => (
            <button
              onClick={() => handlePagination(page + 1)}
              key={page}
              className={`btn ${page + 1 === currentPage &&
                "bg-[#5a9cf3] hover:bg-[#468eed] text-white"
                }`}
            >
              {page + 1}
            </button>
          ))}
          <button className="btn" onClick={() => handleNextPrePage("next")}>
            Next
          </button>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium ml-5 text-[#5a9cf3]">
              Page pre view
            </p>
            <select
              className="w-20 border p-2 rounded"
              defaultValue={itemPerPage}
              onChange={handlePageViewContent}
              name=""
              id=""
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
