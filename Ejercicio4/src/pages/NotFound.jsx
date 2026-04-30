import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <AlertTriangle size={80} className="warning-icon" />
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la ruta que buscas no existe o ha sido movida.</p>
      <Link to="/" className="home-link">Volver al Inicio</Link>
    </div>
  );
};

export default NotFound;
