import React, { useEffect, useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { authorsApi } from '../lib/api';

interface Author {
  id: string;
  name: string;
}

interface AuthorFormProps {
  onSuccess: () => void;
  initialData?: Author;
  cancelUpdate: () => void;
}

export function AuthorForm({ onSuccess, initialData, cancelUpdate }: AuthorFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(initialData?.name || '');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await authorsApi.update(initialData.id, { name });
        toast.success('Autor atualizado com sucesso');
      } else {
        await authorsApi.create({ name });
        toast.success('Autor criado com sucesso');
      }
      
      onSuccess();
      if (!initialData) setName('');
    } catch (error) {
      toast.error('Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary d-inline-flex align-items-center gap-2"
      >
        {loading ? (
          'Carregando...'
        ) : (
          <>
            {initialData ? <Save size={18} /> : <PlusCircle size={18} />}
            {initialData ? 'Atualizar Autor' : 'Adicionar Autor'}
          </>
        )}
      </button>
      {initialData && (
        <button
          type="button"
          onClick={() => {
            cancelUpdate();
          }}
          className="btn btn-outline-secondary ms-2"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}