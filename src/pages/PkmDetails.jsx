import arrow from '../assets/arrow.svg'
import { useParams } from "react-router-dom";
import { capitalize, separateHyphen } from "../utils/textUtils";
import { fetchPkmData } from "../utils/fetchUtils";
import { useEffect, useState } from "react";
import "../css/PkmDetails.css";
import "../css/index.css";
import { typesObject } from "../utils/pkmTypes";
import { calcPorc, calcTotal } from "../utils/calculateStats";
import ProgressStat from "../ProgressStat";
import { obtainEvolutions } from "../utils/evolutionUtils";

function PkmDetails() {
    const [loaded,setLoaded] = useState(false);
    const {name} = useParams();
    const [pkmData, setpkmData] = useState(null);
    const [stats, setStats] = useState(null);
    const [evoChain,setEvoChain] = useState(null);
    const [evoChainLoaded,setEvoChainLoaded] = useState([]);

    const UrlBase = import.meta.env.VITE_API_URL;
    const fetchAndSetPkm = async()=>{
        setLoaded(false);
       try {
        const data = await fetchPkmData(UrlBase + "pokemon/" + name);
        const speciesData = await fetchPkmData(data.species.url);
        const evoChainData = await fetchPkmData(speciesData.evolution_chain.url);

        // Usa directamente la cadena recién descsargada
        const evoChainLoadedData = await obtainEvolutions(evoChainData.chain);

        setpkmData(data);
        setStats(data.stats);
        setEvoChain(evoChainData.chain);
        setEvoChainLoaded(evoChainLoadedData);
        setLoaded(true);

        
    } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
    }

    useEffect(()=>{
        fetchAndSetPkm();
    },[name]);

    if(!pkmData || !loaded) return <h1>Loading...</h1> 
    
    return(
        
        <main className="wrapper-pkm-detail">
            <section className="pkm-detail-container">
                <div className='pkm-detail-up-container'>

                    <div className="pkm-detail">
                        <h3><span className='pkm-name'>#{pkmData.id}</span> {capitalize(pkmData.name)}</h3>
                        
                        {/* pkm image */}
                        <div className="pkm-detail-img-container">
                            <img src={pkmData.sprites.other?.["official-artwork"]?.front_default} alt="" />
                        </div>

                        {/* buttons */}
                        <div className="pkm-detail-buttons">
                            {pkmData.types.map((elem,i)=>(
                                <button key={i} className="btn-type" style={{
                                    backgroundColor: `var(${typesObject[elem.type.name]})`,
                                    }}>{capitalize(elem.type.name)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* stats */}
                    <div className="pkm-detail">
                            <h3 >Stats</h3>
                            <div className="stats-container">
                                <p>Ps</p>
                                <p className="number-stat">{stats[0].base_stat}</p>
                                <ProgressStat stat={stats[0].base_stat} nameStat="Ps" />
                                <p>Attack</p>
                                <p className="number-stat">{stats[1].base_stat}</p>
                                <ProgressStat stat={stats[1].base_stat} nameStat="Att"/>
                                <p>Defense</p>
                                <p className="number-stat">{stats[2].base_stat} </p>
                                <ProgressStat stat={stats[2].base_stat} nameStat="Def" />

                                <p>Special At.</p>
                                <p className="number-stat">{stats[3].base_stat}</p>
                                <ProgressStat stat={stats[3].base_stat} nameStat="SpAtt"/>

                                <p>Special Def.</p>
                                <p className="number-stat">{stats[4].base_stat}</p>
                                <ProgressStat stat={stats[4].base_stat} nameStat="SpDef" />

                                <p>Speed</p>
                                <p className="number-stat">{stats[5].base_stat}</p>
                                <ProgressStat stat={stats[5].base_stat} nameStat="Spee"/>

                                <p >Total</p>
                                <p className="number-stat stat-total">{calcTotal(stats)}</p>
                            </div>
                    </div>
                </div>

                {/* Abilities */}
                <div className="pkm-detail">

                    <div className="up-abilities">
                        <h3>Normal Abilities</h3>
                        <h3 className="hide-ab">Hide Ability</h3>
                    </div>

                    <div className="down-abilities">
                        {/* normals */}
                        <div className="normal-ab-container">
                            {pkmData.abilities.map((elem,i)=>
                                <p key={i} className= "normal-ab">{(!elem.is_hidden) ? separateHyphen(elem.ability.name) : ""}</p>
                            )}
                        </div>
                        {/* Hide */}
                        <div className="hide-ab-container">
                            {pkmData.abilities.map((elem,i)=>
                                <p key={i} className="hide-ab">{(elem.is_hidden) ? separateHyphen(elem.ability.name) :""}</p>
                            )}
                        </div>
        

                    </div>
                </div>

                {/* Evolution chain */}
                
                <div className="pkm-detail">                    

                    <h3>Evolution Chain</h3>
                    <div className="evolution-phases-container">
                    {( loaded && evoChainLoaded.length > 0) ? evoChainLoaded.map((elem, index) => (
                        <div className='evolution'  key={`${elem.name}-${index}`}>
                            
                            <div className="pkm-phase-container">
                                
                                <div className="phase-img-container">
                                    <img src={elem.sprite} alt={elem.name} />
                                </div>

                                <div className="phase-details-container">
                                    <p>{capitalize(elem.name)}</p>
                                </div>                        

                            </div>

                            { index != evoChainLoaded.length-1 ?
                             <div className='next-phase-details'>
                                <img src={arrow} alt="" />
                            </div> : ""}
                            
                        </div>
                    )) : <p>Loading...</p> }
                                            
                    </div>

                </div>
                
            </section>
        </main>
        
    );

}

export default PkmDetails