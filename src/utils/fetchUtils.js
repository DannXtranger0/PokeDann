
export async function fetchData(options=""){
    try{
        let response = await fetch(options);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        let data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data: ", error);
    }
}


export async function fetchPkmData(options=""){
    // console.log(options);
    try{
        let response = await fetch(options);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        let data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data: ", error);
    }
}

export async function getAllPkmNames(){
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
    const data = await res.json();
    return data.results.map(p => p.name);
}