import prismaClient from "../prisma";
interface DeleteGuestProps{
    id: string;

}
class DeleteGuestService{
    async execute({ id }: DeleteGuestProps){
        if(!id){
            throw new Error("Informe o id para deletar um convidado!")
        }

        const findGuest = await prismaClient.guests.findFirst({
            where:{
                id: id
            }
        })

        if(!findGuest){
            throw new Error("Id do convidado não existe.")
        }

        await prismaClient.guests.delete({
            where:{
                id: findGuest.id
            }
        })

        return { message: "Convidado deletado com sucesso!"}
    }
}

export { DeleteGuestService }