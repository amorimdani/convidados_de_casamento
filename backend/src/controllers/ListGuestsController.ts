import { FastifyReply, FastifyRequest } from "fastify";
import { ListGuestsService } from "../services/ListGuestsService";
class ListGuestsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listguestService = new ListGuestsService();
        const guests = await listguestService.execute();

        reply.send(guests);
    }

}

export { ListGuestsController }