import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { booksApi, subjectsApi, authorsApi } from '../lib/api';

interface Book {
  id: string;
  title: string;
  edition: number;
  publish_year: number;
  subject_ids: string[];
  author_ids: string[];
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
}

export function BookForm({ onSuccess, initialData }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [edition, setEdition] = useState(initialData?.edition || 1);
  const [publishYear, setPublishYear] = useState<number>(initialData?.publish_year || new Date().getFullYear());
  const [subjectIds, setSubjectIds] = useState<string[]>(initialData?.subject_ids || []);
  const [authorIds, setAuthorIds] = useState<string[]>(initialData?.author_ids || []);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [publisher, setPublisher] = useState(initialData?.publisher || '');
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setTitle(initialData?.title || '');
    setEdition(initialData?.edition || 1);
    setPublishYear(initialData?.publish_year || new Date().getFullYear());
    setSubjectIds(initialData?.subject_ids || []);
    setAuthorIds(initialData?.author_ids || []);
    setPrice(initialData?.price || 0);
    setPublisher(initialData?.publisher || '');
  },[initialData])

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
        <label htmlFor="subjects" className="form-label">
          Assuntos
        </label>
        <select
          id="subjects"
          multiple
          name='subjects'
          value={subjectIds}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setSubjectIds(values);
          }}
          className="form-select"
          required
          size={4}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.description}
            </option>
          ))}
        </select>
        <small className="text-muted">Pressione Ctrl (ou Cmd no Mac) para selecionar múltiplos assuntos</small>
      </div>

      <div className="mb-3">
        <label htmlFor="authors" className="form-label">
          Autores
        </label>
        <select
          id="authors"
          multiple
          name='authors'
          value={authorIds}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setAuthorIds(values);
          }}
          className="form-select"
          required
          size={4}
        >
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <small className="text-muted">Pressione Ctrl (ou Cmd no Mac) para selecionar múltiplos autores</small>
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
    </form>
  );
}