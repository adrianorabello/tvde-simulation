type TopHeaderProps = {
  userName: string;
  showSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
};

export function TopHeader({ userName, showSearch, searchTerm = '', onSearchChange }: TopHeaderProps) {
  return (
    <header className="top-header">
      <div className="top-header__left">
        {showSearch && (
          <div className="top-header__search">
            <svg
              className="top-header__search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
            <input
              type="text"
              className="top-header__search-input"
              placeholder="Pesquisar perguntas..."
              aria-label="Pesquisar perguntas"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="top-header__right">
        {/* Notifications */}
        <button
          type="button"
          className="top-header__icon-btn"
          aria-label="Notificações"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="top-header__badge">3</span>
        </button>

        {/* Messages */}
        <button
          type="button"
          className="top-header__icon-btn"
          aria-label="Mensagens"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="top-header__divider" />

        {/* User */}
        <div className="top-header__user">
          <div className="top-header__user-avatar">{userName ? userName.charAt(0).toUpperCase() : '?'}</div>
          <div className="top-header__user-info">
            <span className="top-header__user-name">{userName || 'Estudante'}</span>
            <span className="top-header__user-role">Estudante</span>
          </div>
        </div>
      </div>
    </header>
  );
}
