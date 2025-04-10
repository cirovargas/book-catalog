import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { SubjectForm } from './components/SubjectForm';
import { AuthorForm } from './components/AuthorForm';
import { BookForm } from './components/BookForm';
import { Book, Pencil, Trash2, User, BookOpen, Download } from 'lucide-react';
import { subjectsApi, authorsApi, booksApi, reportsApi } from './lib/api';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    bootstrap: {
      Modal: {
        new(element: HTMLElement): {
          show(): void;
          hide(): void;
        };
        getInstance(element: HTMLElement): {
          hide(): void;
        } | null;
      };
    };
  }
}

interface Subject {
  id: string;
  description: string;
}

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  edition: number;
  publish_year: number;
  subject_ids: string[];
  author_ids: string[];
  price: number;
  publisher: string;
  subjects?: { description: string }[];
  authors?: { name: string }[];
}

function App() {
  const [activeTab, setActiveTab] = useState<'subjects' | 'authors' | 'books'>('subjects');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'subjects' | 'authors' | 'books' } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      switch (activeTab) {
        case 'subjects':
          const { data: subjectsData } = await subjectsApi.getAll();
          setSubjects(subjectsData.data);
          break;
        case 'authors':
          const { data: authorsData } = await authorsApi.getAll();
          setAuthors(authorsData.data);
          break;
        case 'books':
          const { data: booksData } = await booksApi.getAll();
          setBooks(booksData.data);
          break;
      }
    } catch (error) {
      toast.error('Erro ao buscar dados');
    }
  };

  const openDeleteModal = (id: string, type: 'subjects' | 'authors' | 'books') => {
    setItemToDelete({ id, type });
    const modal = new window.bootstrap.Modal(modalRef.current!);
    modal.show();
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case 'subjects':
          await subjectsApi.delete(id);
          setSubjects(subjects.filter(subject => subject.id !== id));
          break;
        case 'authors':
          await authorsApi.delete(id);
          setAuthors(authors.filter(author => author.id !== id));
          break;
        case 'books':
          await booksApi.delete(id);
          setBooks(books.filter(book => book.id !== id));
          break;
      }
      toast.success('Item excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir item');
    } finally {
      setItemToDelete(null);
      const modal = window.bootstrap.Modal.getInstance(modalRef.current!);
      modal?.hide();
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Toaster position="top-right" />
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-pills mb-4">
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('subjects')}
                  className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'subjects' ? 'active' : ''}`}
                >
                  <Book size={18} />
                  Assuntos
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('authors')}
                  className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'authors' ? 'active' : ''}`}
                >
                  <User size={18} />
                  Autores
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setActiveTab('books')}
                  className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'books' ? 'active' : ''}`}
                >
                  <BookOpen size={18} />
                  Livros
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={async () => {
                    reportsApi.booksByAuthor()
                    .then((response) => {
                      const href = URL.createObjectURL(response.data);

                      const link = document.createElement('a');
                      link.href = href;
                      link.setAttribute('download', 'relatorio_autores.pdf'); 
                      document.body.appendChild(link);
                      link.click();

                      document.body.removeChild(link);
                      URL.revokeObjectURL(href);
                  });
                  }}
                  className={`nav-link d-flex align-items-center gap-2 ms-3`}
                >
                  <Download size={18} />
                  Relatório
                </button>
              </li>
            </ul>

            <div className="card">
              <div className="card-body">
                {activeTab === 'subjects' && (
                  <SubjectForm
                    onSuccess={() => {
                      fetchData();
                      setEditingItem(null);
                    }}
                    initialData={editingItem}
                    cancelUpdate={() => setEditingItem(null)}
                  />
                )}
                {activeTab === 'authors' && (
                  <AuthorForm
                    onSuccess={() => {
                      fetchData();
                      setEditingItem(null);
                    }}
                    cancelUpdate={() => setEditingItem(null)}
                    initialData={editingItem}
                  />
                )}
                {activeTab === 'books' && (
                  <BookForm
                    onSuccess={() => {
                      fetchData();
                      setEditingItem(null);
                    }}
                    cancelUpdate={() => setEditingItem(null)}
                    initialData={editingItem}
                  />
                )}

                <hr />

                {activeTab === 'subjects' && (
                  <div className="list-group">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <span>{subject.description}</span>
                        <div className="btn-group">
                          <button
                            onClick={() => setEditingItem(subject)}
                            className="btn btn-outline-primary btn-sm"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(subject.id, 'subjects')}
                            className="btn btn-outline-danger btn-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'authors' && (
                  <div className="list-group">
                    {authors.map((author) => (
                      <div
                        key={author.id}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <span>{author.name}</span>
                        <div className="btn-group">
                          <button
                            onClick={() => setEditingItem(author)}
                            className="btn btn-outline-primary btn-sm"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(author.id, 'authors')}
                            className="btn btn-outline-danger btn-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'books' && (
                  <div className="list-group">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        className="list-group-item list-group-item-action"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5 className="mb-0">{book.title}</h5>
                          <div className="btn-group">
                            <button
                              onClick={() => setEditingItem(book)}
                              className="btn btn-outline-primary btn-sm"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(book.id, 'books')}
                              className="btn btn-outline-danger btn-sm"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="small text-muted">
                          <p className="mb-1">Autores: {book.authors?.map(author => author.name).join(', ')}</p>
                          <p className="mb-1">Assuntos: {book.subjects?.map(subject => subject.description).join(', ')}</p>
                          <p className="mb-1">Edição: {book.edition}</p>
                          <p className="mb-1">Ano de Publicação: {book.publishYear}</p>
                          <p className="mb-1">Editora: {book.publisher}</p>
                          <p className="mb-0">Preço: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(book.price / 100)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Tem certeza que deseja excluir este item?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => itemToDelete && handleDelete(itemToDelete.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;