import { Link } from 'react-router-dom';
import type { Word } from '../../database/db';
import { DefinitionItem } from './definition-item';
import { ShareButton } from '../common/share-button';

interface WordCardProps {
  word: Word;
  showAllDefinitions?: boolean;
}

export const WordCard = ({ word, showAllDefinitions = false }: WordCardProps) => {
  const displayDefinitions = showAllDefinitions
    ? word.definitions
    : word.definitions.slice(0, 1);

  return (
    <div className="bg-card rounded-xl overflow-hidden max-w-3xl mx-auto">
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <Link to={`/word/${word.slug}`} className="flex-1">
            <h2 className="text-4xl font-bold text-highlight hover:underline font-serif">
              {word.term}
            </h2>
          </Link>
          <ShareButton
            url={`${window.location.origin}/word/${word.slug}`}
            title={`${word.term} - Brown Dictionary`}
          />
        </div>

        <div>
          {displayDefinitions.map((definition, index) => (
            <DefinitionItem
              key={index}
              definition={definition}
              termSlug={word.slug}
              isFirst={index === 0}
            />
          ))}
        </div>

        {!showAllDefinitions && word.definitions.length > 1 && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <Link
              to={`/word/${word.slug}`}
              className="text-highlight hover:underline text-sm"
            >
              View {word.definitions.length - 1} more definition{word.definitions.length - 1 !== 1 ? 's' : ''}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
