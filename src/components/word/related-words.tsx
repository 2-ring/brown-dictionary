import { Link } from 'react-router-dom';

interface RelatedWordsProps {
  text: string;
}

export const RelatedWords = ({ text }: RelatedWordsProps) => {
  // Extract unique words from the definition text (words longer than 2 chars)
  const extractWords = (text: string) => {
    const words = text.split(/\b/);
    const uniqueWords = new Set<string>();

    words.forEach(word => {
      if (word.match(/^[a-zA-Z]+$/) && word.length > 2) {
        uniqueWords.add(word.toLowerCase());
      }
    });

    return Array.from(uniqueWords).slice(0, 6); // Limit to first 6 words
  };

  const relatedWords = extractWords(text);

  return (
    <div className="text-text-muted text-base mb-4">
      {relatedWords.map((word, index) => (
        <span key={index}>
          <Link
            to={`/word/${word}`}
            className="text-primary hover:underline"
          >
            {word}
          </Link>
          {index < relatedWords.length - 1 && <span>. </span>}
        </span>
      ))}
      {relatedWords.length > 0 && <span>.....</span>}
    </div>
  );
};
