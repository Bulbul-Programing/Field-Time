import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userAllBooking: builder.query({
      query: (args) => {
        const param = new URLSearchParams()
        if(args){
            const key = Object.keys(args)
            const value = Object.values(args)
            for(let index = 0 ; index < key.length; index++){
                param.append(key[index], value[index] as string)
            }
        }
        return {
          url: `/bookings/user`,
          method: "GET",
          params : param
        };
      },
    }),
    registerUser: builder.mutation({
      query: (args) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: args,
        };
      },
    })
  }),
});

export const { useUserAllBookingQuery , useRegisterUserMutation} = userManagementApi;
