import { useState } from 'react';

type NameModalProps = {
  isOpen: boolean;
  onSave: (name: string) => void;
};

export function NameModal({ isOpen, onSave }: NameModalProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Bem-vindo(a) ao TVDE Validator</h2>
        <p className="modal__subtitle">
          Por favor, insira o seu nome para continuar.
        </p>
        <form onSubmit={handleSubmit} className="modal__form">
          <input
            type="text"
            className="modal__input"
            placeholder="O seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button type="submit" className="btn btn--primary modal__submit">
            Começar
          </button>
        </form>
      </div>
    </div>
  );
}
