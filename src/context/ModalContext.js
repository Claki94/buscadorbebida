import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    // State del ID de la bebida
    let [idReceta, guardarIdReceta] = useState(null);
    let [infoReceta, guardarReceta] = useState({});

    useEffect(() => {

        if(!idReceta) return;

        const obtenerReceta = async () => {

            let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

            let resultado = await Axios.get(url);

            guardarReceta(resultado.data.drinks[0]);
        }

        obtenerReceta();

    }, [idReceta]);

    return (
        <ModalContext.Provider
            value={{
                infoReceta,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );

}

export default ModalProvider;