import { calcPorc } from "./utils/calculateStats";
function ProgressStat({stat, nameStat}){

    const porc = calcPorc(stat,nameStat);

    let color;
    if(porc<=32)
        color = "var(--low-color)";
    else if(porc<=45)
        color = "var(--mid-low-color)";
    else if(porc<=60)
        color = "var(--mid-color)";
    else if(porc <=66)
        color = "var(--hight-color)"; 
    else
        color = "var(--super-hight-color)";

    return(
        <div className="div-progress">
            <div className="bar-div" style={{
                background: color,
                width: porc+"%",
                borderRadius: "10px",
                height:"100%"
                
            }}>

            </div>
        </div>        
    );
}

export default ProgressStat;