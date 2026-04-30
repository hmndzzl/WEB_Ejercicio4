import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <Shield size={80} className="hero-icon" />
        <h1>Rainbow Six Data</h1>
        <p>Explora la base de datos de operadores, sus estadísticas, roles y mucho más.</p>
        <Link to="/items" className="cta-button">Ver Operadores</Link>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Información Detallada</h3>
          <p>Conoce la velocidad, blindaje y habilidades de cada operador.</p>
        </div>
        <div className="feature">
          <h3>Actualizado</h3>
          <p>Datos en tiempo real obtenidos desde la API de r6data.eu.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
