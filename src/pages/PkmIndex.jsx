import { useContext } from "react";
import {  useState } from "react";
import "../css/PkmIndex.css";  
import { MenuVisibleContext } from "../context/MenuVisibleContext"; 
import { PkmSearchContext } from "../context/PkmSearchContext";
import { LastPostElementRefContext } from "../context/LastPostElementRefContext";
import PkmCard from "../PkmCard";
import { fetchPkmData } from "../utils/fetchUtils";
import { Link } from "react-router-dom";

//tengo que traer la información de cada pokemon durante su iteración en el map

function PkmIndex(){
    const {isMenuVisible} = useContext(MenuVisibleContext);
    const {pkmData} = useContext(PkmSearchContext);
    const {lastPostElementRef} = useContext(LastPostElementRefContext)
    if(!pkmData) return <p>Loading...</p>
    return(
        <section>
            <aside className= {"side-menu " + (isMenuVisible ? "side-menu-visible" :"")}>
                <div className="side-menu-container">
                    <h3 className="menu-title">Search By Type</h3>

                    <div className="types-container">
                        <button className="btn-type" style={{backgroundColor: "var(--fire-type-color)"}} >Fire</button>
                        <button className="btn-type" style={{backgroundColor: "var(--grass-type-color)"}} >Grass</button>
                        <button className="btn-type" style={{backgroundColor: "var(--water-type-color)"}} >Water</button>
                        <button className="btn-type" style={{backgroundColor: "var(--ground-type-color)"}}>Ground</button>
                        <button className="btn-type" style={{backgroundColor: "var(--poison-type-color)"}}>Poison</button>
                        <button className="btn-type" style={{backgroundColor: "var(--dark-type-color)"}}>Dark</button>
                        <button className="btn-type" style={{backgroundColor: "var(--dragon-type-color)"}}>Dragon</button>
                        <button className="btn-type" style={{backgroundColor: "var(--fighting-type-color)"}}>Fighting</button>
                        <button className="btn-type" style={{backgroundColor: "var(--psychic-type-color)"}}>Psychic</button>
                        <button className="btn-type" style={{backgroundColor: "var(--bug-type-color)"}}>Bug</button>
                        <button className="btn-type" style={{backgroundColor: "var(--electric-type-color)"}}>Electric</button>
                        <button className="btn-type" style={{backgroundColor: "var(--flying-type-color)"}}>Flying</button>
                        <button className="btn-type" style={{backgroundColor: "var(--ghost-type-color)"}}>Ghost</button>
                        <button className="btn-type" style={{backgroundColor: "var(--normal-type-color)"}}>Normal</button>
                        <button className="btn-type" style={{backgroundColor: "var(--rock-type-color)"}}>Rock</button>
                        <button className="btn-type" style={{backgroundColor: "var(--fairy-type-color)"}}>Fairy</button>
                        <button className="btn-type" style={{backgroundColor: "var(--steel-type-color)"}}>Steel</button>
                        <button className="btn-type" style={{backgroundColor: "var(--ice-type-color)"}}>Ice</button>
                    </div>
                
                </div>
            </aside>
            
            <main className="pkms-container" >
                {pkmData.results.length === 0 ? <p>Loading...</p> : 
                    pkmData.results.map((elem,index)=>
                        <div ref={pkmData.results.length==index+1 ? lastPostElementRef : null} key={index} className="pkm-card-div-container" to={"/pokemon/"+elem.name}>
                                <PkmCard  url={elem.url}  />
                        </div>
                            
                    )
                }

            </main>
        </section>
    );
}

export default PkmIndex;