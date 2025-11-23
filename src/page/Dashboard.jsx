import { useState, useEffect } from 'react';
import { torneoService } from '../services/torneoService';
import { atletaService } from '../services/atletaService';
import { tiempoService } from '../services/tiempoService';
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
        
        const torneos = torneosRes.data || [];
        const atletas = atletasRes.data || [];
        
        // Obtener todas las inscripciones de todos los torneos
        let totalInscripciones = 0;
        try {
          const inscripcionesPromises = torneos.map(torneo => 
            atletaService.getInscripciones(torneo._id).catch(() => ({ data: [] }))
          );
          const inscripcionesResults = await Promise.all(inscripcionesPromises);
          totalInscripciones = inscripcionesResults.reduce((total, res) => {
            return total + (res.data?.length || 0);
          }, 0);
        } catch (error) {
          console.error('Error cargando inscripciones:', error);
        }
        
        // Contar tiempos (resultados) - obtener tiempos de todas las categorías de todos los torneos
        let totalTiempos = 0;
        try {
          for (const torneo of torneos) {
            try {
              const categoriasRes = await torneoService.getCategorias(torneo._id);
              const categorias = categoriasRes.data || [];
              
              for (const categoria of categorias) {
                try {
                  const tiemposRes = await tiempoService.getByCategoria(torneo._id, categoria._id);
                  totalTiempos += tiemposRes.data?.length || 0;
                } catch {
                  // Ignorar errores de categorías sin tiempos
                }
              }
            } catch {
              // Ignorar errores de torneos sin categorías
            }
          }
        } catch (error) {
          console.error('Error cargando tiempos:', error);
        }
        
        setStats({
          torneos: torneos.length,
          atletas: atletas.length,
          inscripciones: totalInscripciones,
          resultados: totalTiempos,
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

