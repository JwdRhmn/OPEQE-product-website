import fillWithZero from "./fillZero.js";

export default (value, precision=2, addZero=false) => {
    let str = value.toString();

    let parts = str.split('.');

    let decimals = parts[1];
    if(!decimals){
        decimals = '';
    }

    decimals = `${decimals.substr(0, precision + 1)}`;

    if(decimals.length > precision && parseInt(parts[1][precision]) > 5){
        str = (parseFloat(`${parts[0]}.${decimals}`) + 1 / ( 10 ** precision )).toString();

        parts = str.split('.');

        decimals = parts[1];
        if(!decimals){
            decimals = '';
        }
    }

    decimals = decimals.substr(0, precision);


    if(addZero){
        decimals = fillWithZero(decimals, 2, 'after');
    }

    return `${parts[0]}${(decimals !== '' && (parseInt(decimals) || addZero)) ? ('.' + decimals) : ''}`;
}


