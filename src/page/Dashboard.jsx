import { useState, useEffect } from 'react';
import { torneoService } from '../services/torneoService';
import { atletaService } from '../services/atletaService';
import { Loader2 } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    torneos: 0,
    atletas: 0,
    inscripciones: 0,
    resultados: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [torneosRes, atletasRes] = await Promise.all([
          torneoService.getAll(),
          atletaService.getAll(),
        ]);
        
        setStats({
          torneos: torneosRes.data?.length || 0,
          atletas: atletasRes.data?.length || 0,
          inscripciones: 0,
          resultados: 0,
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Torneos Activos', value: stats.torneos, icon: '🏆', color: 'bg-primary' },
    { label: 'Atletas Registrados', value: stats.atletas, icon: '👥', color: 'bg-secondary' },
    { label: 'Inscripciones', value: stats.inscripciones, icon: '📝', color: 'bg-tertiary' },
    { label: 'Resultados', value: stats.resultados, icon: '📈', color: 'bg-primary' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-4 rounded-full text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Bienvenido</h2>
        <p className="text-gray-600">
          Sistema de administración de torneos deportivos. Gestiona torneos, atletas,
          inscripciones y resultados de manera eficiente.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

