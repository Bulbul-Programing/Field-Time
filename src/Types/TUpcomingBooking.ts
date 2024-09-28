export type TFacility = {
    _id: string
    name: string
    description: string
    pricePerHour: number
    location: string
    isDeleted: boolean
    __v: number
  }
  

export type TUpcomingBooking = {
    _id: string
    facility: TFacility
    date: string
    startTime: string
    endTime: string
    payableAmount: number
    user: string
    isBooked: string
  }
  