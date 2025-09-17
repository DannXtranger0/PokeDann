export function capitalize(str){
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export function separateHyphen(str){
    return capitalize(String(str).replace("-"," "));

}