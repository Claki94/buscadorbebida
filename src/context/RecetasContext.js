import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    // Conjunto de recetas obtenidas de la API
    let [recetas, guardarRecetas] = useState([]);

    // Términos por los que se filtra en la API
    let [busqueda, buscarRecetas] = useState({
        ingrediente: '',
        categoria: ''
    });

    // Destructuring de la busqueda
    let {ingrediente, categoria} = busqueda;

    // Boolean que nos permite buscar o no buscar
    let [consultar, guardarConsultar] = useState(false);

    // Se ejecuta cada vez que se modifica el valor de la búsqueda, añadimos el consultar para evitar
    // que con la primera carga se ejecute
    useEffect(() => {

        if(consultar) {

            const obtenerRecetas = async () => {
            
                let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;

                let resultado = await Axios.get(url);

                guardarRecetas(resultado.data.drinks);
            }
    
            obtenerRecetas();
            guardarConsultar(false);
        }
        
    }, [busqueda, categoria, consultar, ingrediente]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar,
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );

}

export default RecetasProvider;