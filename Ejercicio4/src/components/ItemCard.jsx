import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ItemCard.css';

/**
 * Tarjeta para mostrar la información básica de un operador en la lista.
 * Recibe los datos mediante props.
 */
const ItemCard = ({ id, name, role, icon, unit }) => {
  return (
    <div className="item-card">
      <div className="card-header">
        <img src={icon} alt={`${name} icon`} className="operator-icon" />
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p className={`role ${role.toLowerCase()}`}>{role}</p>
        <p className="unit">{unit}</p>
        <Link to={`/items/${id}`} className="view-details-btn">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['Attacker', 'Defender']).isRequired,
  icon: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default ItemCard;
