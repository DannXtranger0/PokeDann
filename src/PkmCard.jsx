import { fetchPkmData } from "./utils/fetchUtils";
import "./css/PkmCard.css";
import { useEffect, useState } from "react";
import { capitalize } from "./utils/textUtils";
import { typesObject } from "./utils/pkmTypes";
import { Link } from "react-router-dom";

function PkmCard({url = null}){


    const [pkmDetails, setPkmDetails] = useState(null);
    useEffect(()=>{
        if(!url) return;

        const fetchAndSet = async () => {
            setPkmDetails(await fetchPkmData(url));
        }
        fetchAndSet();
    },[url]);

    if(!pkmDetails) return <p>Loading...</p>;

    return(
        <Link to={"/pokemon/"+pkmDetails.name} className="card">
            <p className="pkm-number">#{pkmDetails.id}</p>
            <div className="pkm-img-container">
                <img src={pkmDetails.sprites.other?.["official-artwork"]?.front_default} alt="" />
            </div>
            <div className="pkm-types-container">
                {pkmDetails.types.map((elem)=>(
                    <button className="btn-type" style={{
                        backgroundColor: `var(${typesObject[elem.type.name]})`,
                        }}>{capitalize(elem.type.name)}
                    </button>
                ))}                

            </div>

            <p className="pkm-name">{capitalize(pkmDetails.name)}</p>
        </Link>
    )
}
export default PkmCard;