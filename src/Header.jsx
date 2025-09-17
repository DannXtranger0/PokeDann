import logo from './assets/LogoPokeDann.svg'
import menu from './assets/menu.svg'
import { data, Link, useNavigate } from 'react-router-dom' 
import './css/Header.css'
import './css/index.css'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MenuVisibleContext } from './context/MenuVisibleContext'
import { PkmSearchContext } from './context/PkmSearchContext'
import { fetchData } from './utils/fetchUtils'
import { ObserverContext } from './context/ObserverContext'
import { LoadingContext } from './context/LoadingContext'
import { nextUrlContext } from './context/NextUrlContext'
import { getAllPkmNames } from './utils/fetchUtils'
function Header(){

    const UrlBase = import.meta.env.VITE_API_URL;

    const [pkmNames,setPkmNames] = useState([]);
    //what the user is typing to search a pokemon
    const [searchPkm, setSearchPkm] = useState("");
    const navigate = useNavigate()
    //limit andoffset for fetch
    const {nextUrl,setNextUrl} = useContext(nextUrlContext);

    //Pokemon Data
    const {pkmData,setPkmData} = useContext(PkmSearchContext);

    const {loading,setLoading} = useContext(LoadingContext); 

    //observer, to detect when user is at the bottom of the page to infinite scroll
    const {observer} = useContext(ObserverContext);

    //Activate/Deactivate Side Menu
    const {isMenuVisible,setIsMenuVisible} = useContext(MenuVisibleContext);
    
    const handleInputText = (e) =>{
        setSearchPkm(e.target.value);
    }
    const handleToggleMenu =() =>{
        setIsMenuVisible(mv=> !isMenuVisible);
    }

    //initial fetch
    const fetchAndSet = async () => {
        setLoading(true);
        const data = await fetchData(nextUrl);
      setPkmData(prev => ({
        ...data,
        results: [...prev.results, ...data.results] // <- acumula resultados
        }));
        setPkmNames(await getAllPkmNames());
        setLoading(false);
    };

    const handleSubmitSearchPkm = async (e) =>{
        e.preventDefault();
        if(searchPkm.trim() != "")
            navigate(`pokemon/${searchPkm}`);
    }



    useEffect(()=>{
        fetchAndSet();   
    },[nextUrl]);


 


    return(
        <header className='header'>
            <div className='header-container'>
                <div className='logo-container'>
                    <Link to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                </div>

                <div className='about-me'>
                    <Link to="/about-me">About Me</Link>
                </div>
                

                <div className='header-bottom'>
                    <input value={searchPkm} list='pokemon-list'  onChange={(e) => handleInputText(e) } type="text" placeholder="Pokémon Name Or Number" />
                     <datalist id="pokemon-list">
                        {pkmNames.map((p) => (
                        <option key={p} value={p} />
                        ))}
                    </datalist>
                    <input type="button" onClick={(e)=>handleSubmitSearchPkm(e)} className='btn search' />
                </div>
                
            </div>
        </header>
    );
}
export default Header;