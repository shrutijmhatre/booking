interface bookingRequestDTO{
    title:string;
    description:string;
}

interface userDTO{
    userId: string;
    name: string;
    email: string;
    isAdmin :boolean;
}
    

export type {bookingRequestDTO, userDTO}