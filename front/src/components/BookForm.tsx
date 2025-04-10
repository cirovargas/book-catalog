import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { booksApi, subjectsApi, authorsApi } from '../lib/api';

interface Book {
  id: string;
  title: string;
  edition: number;
  publishYear: number;
  subjects: Subject[];
  authors: Author[];
  price: number;
  publisher: string;
}

interface Subject {
  id: string;
  description: string;
}

interface Author {
  id: string;
  name: string;
}

interface BookFormProps {
  onSuccess: () => void;
  initialData?: Book;
  cancelUpdate: () => void;
}

export function BookForm({ onSuccess, initialData, cancelUpdate }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [edition, setEdition] = useState(initialData?.edition || 1);
  const [publishYear, setPublishYear] = useState<number>(initialData?.publishYear || new Date().getFullYear());
  const [subjectIds, setSubjectIds] = useState<string[]>(initialData?.subjects.map((subject) => subject.id) || []);
  const [authorIds, setAuthorIds] = useState<string[]>(initialData?.authors.map((author) => author.id) || []);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [publisher, setPublisher] = useState(initialData?.publisher || '');
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, authorsRes] = await Promise.all([
          subjectsApi.getAll(),
          authorsApi.getAll()
        ]);
        setSubjects(subjectsRes.data.data);
        setAuthors(authorsRes.data.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        toast.error('Falha ao carregar dados do formulário');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
      setTitle(initialData?.title || '');
      setEdition(initialData?.edition || 1);
      setPublishYear(initialData?.publishYear || '');
      setSubjectIds(initialData?.subjects.map((subject) => subject.id) || []);
      setAuthorIds(initialData?.authors.map((author) => author.id) || []);
      setPrice(initialData?.price || 0);
      setPublisher(initialData?.publisher || '');
  }, [initialData]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPrice(parseInt(value) || 0);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const currentYear = new Date().getFullYear();
    
    if (value > currentYear) {
      toast.error('O ano de publicação não pode ser maior que o ano atual');
      return;
    }
    
    if (value < 1900) {
      toast.error('O ano de publicação deve ser maior que 1900');
      return;
    }
    
    setPublishYear(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (subjectIds.length === 0) {
      toast.error('Selecione pelo menos um assunto');
      setLoading(false);
      return;
    }

    if (authorIds.length === 0) {
      toast.error('Selecione pelo menos um autor');
      setLoading(false);
      return;
    }

    const bookData = {
      title,
      edition,
      publishYear: publishYear,
      subjectIds: subjectIds,
      authorIds: authorIds,
      price,
      publisher
    };

    try {
      if (initialData) {
        await booksApi.update(initialData.id, bookData);
        toast.success('Livro atualizado com sucesso');
      } else {
        await booksApi.create(bookData);
        toast.success('Livro criado com sucesso');
      }
      
      onSuccess();
      if (!initialData) {
        setTitle('');
        setEdition(1);
        setPublishYear(new Date().getFullYear());
        setSubjectIds([]);
        setAuthorIds([]);
        setPrice(0);
        setPublisher('');
      }
    } catch (err) {
      console.error('Erro ao salvar livro:', err);
      toast.error('Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="edition" className="form-label">
            Edição
          </label>
          <input
            type="number"
            id="edition"
            value={edition}
            onChange={(e) => setEdition(parseInt(e.target.value))}
            className="form-control"
            required
            min="1"
          />
        </div>

        <div className="col">
          <label htmlFor="publishYear" className="form-label">
            Ano de Publicação
          </label>
          <input
            type="number"
            id="publishYear"
            value={publishYear}
            onChange={handleYearChange}
            className="form-control"
            required
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Assuntos
        </label>
        <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {subjects.map((subject) => (
            <div key={subject.id} className="form-check">
              <input
                type="checkbox"
                id={`subject-${subject.id}`}
                className="form-check-input"
                checked={subjectIds.includes(subject.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSubjectIds([...subjectIds, subject.id]);
                  } else {
                    setSubjectIds(subjectIds.filter(id => id !== subject.id));
                  }
                }}
              />
              <label className="form-check-label" htmlFor={`subject-${subject.id}`}>
                {subject.description}
              </label>
            </div>
          ))}
        </div>
        <small className="text-muted">Selecione um ou mais assuntos</small>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Autores
        </label>
        <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {authors.map((author) => (
            <div key={author.id} className="form-check">
              <input
                type="checkbox"
                id={`author-${author.id}`}
                className="form-check-input"
                checked={authorIds.includes(author.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAuthorIds([...authorIds, author.id]);
                  } else {
                    setAuthorIds(authorIds.filter(id => id !== author.id));
                  }
                }}
              />
              <label className="form-check-label" htmlFor={`author-${author.id}`}>
                {author.name}
              </label>
            </div>
          ))}
        </div>
        <small className="text-muted">Selecione um ou mais autores</small>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Preço
        </label>
        <input
          type="text"
          id="price"
          value={formatPrice(price)}
          onChange={handlePriceChange}
          className="form-control"
          required
          placeholder="R$ 0,00"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="publisher" className="form-label">
          Editora
        </label>
        <input
          type="text"
          id="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="d-flex gap-2">
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
              {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
            </>
          )}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={cancelUpdate}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}