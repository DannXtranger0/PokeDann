import { fetchData } from "../utils/fetchUtils";

export async function allPkmNames() {
    let data = await fetchData("https://pokeapi.co/api/v2/pokemon?limit=2000");
    return data.results.map(p=> p.name);    
}