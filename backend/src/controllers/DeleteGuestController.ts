import {FastifyRequest, FastifyReply } from "fastify"
import { DeleteGuestService } from "../services/DeleteGuestService"


class DeleteGuestController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const{ id } = request.query as { id: string}
        const guestService = new DeleteGuestService();
        const guest = await guestService.execute({ id })

        reply.send(guest);
    }
}

export { DeleteGuestController }