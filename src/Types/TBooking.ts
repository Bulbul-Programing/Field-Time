type TUser = { 
    name: string
    email: string
    phone: string
    password: string
    role: string
    address: string
    profileImage: string
}

export type TBooking = {
    date: string
    endTime: string
    facility: TFacility
    isBooked: string
    payableAmount: number
    startTime: string
    user: TUser
    _id: string
  }
  
  export type TFacility = {
    description: string
    image: string
    isDeleted: boolean
    location: string
    name: string
    pricePerHour: number
    _id: string
  }
