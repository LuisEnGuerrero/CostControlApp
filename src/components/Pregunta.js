import React, { Fragment, useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

import { Howl } from 'howler';
import soundClick from '../sounds/click.mp3';
import soundError from '../sounds/error.mp3';

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {

//Definir el state
const [ cantidad, guardarCantidad ] = useState(0);
const [ error, guardarError ] = useState(false);

//Funcion que lee el presupuesto
const definirPresupuesto = e => {
    guardarCantidad( parseInt(e.target.value) );
};

//Submit para definir el presupuesto
const agregarPresupuesto = e => {
    e.preventDefault();

    //Validar
    if (cantidad < 1 || isNaN( cantidad )){
        guardarError(true);
        handleClick(soundError);
        return;
    };

    //Si pasa la validación
    guardarError(false);
    handleClick(soundClick);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);

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
        <Fragment>
            <h2>¿Cuál es tu Presupuesto?</h2>
                { error ? <Error mensaje="Presupuesto Insuficiente"/> : null }
            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number"
                    step="500"
                    className='u-full-width'
                    placeholder='Agrega tu Presupuesto!'
                    onChange={definirPresupuesto}
                />
                <input 
                    type="submit"
                    className='button-primary u-full-width'
                    value="Definir Presupuesto"
                />
            </form>
        </Fragment>
     );
};
 
Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;