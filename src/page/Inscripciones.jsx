import { useState, useEffect } from 'react';
import { atletaService } from '../services/atletaService';
import { torneoService } from '../services/torneoService';
import { Loader2 } from 'lucide-react';

function Inscripciones() {
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [InscribiendoAtleta, setInscribiendoAtleta] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    categoriaId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTorneos();
  }, []);

  useEffect(() => {
    if (selectedTorneo) {
      fetchCategorias();
      fetchInscripciones();
    }
  }, [selectedTorneo]);

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
      const response = await atletaService.getInscripciones(selectedTorneo);
      setInscripciones(response.data || []);
    } catch (error) {
      console.error('Error cargando inscripciones:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInscribiendoAtleta(true);
    try {
      await atletaService.inscribir(
        selectedTorneo,
        formData.categoriaId,
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          fechaNacimiento: formData.fechaNacimiento,
        }
      );
      setShowForm(false);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        categoriaId: '',
      });
      fetchInscripciones();
    } catch (error) {
      console.error('Error inscribiendo atleta:', error);
      alert('Error al inscribir el atleta');
    } finally {
      setInscribiendoAtleta(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 flex items-center justify-center w-full">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Inscripciones</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Torneo
        </label>
        <select
          value={selectedTorneo || ''}
          onChange={(e) => setSelectedTorneo(e.target.value)}
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
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">Inscripciones del Torneo</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              {showForm ? 'Cancelar' : '+ Nueva Inscripción'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Inscribir Atleta</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    required
                    value={formData.categoriaId}
                    onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
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
              </div>
              
              { InscribiendoAtleta && (
                  <Loader2 className="w-8 h-8 animate-spin" />
              )}
              { !InscribiendoAtleta && (
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                Inscribir Atleta
              </button>
              )}
            </form>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Atleta</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Categoría</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Fecha Inscripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inscripciones.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No hay inscripciones registradas
                    </td>
                  </tr>
                ) : (
                  inscripciones.map((inscripcion) => (
                    <tr key={inscripcion._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inscripcion.atleta_id?.nombre} {inscripcion.atleta_id?.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inscripcion.atleta_id?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inscripcion.categoria_id?.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inscripcion.fecha_inscripcion ? formatDate(inscripcion.fecha_inscripcion) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Inscripciones;

