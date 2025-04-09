import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { subjectsApi } from '../lib/api';

interface Subject {
  id: string;
  description: string;
}

interface SubjectFormProps {
  onSuccess: () => void;
  initialData?: Subject;
  cancelUpdate: () => void;
}

export function SubjectForm({ onSuccess, initialData, cancelUpdate }: SubjectFormProps) {
  const [description, setDescription] = useState(initialData?.description || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDescription(initialData?.description || '');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await subjectsApi.update(initialData.id, { description });
        toast.success('Assunto atualizado com sucesso');
      } else {
        await subjectsApi.create({ description });
        toast.success('Assunto criado com sucesso');
      }
      
      onSuccess();
      if (!initialData) setDescription('');
    } catch (error) {
      toast.error('Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descrição
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary d-inline-flex align-items-center gap-2 me-3"
      >
        {loading ? (
          'Carregando...'
        ) : (
          <>
            {initialData ? <Save size={18} /> : <PlusCircle size={18} />}
            {initialData ? 'Atualizar Assunto' : 'Adicionar Assunto'}
          </>
        )}
      </button>
      {initialData && (
        <button
          type="button"
          onClick={() => cancelUpdate()}
          disabled={loading}
          className="btn btn-secondary d-inline-flex align-items-center gap-2"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}