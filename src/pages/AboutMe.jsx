import "../css/AboutMe.css"
import "../css/index.css"

import me from "../assets/1754949362006-sinfondo.png"

function AboutMe() 
{
return(
    <section className="about-wrapper">
        
        <div className="about-container">
            <h3>Robin Jimenez</h3>
            <div className="image-container">
                <img src={me} alt="" />
            </div>
            <div className="buttons-types-container">
                <button className="btn btn-type" style={{backgroundColor: "var(--psychic-type-color)"}}>Psychic</button>
                <button className="btn btn-type" style={{backgroundColor: "var(--fighting-type-color)"}}>Fighting</button>
            </div>
        </div>

        <div className="about-container">
            <p>Este proyecto fue creado con la finalidad de aprender y practicar <span className="react-span">React.</span><br /><br />
            Mi objetivo fue construir una experiencia interactiva inspirada  en la Pokédex, con un diseño minimalista y limpio.</p>

            <div className="buttons-container">
                <a href="https://github.com/DannXtranger0" target="_blank">GitHub</a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=robindannjf@gmail.com" target="_blank">
                    Correo
                </a>      
            </div>
        </div>

    </section>
);
}
export default AboutMe;
