export function DashboardInfo() {
  return (
    <div className="about-page" style={{ maxWidth: '800px', margin: '32px auto 0', padding: '0' }}>
      {/* Hero Section */}
      <section className="about-hero" style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '40px', 
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)'
      }}>
        <h1 style={{ fontSize: '28px', color: 'var(--color-text)', marginBottom: '16px' }}>
          Sobre o TVDE Simulation
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
          Plataforma gratuita criada para ajudar os candidatos na preparação para os exames TVDE e IMT.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="mailto:adrianorabello@icloud.com" 
            className="btn btn--primary" 
            style={{ textDecoration: 'none', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contactar-nos
          </a>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '12px 16px', 
            backgroundColor: 'var(--color-warning-light)', 
            color: 'var(--color-warning)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '14px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Plataforma Independente
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* About the Platform Card */}
        <div className="card" style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderRadius: 'var(--radius-md)', 
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-text)' }}>Sobre a Plataforma</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
            O TVDE Simulation é uma plataforma educativa gratuita desenvolvida para ajudar os candidatos na preparação para o exame de certificação TVDE e outras avaliações do IMT.
          </p>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            A plataforma foi criada com o objetivo de tornar os materiais de estudo mais acessíveis através de simulações interativas, testes práticos e recursos de aprendizagem.
          </p>
        </div>

        {/* Disclaimer Card */}
        <div className="card" style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderRadius: 'var(--radius-md)', 
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-warning)' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Aviso Legal
          </h2>
          <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Esta plataforma <strong>não é afiliada, não é endossada e não tem qualquer ligação oficial com o IMT (Instituto da Mobilidade e dos Transportes)</strong>.</li>
            <li>O conteúdo disponibilizado destina-se exclusivamente a fins educativos e de treino.</li>
            <li>Embora sejam envidados todos os esforços para garantir a precisão das perguntas e respostas, podem ocorrer erros ou informações desatualizadas ocasionalmente.</li>
            <li>Os utilizadores devem sempre consultar a documentação oficial do IMT e entidades de formação certificadas ao preparar-se para exames oficiais.</li>
          </ul>
        </div>

        {/* Feedback and Suggestions Card */}
        <div className="card" style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderRadius: 'var(--radius-md)', 
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-text)' }}>Feedback e Sugestões</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
            Estamos constantemente a melhorar a plataforma e agradecemos o feedback de formandos e formadores.
          </p>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>Se você:</p>
          <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Encontrar uma resposta incorreta</li>
            <li>Notar uma imagem em falta</li>
            <li>Identificar informações desatualizadas</li>
            <li>Tiver sugestões de melhoria</li>
            <li>Quiser contribuir com novos materiais de estudo</li>
          </ul>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Por favor, contacte-nos por e-mail:{' '}
            <a href="mailto:adrianorabello@icloud.com" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              adrianorabello@icloud.com
            </a>
          </p>
        </div>

        {/* Community Contribution Card */}
        <div className="card" style={{ 
          backgroundColor: 'var(--color-primary-light)', 
          borderRadius: 'var(--radius-md)', 
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-primary)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>Contribuição da Comunidade</h2>
          <p style={{ color: 'var(--color-primary)', lineHeight: 1.6, marginBottom: '16px' }}>
            O seu feedback ajuda a melhorar a qualidade da plataforma para todos os futuros estudantes que se preparam para o exame TVDE.
          </p>
          <p style={{ color: 'var(--color-primary-dark)', fontWeight: 600, fontSize: '18px' }}>
            Obrigado por utilizar o TVDE Simulation e boa sorte nos seus estudos!
          </p>
        </div>

      </div>
    </div>
  );
}
