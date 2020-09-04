import React, { useContext, useState } from 'react';

import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {  

    // Categorias obtenidas de la API a través de su Context
    let {categorias} = useContext(CategoriasContext);

    // Actualizar los términos a buscar en su Context
    let {buscarRecetas, guardarConsultar} = useContext(RecetasContext);

    // State de los términos a buscar
    let [busqueda, guardarBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    })

    // Función que modifica el state de la búsqueda a medida que se modifican los campos
    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // Funcion que se encarga de enviar al context los términos de la búsqueda
    const handleSubmit = e => {
        e.preventDefault();

        guardarConsultar(true);
        buscarRecetas(busqueda);
    }

    return (  
        <form 
            className="col-12"
            onSubmit={handleSubmit}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4 mb-2">
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        name="ingrediente"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={handleChange}
                    >
                        <option value="">-- Seleccione categoría --</option>
                        {
                            categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Formulario;