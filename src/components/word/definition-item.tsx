import { Link } from 'react-router-dom';
import { Definition } from '../../database/db';
import { VoteButtons } from './vote-buttons';

interface DefinitionItemProps {
  definition: Definition;
  termSlug?: string;
}

export const DefinitionItem = ({ definition, termSlug }: DefinitionItemProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const renderTextWithLinks = (text: string) => {
    const words = text.split(/\b/);
    return words.map((word, index) => {
      if (word.match(/^[a-zA-Z]+$/)) {
        return (
          <Link
            key={index}
            to={`/word/${word.toLowerCase()}`}
            className="text-ud-blue-light hover:underline"
          >
            {word}
          </Link>
        );
      }
      return word;
    });
  };

  return (
    <div className="py-6 border-b border-ud-border last:border-b-0">
      <div className="mb-4">
        <p className="text-ud-text leading-relaxed whitespace-pre-wrap">
          {definition.text}
        </p>
      </div>

      {definition.example && (
        <div className="mb-4 pl-4 border-l-2 border-ud-border">
          <p className="text-ud-text-muted leading-relaxed whitespace-pre-wrap italic">
            {definition.example}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-ud-text-muted">
          <span>by </span>
          <Link to="#" className="text-ud-blue-light hover:underline">
            {definition.author}
          </Link>
          <span> {formatDate(definition.createdAt)}</span>
        </div>

        <div className="flex items-center gap-3">
          <VoteButtons upvotes={definition.upvotes} downvotes={definition.downvotes} />

          <button className="px-4 py-2 border-2 border-ud-border rounded-full hover:border-ud-blue transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <span className="text-sm">FLAG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
