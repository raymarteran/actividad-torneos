import { useState, useEffect } from 'react';
import { resultadoService } from '../services/resultadoService';
import { torneoService } from '../services/torneoService';
import { Loader2 } from 'lucide-react';

function Resultados() {
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTorneos();
  }, []);

  useEffect(() => {
    if (selectedTorneo) {
      fetchCategorias();
    }
  }, [selectedTorneo]);

  useEffect(() => {
    if (selectedTorneo && selectedCategoria) {
      fetchResultados();
    }
  }, [selectedTorneo, selectedCategoria]);

  const fetchTorneos = async () => {
    try {
      const response = await torneoService.getAll();
      setTorneos(response.data || []);
    } catch (error) {
      console.error('Error cargando torneos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await torneoService.getCategorias(selectedTorneo);
      setCategorias(response.data || []);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  const fetchResultados = async () => {
    try {
      const response = await resultadoService.getResultadosByCategoria(
        selectedTorneo,
        selectedCategoria
      );
      setResultados(response.data?.resultados || []);
    } catch (error) {
      console.error('Error cargando resultados:', error);
    }
  };

  const handleGenerarClasificacion = async () => {
    try {
      await resultadoService.generarClasificacion(selectedTorneo, selectedCategoria);
      fetchResultados();
      alert('Clasificación generada exitosamente');
    } catch (error) {
      console.error('Error generando clasificación:', error);
      alert('Error al generar la clasificación');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center py-8 flex items-center justify-center w-full">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Resultados</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Torneo
            </label>
            <select
              value={selectedTorneo || ''}
              onChange={(e) => {
                setSelectedTorneo(e.target.value);
                setSelectedCategoria(null);
                setResultados([]);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccione un torneo</option>
              {torneos.map((torneo) => (
                <option key={torneo._id} value={torneo._id}>
                  {torneo.nombre} - {formatDate(torneo.fecha)}
                </option>
              ))}
            </select>
          </div>
          {selectedTorneo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Categoría
              </label>
              <select
                value={selectedCategoria || ''}
                onChange={(e) => {
                  setSelectedCategoria(e.target.value);
                  setResultados([]);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {selectedTorneo && selectedCategoria && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">Clasificación</h2>
            <button
              onClick={handleGenerarClasificacion}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90"
            >
              Generar Clasificación
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Posición</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Atleta</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Tiempo</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Evento</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Puntos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resultados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No hay resultados disponibles. Genera la clasificación para ver los resultados.
                    </td>
                  </tr>
                ) : (
                  resultados.map((resultado, index) => {
                    // Obtener el evento del mejor tiempo
                    const mejorTiempoData = resultado.tiempos?.find(t => t.tiempo === resultado.mejorTiempo);
                    const eventoNombre = mejorTiempoData?.evento || resultado.tiempos?.[0]?.evento || '-';
                    
                    return (
                      <tr
                        key={resultado.atleta?._id || index}
                        className={`hover:bg-gray-50 ${
                          index < 3 ? 'bg-yellow-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                          {resultado.posicion || index + 1}
                          {index === 0 && ' 🥇'}
                          {index === 1 && ' 🥈'}
                          {index === 2 && ' 🥉'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {resultado.atleta?.nombre} {resultado.atleta?.apellido}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono">
                          {resultado.mejorTiempo || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {eventoNombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {resultado.puntosTotales || 0}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Resultados;

