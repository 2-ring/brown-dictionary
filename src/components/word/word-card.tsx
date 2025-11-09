import { Link } from 'react-router-dom';
import type { Word } from '../../database/db';
import { DefinitionItem } from './definition-item';
import { ShareButton } from '../common/share-button';
import { RelatedWords } from './related-words';

interface WordCardProps {
  word: Word;
  showAllDefinitions?: boolean;
}

export const WordCard = ({ word, showAllDefinitions = false }: WordCardProps) => {
  const displayDefinitions = showAllDefinitions
    ? word.definitions
    : word.definitions.slice(0, 1);

  return (
    <div className="bg-ud-navy rounded-xl border border-ud-border/50 overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/word/${word.slug}`} className="flex-1">
            <h2 className="text-4xl font-bold text-ud-blue-light hover:underline">
              {word.term}
            </h2>
          </Link>
          <ShareButton />
        </div>

        {word.definitions[0] && (
          <div className="mb-6">
            <RelatedWords text={word.definitions[0].text} />
          </div>
        )}

        <div>
          {displayDefinitions.map((definition, index) => (
            <DefinitionItem
              key={index}
              definition={definition}
              termSlug={word.slug}
            />
          ))}
        </div>

        {!showAllDefinitions && word.definitions.length > 1 && (
          <div className="mt-6 pt-6 border-t border-ud-border/50">
            <Link
              to={`/word/${word.slug}`}
              className="text-ud-blue-light hover:underline text-sm"
            >
              View {word.definitions.length - 1} more definition{word.definitions.length - 1 !== 1 ? 's' : ''}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
