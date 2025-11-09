import { Link } from 'react-router-dom';
import { Word } from '../../database/db';
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
    <div className="bg-ud-navy rounded-lg border border-ud-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Link to={`/word/${word.slug}`} className="flex-1">
            <h2 className="text-3xl font-bold text-ud-blue-light hover:underline">
              {word.term}
            </h2>
          </Link>
          <ShareButton />
        </div>

        {word.definitions[0] && (
          <RelatedWords text={word.definitions[0].text} />
        )}

        <div className="mt-6">
          {displayDefinitions.map((definition, index) => (
            <DefinitionItem
              key={index}
              definition={definition}
              termSlug={word.slug}
            />
          ))}
        </div>

        {!showAllDefinitions && word.definitions.length > 1 && (
          <div className="mt-6 pt-6 border-t border-ud-border">
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
