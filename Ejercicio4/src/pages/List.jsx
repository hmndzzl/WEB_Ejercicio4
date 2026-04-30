import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import Loading from '../components/Loading';
import { Search } from 'lucide-react';
import './List.css';

const List = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Attacker');

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const apiKey = import.meta.env.VITE_R6_API_KEY;
        
        // Si no hay API key o es la de ejemplo, mostramos error
        if (!apiKey || apiKey === 'your_api_key_here') {
          setError('API Key no configurada. Por favor, revisa tu archivo .env.');
          setOperators([]);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/operators', {
          headers: {
            'api-key': apiKey
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar datos desde la API');
        }

        const data = await response.json();
        const rawList = Array.isArray(data) ? data : data.operators || [];
        
        // Mapeamos los datos de la API a la estructura que espera nuestra UI
        const mappedList = rawList.map(op => ({
          id: op.safename || op.name || Math.random().toString(),
          name: op.name || 'Desconocido',
          role: op.side ? (op.side.toLowerCase() === 'attacker' ? 'Attacker' : 'Defender') : 'Attacker',
          icon: op.icon_url || op.icon || '',
          unit: op.unit || 'Desconocida',
          speed: op.speed || '1',
          armor: op.health || op.armor || '1',
          description: op.description || `Nombre real: ${op.realname}. País: ${op.birthplace}. Roles: ${op.roles ? op.roles.join(', ') : ''}`,
          season: op.season_introduced || 'Release'
        }));
        
        setOperators(mappedList);
      } catch (err) {
        console.error(err);
        setError('No se pudo conectar con la API.');
        setOperators([]); // Vaciamos la lista
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const parseSeason = (seasonStr) => {
    if (!seasonStr || seasonStr.toLowerCase() === 'release') return 0;
    const match = seasonStr.match(/Y(\d+)S(\d+)/i);
    if (match) {
      const year = parseInt(match[1], 10);
      const season = parseInt(match[2], 10);
      return year * 10 + season;
    }
    return 999;
  };

  const sortedOperators = [...operators].sort((a, b) => parseSeason(a.season) - parseSeason(b.season));

  const filteredOperators = sortedOperators.filter(op => 
    op.name.toLowerCase().includes(search.toLowerCase()) || 
    op.role.toLowerCase().includes(search.toLowerCase())
  );

  const attackers = filteredOperators.filter(op => op.role === 'Attacker');
  const defenders = filteredOperators.filter(op => op.role === 'Defender');

  if (loading) return <Loading fullScreen />;

  return (
    <div className="list-container">
      <h2>Operadores</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nombre o rol..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="role-tabs">
        <button 
          className={`tab-btn ${activeTab === 'Attacker' ? 'active attacker' : ''}`}
          onClick={() => setActiveTab('Attacker')}
        >
          Atacantes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'Defender' ? 'active defender' : ''}`}
          onClick={() => setActiveTab('Defender')}
        >
          Defensores
        </button>
      </div>

      {filteredOperators.length === 0 ? (
        <p className="no-results">No se encontraron operadores.</p>
      ) : (
        <div className="operators-grid">
          {(activeTab === 'Attacker' ? attackers : defenders).length > 0 ? (
            (activeTab === 'Attacker' ? attackers : defenders).map(op => (
              <ItemCard 
                key={op.id}
                id={op.id.toString()}
                name={op.name}
                role={op.role}
                icon={op.icon}
                unit={op.unit}
              />
            ))
          ) : (
            <p className="no-results" style={{ gridColumn: '1 / -1' }}>
              No hay {activeTab === 'Attacker' ? 'atacantes' : 'defensores'} que coincidan con la búsqueda.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
