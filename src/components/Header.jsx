function Header({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          ☰
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">Administración de Torneos</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

