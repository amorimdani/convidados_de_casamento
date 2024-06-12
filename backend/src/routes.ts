import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateGuestController } from "./controllers/CreateGuestController"
import { ListGuestsController } from "./controllers/ListGuestsController";
import { DeleteGuestController } from "./controllers/DeleteGuestController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, repy: FastifyReply) => {
        return { ok: true }
    })


    fastify.post("/guest", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateGuestController().handle(request, reply)
    })

    fastify.get("/guests", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListGuestsController().handle(request, reply)
    })

    fastify.delete("/guest", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteGuestController().handle(request, reply)
    })

}