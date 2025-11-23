import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { torneoService } from '../services/torneoService';
import { Loader2, ArrowLeft, Calendar, MapPin, Trophy, Users, Activity } from 'lucide-react';

function TorneoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [torneo, setTorneo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTorneo();
  }, [id]);

  const fetchTorneo = async () => {
    try {
      setLoading(true);
      const response = await torneoService.getById(id);
      setTorneo(response.data);
      setError(null);
    } catch (error) {
      console.error('Error cargando torneo:', error);
      setError('No se pudo cargar el torneo');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 flex items-center justify-center w-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !torneo) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || 'Torneo no encontrado'}</p>
        <Link
          to="/torneos"
          className="text-primary hover:underline font-medium"
        >
          ← Volver a Torneos
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/torneos')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a Torneos</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header del torneo */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{torneo.nombre}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">{torneo.deporte}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(torneo.fecha)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{torneo.ubicacion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 md:p-8">
          {/* Descripción */}
          {torneo.descripcion && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-3">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{torneo.descripcion}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categorías */}
            {torneo.categorias && torneo.categorias.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Categorías</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {torneo.categorias.map((categoria) => (
                    <span
                      key={categoria._id}
                      className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {categoria.nombre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Eventos */}
            {torneo.eventos && torneo.eventos.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Eventos</h2>
                </div>
                <ul className="space-y-2">
                  {torneo.eventos.map((evento) => (
                    <li
                      key={evento._id}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>{evento.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Nombre del Torneo</p>
                <p className="text-lg font-semibold text-primary">{torneo.nombre}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Fecha</p>
                <p className="text-lg font-semibold text-gray-800">{formatDate(torneo.fecha)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Deporte</p>
                <p className="text-lg font-semibold text-gray-800">{torneo.deporte}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TorneoDetalle;

