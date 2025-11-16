import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { torneoService } from '../services/torneoService';
import { Loader2 } from 'lucide-react';

function Torneos() {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    deporte: '',
    fecha: '',
    ubicacion: '',
    descripcion: '',
  });
  const [categorias, setCategorias] = useState(['']);
  const [eventos, setEventos] = useState(['']);

  useEffect(() => {
    fetchTorneos();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        categorias: categorias.filter(c => c.trim() !== ''),
        eventos: eventos.filter(e => e.trim() !== ''),
      };
      await torneoService.create(data);
      setShowForm(false);
      setFormData({ nombre: '', deporte: '', fecha: '', ubicacion: '', descripcion: '' });
      setCategorias(['']);
      setEventos(['']);
      fetchTorneos();
    } catch (error) {
      console.error('Error creando torneo:', error);
      alert('Error al crear el torneo');
    }
  };

  const addCategoria = () => setCategorias([...categorias, '']);
  const removeCategoria = (index) => {
    setCategorias(categorias.filter((_, i) => i !== index));
  };
  const updateCategoria = (index, value) => {
    const newCategorias = [...categorias];
    newCategorias[index] = value;
    setCategorias(newCategorias);
  };

  const addEvento = () => setEventos([...eventos, '']);
  const removeEvento = (index) => {
    setEventos(eventos.filter((_, i) => i !== index));
  };
  const updateEvento = (index, value) => {
    const newEventos = [...eventos];
    newEventos[index] = value;
    setEventos(newEventos);
  };

  if (loading) {
    return <div className="text-center py-8 flex items-center justify-center w-full">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Torneos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          {showForm ? 'Cancelar' : '+ Nuevo Torneo'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Crear Torneo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Torneo
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
                Deporte
              </label>
              <input
                type="text"
                required
                value={formData.deporte}
                onChange={(e) => setFormData({ ...formData, deporte: e.target.value })}
                placeholder="Natación, Triatlón, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                required
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                required
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Categorías
              </label>
              <button
                type="button"
                onClick={addCategoria}
                className="text-sm text-primary hover:underline"
              >
                + Agregar
              </button>
            </div>
            {categorias.map((cat, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => updateCategoria(index, e.target.value)}
                  placeholder="Ej: Sub-18, Libre, etc."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                {categorias.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCategoria(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Eventos
              </label>
              <button
                type="button"
                onClick={addEvento}
                className="text-sm text-primary hover:underline"
              >
                + Agregar
              </button>
            </div>
            {eventos.map((evt, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={evt}
                  onChange={(e) => updateEvento(index, e.target.value)}
                  placeholder="Ej: 100m libre, 200m mariposa, etc."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                {eventos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEvento(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
          >
            Crear Torneo
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {torneos.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No hay torneos registrados
          </div>
        ) : (
          torneos.map((torneo) => (
            <div
              key={torneo.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{torneo.nombre}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Deporte:</span> {torneo.deporte}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Fecha:</span> {torneo.fecha}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Ubicación:</span> {torneo.ubicacion}
              </p>
              <Link
                to={`/torneos/${torneo.id}`}
                className="text-primary hover:underline font-medium"
              >
                Ver detalles →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Torneos;

