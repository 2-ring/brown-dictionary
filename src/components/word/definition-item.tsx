import type { Definition } from '../../database/db';
import { VoteButtons } from './vote-buttons';
import { Link } from 'react-router-dom';
import { FlagButton } from '../common/flag-button';

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
        <Link to={`/profile/${definition.author}`} className="text-highlight hover:underline">
          {definition.author}
        </Link>
        <span> {formatDate(definition.createdAt)}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <VoteButtons upvotes={definition.upvotes} downvotes={definition.downvotes} />
        <FlagButton wordSlug={termSlug} />
      </div>
    </div>
  );
};
