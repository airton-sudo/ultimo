import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const revalidate =0

export default async function ListLoja() {
    async function deleteLoja(formData: FormData){
        "use server"
        const id = formData.get("id") as string;
        await sql`DELETE from loja where id=${id}`
        revalidatePath("/admin/loja")
    }
    const { rows } = await sql`SELECT * from loja`;
    return (
        <div>
            <h1 className="text-center text-white">Lista de produto </h1>

            <table>
                <thead>
                    <tr> <td>Nome do produto</td> <td>Valor</td></tr>
                </thead>
                <tbody>
                    {
                        rows.map((loja) => {
                            return (
                                <tr key={loja.id}><td>{loja.product}</td> <td>{loja.value}</td> 
                                <td>
                                    <form >
                                     <input type="text" hidden name="id" value={loja.id}/>   
                                    <button formAction={deleteLoja}>Excluir</button>
                                    </form>
                                
                                </td> 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}