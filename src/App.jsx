import {useRef, useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import './css/App.css'
import { MenuVisibleContext } from './context/MenuVisibleContext'
import { PkmSearchContext } from './context/PkmSearchContext'
import { ObserverContext } from './context/ObserverContext'
import { LoadingContext } from './context/LoadingContext'
import { LastPostElementRefContext } from './context/LastPostElementRefContext'
import { nextUrlContext } from './context/NextUrlContext'

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [pkmData, setPkmData] = useState({
  count: 0,
  next: null,
  previous: null,
  results: []

});
      //Api  Url
const UrlBase = import.meta.env.VITE_API_URL;
    //observer, to detect when user is at the bottom of the page to infinite scroll
  const observer = useRef();

    //loading, to not fetch again if data is already fetched
    const [loading,setLoading] = useState(false); 

      //limit andoffset for fetch
    const [nextUrl,setNextUrl] = useState(UrlBase+"pokemon?offset=0&limit=20");

   const lastPostElementRef = useCallback((node) =>{
          if(loading) return;
          if(observer.current) observer.current.disconnect();
  
          observer.current  = new IntersectionObserver(entries =>{
              if(entries[0].isIntersecting){
                  if(pkmData.next){
                      setNextUrl(pkmData.next);
                  }
              }
          });
          if(node) observer.current.observe(node);
      },[loading,pkmData.next]);

      return (


<nextUrlContext.Provider value={{nextUrl,setNextUrl}}>
  <LastPostElementRefContext.Provider value={{lastPostElementRef}}>
    <LoadingContext.Provider value={{loading,setLoading}}>
      <ObserverContext.Provider value={{observer}}>
          <MenuVisibleContext.Provider value={{isMenuVisible,setIsMenuVisible}}>
            <PkmSearchContext.Provider value={{pkmData,setPkmData}}>
              <Header/>
              <Outlet/>
          </PkmSearchContext.Provider>
        </MenuVisibleContext.Provider>
      </ObserverContext.Provider>
    </LoadingContext.Provider>
  </LastPostElementRefContext.Provider>
</nextUrlContext.Provider>


  )}

export default App
