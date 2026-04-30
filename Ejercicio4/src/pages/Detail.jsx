import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { ArrowLeft, Shuffle } from 'lucide-react';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtiene todos los IDs para el botón "aleatorio"
  const [allIds, setAllIds] = useState([]);

  useEffect(() => {
    const fetchOperator = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_R6_API_KEY;

        let dataToUse = null;
        let fullList = [];

        if (!apiKey || apiKey === 'your_api_key_here') {
          throw new Error('API Key no configurada');
        } else {
          // Si tuvieramos un endpoint por ID:
          // const res = await fetch(`https://api.r6data.eu/api/operators/${id}`, { headers: { 'api-key': apiKey } });
          // Por simplicidad, obtenemos todos y filtramos
          const res = await fetch('/api/operators', {
            headers: { 'api-key': apiKey }
          });
          const allData = await res.json();
          const rawList = Array.isArray(allData) ? allData : allData.operators || [];

          const mappedList = rawList.map(op => ({
            id: op.safename || op.name || Math.random().toString(),
            name: op.name || 'Desconocido',
            role: op.side ? (op.side.toLowerCase() === 'attacker' ? 'Attacker' : 'Defender') : 'Attacker',
            icon: op.icon_url || op.icon || '',
            unit: op.unit || 'Desconocida',
            speed: op.speed || '1',
            armor: op.health || op.armor || '1',
            description: op.description || `Nombre real: ${op.realname}. País: ${op.birthplace}. Roles: ${op.roles ? op.roles.join(', ') : ''}`
          }));

          dataToUse = mappedList.find(op => op.id === id);
          fullList = mappedList;
        }

        setOperator(dataToUse);
        setAllIds(fullList.map(op => op.id.toString()));
      } catch (err) {
        console.error(err);
        setOperator(null);
        setAllIds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOperator();
  }, [id]);

  const goToRandom = () => {
    if (allIds.length === 0) return;
    const availableIds = allIds.filter(opId => opId !== id);
    if (availableIds.length === 0) return;

    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];
    navigate(`/items/${randomId}`);
  };

  if (loading) return <Loading fullScreen message="Cargando detalles..." />;

  if (!operator) {
    return (
      <div className="not-found-detail">
        <h2>Operador no encontrado</h2>
        <Link to="/items" className="back-link">Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header-actions">
        <Link to="/items" className="back-btn">
          <ArrowLeft size={20} /> Volver
        </Link>
        <button onClick={goToRandom} className="random-btn">
          <Shuffle size={20} /> Elemento aleatorio
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-image-col">
          <img src={operator.icon} alt={operator.name} className="detail-icon" />
        </div>
        <div className="detail-info-col">
          <h1>{operator.name}</h1>
          <div className="tags">
            <span className={`tag role ${operator.role.toLowerCase()}`}>{operator.role}</span>
            <span className="tag unit">{operator.unit}</span>
          </div>

          <div className="stats-box">
            <div className="stat">
              <span className="stat-label">Velocidad:</span>
              <span className="stat-value">{operator.speed}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Blindaje:</span>
              <span className="stat-value">{operator.armor}</span>
            </div>
          </div>

          <div className="description">
            <h3>Descripción</h3>
            <p>{operator.description || 'No hay descripción disponible para este operador.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
