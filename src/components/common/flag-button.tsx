import { useState } from 'react';
import { Modal } from './modal';
import { toast } from 'sonner';
import { submitReport } from '../../database/db';

interface FlagButtonProps {
  wordSlug?: string;
}

export const FlagButton = ({ wordSlug }: FlagButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flagReasons = [
    { id: 'spam', label: 'Spam or advertising' },
    { id: 'offensive', label: 'Offensive or inappropriate' },
    { id: 'inaccurate', label: 'Inaccurate or misleading' },
    { id: 'duplicate', label: 'Duplicate definition' },
    { id: 'other', label: 'Other' },
  ];

  const handleSubmit = async () => {
    if (!selectedReason || !wordSlug) return;

    setIsSubmitting(true);
    try {
      await submitReport(wordSlug, selectedReason, additionalInfo);
      toast.success('Thank you for reporting.');
      setIsOpen(false);
      setSelectedReason('');
      setAdditionalInfo('');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2.5 border-2 border-white rounded-full hover:bg-highlight transition-colors flex items-center gap-2"
      >
        <svg
          className="w-3.5 h-3.5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
        <span className="text-xs font-bold text-white">FLAG</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Report this definition"
      >
        <div className="space-y-4">
          <p className="text-text-muted text-sm">
            Please select a reason for reporting this definition:
          </p>

          <div className="space-y-2">
            {flagReasons.map((reason) => (
              <label
                key={reason.id}
                className="flex items-center gap-3 p-3 bg-card-secondary hover:bg-background border border-border rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="flag-reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-card border-border focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-text">{reason.label}</span>
              </label>
            ))}
          </div>

          {selectedReason && (
            <div>
              <label htmlFor="additional-info" className="block text-text mb-2">
                Additional information (optional):
              </label>
              <textarea
                id="additional-info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Provide any additional details..."
                className="w-full px-4 py-3 bg-card-secondary border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                rows={3}
              />
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
