import { fetchPkmData } from "./fetchUtils";
const UrlBase = import.meta.env.VITE_API_URL;

export async function obtainEvolutions(chain){
    //Array que se llenará de los nombres de los pokemon
    const result = [];

    //funcion recursiva (se llama así misma) para sacar el evolves_to de 
    // cada vuelta y así el nombre de la etapa evolutiva
   async function  traverse(node){
        // console.log(node);
        //es valido el nodo? el nombre del pokemon ex valido? sino, salimos y dejamos de retornar
        if(!node || !node.species.name) return;

        //metemos al array el nombre de la etapa
        
        let name = node.species.name;
        let pkmData = await fetchPkmData(UrlBase+"pokemon/"+name);
    
        let sprite =  pkmData.sprites.other?.["official-artwork"]?.front_default
    
        result.push({
            name: name,
            sprite: sprite
        });
            

        //si el evolves_to es un array y si tiene una longitud mayor a uno lo 
        //recorremos con traverse, sino sigue su flujo, y retornamos
        if(Array.isArray(node.evolves_to) && node.evolves_to.length >0){
            // console.log(node.evolves_to);
            await Promise.all(node.evolves_to.map(nextNode => traverse(nextNode)));
        }
    }
    await traverse(chain);
    // console.log(result);
    return result;
}


// let pkmPhases = [];
// export function obtainEvolutions(phase){
//     pkmPhases.push(phase.species.name);

//     console.log(pkmPhases);
//     if(phase.evolves_to.length != []){
//         obtainEvolutions(phase.evolves_to[0]);
//     }else{
//         return pkmPhases; 
//     }
// };