import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/torneos', label: 'Torneos', icon: '🏆' },
  { path: '/inscripciones', label: 'Inscripciones', icon: '📝' },
  { path: '/tiempos', label: 'Registro de Tiempos', icon: '⏱️' },
  { path: '/resultados', label: 'Resultados', icon: '📈' },
];

function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      <div
        className={`bg-primary text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } flex flex-col fixed lg:static h-full z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {isOpen && (
            <h1 className="text-xl font-bold">Torneos</h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          {isOpen && user && (
            <div className="mb-4">
              <p className="text-sm text-white/80">{user.nombre || user.email}</p>
              <p className="text-xs text-white/60 capitalize">{user.rol}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
          >
            <span>🚪</span>
            {isOpen && <span>Salir</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

