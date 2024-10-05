export type TBookingModal = {
    date: string
    endTime: string
    facility: Facility
    isBooked: string
    payableAmount: number
    startTime: string
    user: string
    _id: string
    paymentStatus : string
  }
  
  export type Facility = {
    description: string
    image: string
    isDeleted: boolean
    location: string
    name: string
    pricePerHour: number
    _id: string
  }
  
  export const demoBookingData = {
    date: "2024-09-26",
    endTime: "11:20",
    facility: {
      description: "A large hall suitable for various indoor sports and community events.",
      image: "https://res.cloudinary.com/depy0i4bl/image/upload/v1727528339/aksh-yadav-bY4cqxp7vos-unsplash_hjxn98.jpg",
      isDeleted: false,
      location: "123 Main Street, Springfield",
      name: "Cricket Stadium A",
      pricePerHour: 440,
      _id: "66f7f9a60f56fbeda8d4f6f8"
    },
    isBooked: "confirmed",
    payableAmount: 440,
    startTime: "10:20",
    paymentStatus : 'paid',
    user: "66f43d6fa20f719891536e3f",
    _id: "66f69e84aba4ec680d2f81d9"
  };