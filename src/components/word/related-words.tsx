import { Link } from 'react-router-dom';

interface RelatedWordsProps {
  text: string;
}

export const RelatedWords = ({ text }: RelatedWordsProps) => {
  // Extract key words as related terms
  const extractRelatedWords = (text: string) => {
    const words = text.split(/\b/);
    const keyWords: string[] = [];

    words.forEach(word => {
      // Extract significant words (3+ chars, alphabetic only)
      if (word.match(/^[a-zA-Z]+$/) && word.length >= 3) {
        // Skip common words
        const commonWords = ['the', 'and', 'with', 'for', 'are', 'from', 'that', 'this'];
        if (!commonWords.includes(word.toLowerCase())) {
          keyWords.push(word.toLowerCase());
        }
      }
    });

    // Return unique words, limit to first 5-6
    return [...new Set(keyWords)].slice(0, 6);
  };

  const relatedWords = extractRelatedWords(text);

  return (
    <div className="text-base mb-4">
      {relatedWords.map((word, index) => (
        <span key={index}>
          <Link
            to={`/word/${word}`}
            className="text-highlight hover:underline"
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
