import React, { useState } from 'react';
import shortid from 'shortid';
import Error from './Error';
import PropTypes from 'prop-types';

import { Howl } from 'howler';
import soundCoin from '../sounds/coin.mp3';
import soundError from '../sounds/error.mp3';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [ nombre, guardarNombre ] = useState('');
    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);
   


    //Funcion que administra el gasto
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN( cantidad ) || nombre.trim() === ''){
            guardarError(true);
            handleClick(soundError);
            return;
        }
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }


        //pasar el gasto al componente principal
        guardarGasto(gasto);
        handleClick(soundCoin);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad(0);
        
    };
    
    //Funcion para sonido de click
    const handleClick = (nota) => {
        const sound = new Howl({
            src: [nota]
        });
        sound.volume(0.2);
        sound.play();
    };


    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos!</h2>

            { error ? <Error mensaje="Ambos campos son obligatorios, verifica tu gasto ingresado!" /> : null }

            <div className='campo'>
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className='u-full-width'
                    placeholder='Ej. Transporte'
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className='u-full-width'
                    step="50"
                    placeholder='Ej. 2900'
                    value={cantidad}
                    onChange={e => guardarCantidad(e.target.value)}
                />
            </div>
            <input 
                type="submit"
                className='button-primary u-full-width'
                value="Agregar gasto"
            />
        </form>
     );
};

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;