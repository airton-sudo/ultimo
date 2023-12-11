import { sql } from "@vercel/postgres";
import { useSearchParams } from "next/navigation";

export const revalidate =0

export default function NewLoja({
    searchParams,
  }: {
    searchParams?: {
      url?: string;  
    };
  }){
    
    const urlImage = searchParams?.url || '';

    async function saveLoja(formData: FormData){
        "use server"
        const product = formData.get("product") as string;
        const value = formData.get("value") as string;
        await sql`INSERT INTO loja (product, value) VALUES(${product}, ${value})`
        console.log("Acessou a função")
    }
    return (
        <div>
            <h1 className="text-black text-center text-4xl">Cadastrar Produto</h1>
            <form>
                <input type="text" name="product" placeholder="Digite o nome do produto"/><br/><br/>
                <input type="text" name="value" placeholder="Digite o valor do produto"/> <br/><br/>
                <br/>
                <button formAction={saveLoja} className="text-black">Salvar</button>
            </form>
        </div>

    )
}