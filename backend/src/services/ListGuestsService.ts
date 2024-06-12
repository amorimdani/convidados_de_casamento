import prismaClient from "../prisma";

class ListGuestsService{
    async execute(){

       const guests = await prismaClient.guests.findMany() 

       return guests;

    }
}

export { ListGuestsService }