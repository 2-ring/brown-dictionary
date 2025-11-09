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
      <div className="bg-ud-navy rounded-lg border border-ud-border p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-ud-blue rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-ud-blue-light mb-2">
            URBAN DICTIONARY IS WRITTEN BY YOU
          </h1>
          <p className="text-ud-text-muted">
            Define a Word
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="term" className="block text-ud-text font-medium mb-2">
              Word
            </label>
            <input
              type="text"
              id="term"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full bg-ud-navy-light text-ud-text px-4 py-3 rounded border border-ud-border focus:outline-none focus:border-ud-blue"
              placeholder="Enter the word or phrase"
              required
            />
          </div>

          <div>
            <label htmlFor="definition" className="block text-ud-text font-medium mb-2">
              Definition
            </label>
            <textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              rows={6}
              className="w-full bg-ud-navy-light text-ud-text px-4 py-3 rounded border border-ud-border focus:outline-none focus:border-ud-blue resize-none"
              placeholder="Write the definition"
              required
            />
          </div>

          <div>
            <label htmlFor="example" className="block text-ud-text font-medium mb-2">
              Example
            </label>
            <textarea
              id="example"
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              rows={6}
              className="w-full bg-ud-navy-light text-ud-text px-4 py-3 rounded border border-ud-border focus:outline-none focus:border-ud-blue resize-none"
              placeholder="Use the word in a sentence or provide context"
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
