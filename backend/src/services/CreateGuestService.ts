import prismaClient from "../prisma";

interface CreateGuestProps{
    name: string;
    email: string;
    convites: string;
    tipo: string;
    referencia: string;
}
class CreateGuestService {
    async execute({ name, email, convites, tipo, referencia }: CreateGuestProps) {

        if(!name || !email){
            throw new Error("Preencha todos os campos!")
        }



        const guest = await prismaClient.guests.create({
            data:{
                name,
                email,
                convites,
                tipo,
                referencia,
                status: true
            }
        })
        return guest
    }
}

export { CreateGuestService }