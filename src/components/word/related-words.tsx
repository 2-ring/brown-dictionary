import { Link } from 'react-router-dom';

interface RelatedWordsProps {
  text: string;
}

export const RelatedWords = ({ text }: RelatedWordsProps) => {
  const renderTextWithLinks = (text: string) => {
    const words = text.split(/\b/);
    return words.map((word, index) => {
      if (word.match(/^[a-zA-Z]+$/) && word.length > 2) {
        return (
          <Link
            key={index}
            to={`/word/${word.toLowerCase()}`}
            className="text-primary hover:underline"
          >
            {word}
          </Link>
        );
      }
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <div className="text-text-muted text-sm">
      {renderTextWithLinks(text)}
    </div>
  );
};
