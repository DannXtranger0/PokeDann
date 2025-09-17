const Ps = 255;
const Att = 190;
const Def = 250;
const SpAtt =194	
const SpDef =250;
const Spee = 180;	

const nameStats ={
     Ps: Ps,
     Att: Att,
     Def: Def,
     SpAtt: SpAtt,
     SpDef: SpDef,
     Spee: Spee
}

export function calcPorc(est, nameStat){
     
     let porc = (est/Ps)*100;
   
   if (porc <= 50)
        porc *= 1.3
     
   else if(porc <=60)
        porc *= 1.2;

   else if(porc <=70)
        porc *= 1.2
    
   return porc;
}

export function calcTotal(stats){
     return stats[0].base_stat + stats[1].base_stat + stats[2].base_stat + stats[3].base_stat + stats[4].base_stat + stats[5].base_stat;
}