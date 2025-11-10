import type { Definition } from '../../database/db';
import { VoteButtons } from './vote-buttons';
import { Link } from 'react-router-dom';

interface DefinitionItemProps {
  definition: Definition;
  termSlug?: string;
  isFirst?: boolean;
}

export const DefinitionItem = ({ definition, termSlug, isFirst = false }: DefinitionItemProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={`pb-6 border-b border-border/50 last:border-b-0 ${isFirst ? 'pt-3' : 'pt-6'}`}>
      <div className="mb-3">
        <p className="text-text leading-relaxed whitespace-pre-wrap text-lg">
          {definition.text}
        </p>
      </div>

      {definition.example && (
        <div className="mb-3">
          <p className="text-text leading-relaxed whitespace-pre-wrap italic text-lg">
            {definition.example}
          </p>
        </div>
      )}

      <div className="text-lg text-text font-bold mb-6">
        <span>by </span>
        <Link to="#" className="text-highlight hover:underline">
          {definition.author}
        </Link>
        <span> {formatDate(definition.createdAt)}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <VoteButtons upvotes={definition.upvotes} downvotes={definition.downvotes} />

        <button className="px-4 py-2.5 border-2 border-white rounded-full hover:bg-highlight transition-colors flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          <span className="text-xs font-bold text-white">FLAG</span>
        </button>
      </div>
    </div>
  );
};
