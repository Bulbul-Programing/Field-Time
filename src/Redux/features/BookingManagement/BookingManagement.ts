import { baseApi } from "../../api/baseApi";

const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userAllBooking: builder.query({
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
          url: `/bookings/user`,
          method: "GET",
          params: param
        };
      },
      providesTags: ['booking']
    }),
    
    adminAllBooking: builder.query({
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
          url: `/bookings`,
          method: "GET",
          params: param
        };
      },
      providesTags: ['booking']
    }),

    createBooking: builder.mutation({
      query: (args) => {
        return {
          url: "/bookings",
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ['booking']
    }),
    updateBooking: builder.mutation({
      query: (args) => {
        return {
          url: "/bookings/updateBooing",
          method: "PUT",
          body: args,
        };
      },
      invalidatesTags: ['booking']
    }),
    checkAvailability: builder.query({
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
          url: `/check-availability`,
          method : 'GET',
          params : param
        }
      }
    })

  }),
});

export const {useAdminAllBookingQuery, useUserAllBookingQuery,useCreateBookingMutation, useUpdateBookingMutation, useCheckAvailabilityQuery} = bookingManagementApi;
