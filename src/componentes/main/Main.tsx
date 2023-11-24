import { useEffect, useState } from "react";
import Filme from "../filme/Filme";
import './Main.css'
import axios from "axios";

type FilmeDTO = {
    id:number, 
    titulo:string,
    descricao:string,
    imagem:string
}
export default function Main(){

    const [texto,setTexto] = useState("")
    const [filmes, setFilmes]= useState<FilmeDTO[]>([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/filmes');
            setFilmes(response.data);
          } catch (error) {
            console.log('Erro ao buscar dados:', error);
          }
        };
    
        fetchData();
      }, []);
   

     
    //A função recebe um atributo chamado e de "event"
    function mudaTexto(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value)
        setTexto(e.target.value)
    }
    return(
        <>
            <div className="pesquisa">
                
                <p>Buscar Trabalhos</p>
                <input className='barrapesquisa' type="text" onChange={mudaTexto} />
                <div>
                    <p className='texto_digitado'>pesquisa: {texto}</p>
                </div>
            </div>
            <main className="content-main">
            {filmes.filter((filme)=>filme.titulo.toLowerCase().includes(texto.toLowerCase()))
            .map((filme:FilmesType)=>
                    <Filme key={filme.id} 
                           titulo={filme.titulo} 
                           descricao={filme.descricao} 
                           imagem={filme.imagem}
                    />
                    )
                }
            </main>
        </>
    )
}