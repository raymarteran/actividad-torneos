import { useState, useEffect } from 'react';
import { tiempoService } from '../services/tiempoService';
import { torneoService } from '../services/torneoService';
import { atletaService } from '../services/atletaService';
import { Loader2 } from 'lucide-react';

function Tiempos() {
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [tiempos, setTiempos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    atletaId: '',
    categoriaId: '',
    tiempo: '',
    evento: '',
    observaciones: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTorneos();
  }, []);

  useEffect(() => {
    if (selectedTorneo) {
      fetchCategorias();
      fetchInscripciones();
      fetchTiempos();
    }
  }, [selectedTorneo]);

  useEffect(() => {
    if (formData.categoriaId) {
      fetchInscripciones();
    }
  }, [formData.categoriaId]);

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

  const fetchInscripciones = async () => {
    try {
      const response = formData.categoriaId
        ? await atletaService.getInscripcionesByCategoria(selectedTorneo, formData.categoriaId)
        : await atletaService.getInscripciones(selectedTorneo);
      setInscripciones(response.data || []);
    } catch (error) {
      console.error('Error cargando inscripciones:', error);
    }
  };

  const fetchTiempos = async () => {
    if (!formData.categoriaId) return;
    try {
      const response = await tiempoService.getByCategoria(selectedTorneo, formData.categoriaId);
      setTiempos(response.data || []);
    } catch (error) {
      console.error('Error cargando tiempos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tiempoService.registrar(selectedTorneo, formData.categoriaId, {
        atletaId: formData.atletaId,
        tiempo: formData.tiempo,
        evento: formData.evento,
        observaciones: formData.observaciones,
      });
      setShowForm(false);
      setFormData({
        atletaId: '',
        categoriaId: '',
        tiempo: '',
        evento: '',
        observaciones: '',
      });
      fetchTiempos();
    } catch (error) {
      console.error('Error registrando tiempo:', error);
      alert('Error al registrar el tiempo');
    }
  };

  const formatTiempo = (tiempo) => {
    if (!tiempo) return '-';
    return tiempo;
  };

  if (loading) {
    return <div className="text-center py-8 flex items-center justify-center w-full">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Registro de Tiempos</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Torneo
        </label>
        <select
          value={selectedTorneo || ''}
          onChange={(e) => {
            setSelectedTorneo(e.target.value);
            setFormData({ ...formData, categoriaId: '', atletaId: '' });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Seleccione un torneo</option>
          {torneos.map((torneo) => (
            <option key={torneo.id} value={torneo.id}>
              {torneo.nombre} - {torneo.fecha}
            </option>
          ))}
        </select>
      </div>

      {selectedTorneo && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">Tiempos Registrados</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              {showForm ? 'Cancelar' : '+ Registrar Tiempo'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Registrar Tiempo</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    required
                    value={formData.categoriaId}
                    onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value, atletaId: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Atleta
                  </label>
                  <select
                    required
                    value={formData.atletaId}
                    onChange={(e) => setFormData({ ...formData, atletaId: e.target.value })}
                    disabled={!formData.categoriaId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                  >
                    <option value="">Seleccione un atleta</option>
                    {inscripciones.map((inscripcion) => (
                      <option key={inscripcion.id} value={inscripcion.atletaId}>
                        {inscripcion.atleta?.nombre} {inscripcion.atleta?.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiempo (mm:ss.ms)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tiempo}
                    onChange={(e) => setFormData({ ...formData, tiempo: e.target.value })}
                    placeholder="Ej: 01:23.45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Evento
                  </label>
                  <input
                    type="text"
                    value={formData.evento}
                    onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                    placeholder="Ej: 100m libre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observaciones
                  </label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                Registrar Tiempo
              </button>
            </form>
          )}

          {formData.categoriaId && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Atleta</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Evento</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Tiempo</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tiempos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No hay tiempos registrados para esta categoría
                      </td>
                    </tr>
                  ) : (
                    tiempos.map((tiempo) => (
                      <tr key={tiempo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {tiempo.atleta?.nombre} {tiempo.atleta?.apellido}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {tiempo.evento || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono">
                          {formatTiempo(tiempo.tiempo)}
                        </td>
                        <td className="px-6 py-4">
                          {tiempo.observaciones || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tiempos;

