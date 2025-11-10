import { useState } from 'react';

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
  definitionId?: string;
}

type VoteState = 'none' | 'up' | 'down';

export const VoteButtons = ({ upvotes, downvotes, definitionId }: VoteButtonsProps) => {
  const [voteState, setVoteState] = useState<VoteState>('none');
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);

  const handleUpvote = () => {
    if (voteState === 'up') {
      // Remove upvote
      setVoteState('none');
      setCurrentUpvotes(currentUpvotes - 1);
    } else if (voteState === 'down') {
      // Change from downvote to upvote
      setVoteState('up');
      setCurrentUpvotes(currentUpvotes + 1);
      setCurrentDownvotes(currentDownvotes - 1);
    } else {
      // Add upvote
      setVoteState('up');
      setCurrentUpvotes(currentUpvotes + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      // Remove downvote
      setVoteState('none');
      setCurrentDownvotes(currentDownvotes - 1);
    } else if (voteState === 'up') {
      // Change from upvote to downvote
      setVoteState('down');
      setCurrentDownvotes(currentDownvotes + 1);
      setCurrentUpvotes(currentUpvotes - 1);
    } else {
      // Add downvote
      setVoteState('down');
      setCurrentDownvotes(currentDownvotes + 1);
    }
  };

  return (
    <div className="flex items-center gap-0 border-2 border-white rounded-full overflow-hidden w-fit">
      <button
        onClick={handleUpvote}
        className={`px-6 py-2.5 hover:bg-highlight transition-colors flex items-center gap-2 ${
          voteState === 'up' ? 'bg-highlight' : ''
        }`}
      >
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        <span className="text-xs font-medium">{currentUpvotes}</span>
      </button>

      <div className="h-8 w-px bg-white mx-1" />

      <button
        onClick={handleDownvote}
        className={`px-6 py-2.5 hover:bg-highlight transition-colors flex items-center gap-2 ${
          voteState === 'down' ? 'bg-highlight' : ''
        }`}
      >
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>
        <span className="text-xs font-medium">{currentDownvotes}</span>
      </button>
    </div>
  );
};
