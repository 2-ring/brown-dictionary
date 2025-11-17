import { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { addNewWord } from '../../database/db';
import { toast } from 'sonner';

interface AddDefinitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDefinitionModal = ({ isOpen, onClose }: AddDefinitionModalProps) => {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    example: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addNewWord({
        term: formData.term,
        definition: formData.definition,
        example: formData.example,
      });

      toast.success('Word added successfully!');
      setFormData({ term: '', definition: '', example: '' });
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to add word. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Define a word"
    >
      <form onSubmit={handleSubmit} className="space-y-6 py-2">
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

        <div>
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit!'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
