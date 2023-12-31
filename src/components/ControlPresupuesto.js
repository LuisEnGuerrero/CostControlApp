import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { revisarPresupuesto } from '../components/helpers';

const ControlPresupuesto = ({presupuesto, restante}) => {
    return ( 
        <Fragment>
            <div className='alert alert-primary'>
                Presupuesto: ${presupuesto}
            </div>
            <div className={revisarPresupuesto(presupuesto, restante)}>
                Saldo: ${restante}
            </div>
        </Fragment>
     );
}

ControlPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    restante: PropTypes.number.isRequired
}

export default ControlPresupuesto;