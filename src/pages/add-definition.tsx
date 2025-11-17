import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/button';

export const AddDefinition = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    example: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-background rounded-lg border border-border p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            URBAN DICTIONARY IS WRITTEN BY YOU
          </h1>
          <p className="text-text-muted">
            Define a Word
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              id="term"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full bg-card-secondary text-highlight px-4 py-3 rounded border border-border focus:outline-none focus:border-primary text-4xl font-bold font-serif"
              placeholder="Word"
              required
            />
          </div>

          <div>
            <textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              rows={6}
              className="w-full bg-card-secondary text-text px-4 py-3 rounded border border-border focus:outline-none focus:border-primary resize-none"
              placeholder="Type your definition here..."
              required
            />
          </div>

          <div>
            <textarea
              id="example"
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              rows={6}
              className="w-full bg-card-secondary text-text px-4 py-3 rounded border border-border focus:outline-none focus:border-primary resize-none"
              placeholder="Type an example of how it's used in a sentence..."
              required
            />
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button type="submit" variant="primary">
              Define a Word
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
