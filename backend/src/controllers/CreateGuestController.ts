import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGuestService } from "../services/CreateGuestService";

class CreateGuestController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, convites, tipo, referencia } = request.body as { name: string, email: string, convites: string, tipo: string, referencia: string };


        const guestService = new CreateGuestService()

        const guest = await guestService.execute({ name, email, convites, tipo, referencia });

        reply.send(guest)
    }
}

export { CreateGuestController }