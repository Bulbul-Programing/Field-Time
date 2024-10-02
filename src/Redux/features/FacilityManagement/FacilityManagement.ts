import { baseApi } from "../../api/baseApi";

const facilityManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFacility: builder.query({
      query: (args) => {
        const param = new URLSearchParams()
        if (args) {
          const key = Object.keys(args)
          const value = Object.values(args)
          for (let index = 0; index < key.length; index++) {
            param.append(key[index], value[index] as string)
          }
        }
        return {
          url: `/facility`,
          method: "GET",
          params: param
        };
      },
      providesTags: ['facility']
    }),
    facilityLength: builder.query({
      query: () => {
        return {
          url: `/facility/length`,
          method: "GET",
        };
      },
      providesTags: ['booking']
    }),
    facilityDetails: builder.query({
      query: (id) => {
        return {
          url: `/facility/details/${id}`,
          method: "GET",
        };
      }
    }),
    createFacility : builder.mutation({
      query : (args) => {
        
        return {
          url : '/facility',
          method : "POST",
          body : args
        }
      },
      invalidatesTags: ['facility']
    }),
    updateFacility : builder.mutation({
      query : (args) => {
        
        return {
          url : `/facility/${args.id}`,
          method : "PUT",
          body : args.data
        }
      },
      invalidatesTags: ['facility']
    })
  }),
});

export const { useAllFacilityQuery, useFacilityLengthQuery, useFacilityDetailsQuery , useCreateFacilityMutation, useUpdateFacilityMutation} = facilityManagementApi;
