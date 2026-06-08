import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

type LayoutProps = {
  children: ReactNode;
  activePage: string;
  userName: string;
  onChangePage: (pageId: string) => void;
};

export function Layout({ children, activePage, userName, onChangePage }: LayoutProps) {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    simulados: 'Simulados',
    questoes: 'Questões',
    progresso: 'O meu Progresso',
    resultados: 'Resultados',
    definicoes: 'Definições',
  };

  const title = titles[activePage] || 'TVDE Validator';

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} userName={userName} onChangePage={onChangePage} />
      <div className="dashboard__main">
        <TopHeader userName={userName} />
        <div className="dashboard__content">
          {/* Page title area */}
          <div className="page-title-bar">
            <div className="page-title-bar__left">
              <h1 className="page-title-bar__title">{title}</h1>
              <p className="page-title-bar__subtitle">
                Pratique e valide as suas respostas do exame TVDE
              </p>
            </div>
            <div className="page-title-bar__breadcrumb">
              <span>Home</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="page-title-bar__breadcrumb-active">{title}</span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
