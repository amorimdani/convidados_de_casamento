import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api"

interface GuestProps {
  id: string;
  name: string;
  email: string;
  convites: string;
  tipo: string;
  referencia: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}
export default function App() {

  const [guests, setGuests] = useState<GuestProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const convitesRef = useRef<HTMLInputElement | null>(null)
  const tipoRef = useRef<HTMLInputElement | null>(null)
  const referenciaRef = useRef<HTMLInputElement | null>(null)
   



  useEffect(() => {
    loadGuests();
  }, [])

  async function loadGuests() {
    const response = await api.get("/guests")
    setGuests(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value || !convitesRef.current?.value || !tipoRef.current?.value || !referenciaRef.current?.value) return;
    const response = await api.post("/guest", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      convites: convitesRef.current?.value,
      tipo: tipoRef.current?.value,
      referencia: referenciaRef.current?.value
    })

    setGuests(allGuests => [...allGuests, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
    convitesRef.current.value = ""
    tipoRef.current.value = ""
    referenciaRef.current.value = ""


  }

  async function handleDelete(id: string) {
    try{
      await api.delete("/guest", {
        params: {
          id: id,
        }
      })

      const allGuests = guests.filter( (guest) => guest.id !== id)
      setGuests(allGuests)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Convidados de casamento </h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">E-mail:</label>
          <input
            type="email"
            placeholder="Digite o e-mail do convidado"
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <label className="font-medium text-white">Quantidade de Convites:</label>
          <input
            type="number"
            placeholder="Digite o número de convites para esse convidado"
            className="w-full mb-5 p-2 rounded"
            ref={convitesRef}
          />

          <label className="font-medium text-white">Tipo de Convidado:</label>
          <input
            type="text"
            placeholder="Digite o tipo do convidado (Família ou Amigos)"
            className="w-full mb-5 p-2 rounded"
            ref={tipoRef}
          />

          <label className="font-medium text-white">Referência:</label>
          <input
            type="text"
            placeholder="Digite de onde conhece o convidado"
            className="w-full mb-5 p-2 rounded"
            ref={referenciaRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {guests.map((guest) => (
            <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
              key={guest.id}>
              <p><span className="font-medium">Nome:</span> {guest.name} </p>
              <p><span className="font-medium">E-mail:</span> {guest.email} </p>
              <p><span className="font-medium">Quantidade de Convites:</span>{guest.convites}</p>
              <p><span className="font-medium">Tipo de Convidado:</span>{guest.tipo}</p>
              <p><span className="font-medium">Referencia:</span>{guest.referencia}</p>
              <p><span className="font-medium">Status:</span> {guest.status ? "ATIVO" : "INATIVO"} </p>

              <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(guest.id) }>
                <FiTrash size={18} color="#FFF" />
              </button>

            </article>
          ))}
        </section>
      </main>
    </div>)
}