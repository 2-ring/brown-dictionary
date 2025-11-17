import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { upvoteDefinition, downvoteDefinition, removeVote, getUserVote } from '../../database/db';

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
  definitionId: string;
  wordId: string;
}

type VoteState = 'none' | 'up' | 'down';

export const VoteButtons = ({ upvotes, downvotes, definitionId, wordId }: VoteButtonsProps) => {
  const { user } = useAuth();
  const [voteState, setVoteState] = useState<VoteState>('none');
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);
  const [isLoading, setIsLoading] = useState(false);

  // Load user's existing vote on mount and when props change
  useEffect(() => {
    const loadUserVote = async () => {
      console.log('[VoteButtons] Loading vote state:', { user: !!user, userId: user?.uid, definitionId, wordId });

      if (!user || !definitionId || !wordId) {
        console.log('[VoteButtons] Missing required data, setting to none');
        setVoteState('none');
        return;
      }

      try {
        const existingVote = await getUserVote(wordId, definitionId, user.uid);
        console.log('[VoteButtons] Loaded vote from DB:', existingVote);
        setVoteState(existingVote || 'none');
      } catch (error) {
        console.error('Error loading user vote:', error);
        setVoteState('none');
      }
    };

    loadUserVote();
  }, [user, definitionId, wordId]);

  // Update counts when props change
  useEffect(() => {
    setCurrentUpvotes(upvotes);
    setCurrentDownvotes(downvotes);
  }, [upvotes, downvotes]);

  const handleUpvote = async () => {
    if (!user) {
      alert('Please sign in to vote');
      return;
    }

    if (isLoading) return;

    // Optimistic update
    const previousState = voteState;
    const previousUpvotes = currentUpvotes;
    const previousDownvotes = currentDownvotes;

    try {
      setIsLoading(true);

      if (voteState === 'up') {
        // Remove upvote
        setVoteState('none');
        setCurrentUpvotes(currentUpvotes - 1);
        await removeVote(wordId, definitionId, user.uid);
      } else if (voteState === 'down') {
        // Change from downvote to upvote
        setVoteState('up');
        setCurrentUpvotes(currentUpvotes + 1);
        setCurrentDownvotes(currentDownvotes - 1);
        await upvoteDefinition(wordId, definitionId, user.uid);
      } else {
        // Add upvote
        setVoteState('up');
        setCurrentUpvotes(currentUpvotes + 1);
        await upvoteDefinition(wordId, definitionId, user.uid);
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Rollback on error
      setVoteState(previousState);
      setCurrentUpvotes(previousUpvotes);
      setCurrentDownvotes(previousDownvotes);
      alert('Failed to save vote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!user) {
      alert('Please sign in to vote');
      return;
    }

    if (isLoading) return;

    // Optimistic update
    const previousState = voteState;
    const previousUpvotes = currentUpvotes;
    const previousDownvotes = currentDownvotes;

    try {
      setIsLoading(true);

      if (voteState === 'down') {
        // Remove downvote
        setVoteState('none');
        setCurrentDownvotes(currentDownvotes - 1);
        await removeVote(wordId, definitionId, user.uid);
      } else if (voteState === 'up') {
        // Change from upvote to downvote
        setVoteState('down');
        setCurrentDownvotes(currentDownvotes + 1);
        setCurrentUpvotes(currentUpvotes - 1);
        await downvoteDefinition(wordId, definitionId, user.uid);
      } else {
        // Add downvote
        setVoteState('down');
        setCurrentDownvotes(currentDownvotes + 1);
        await downvoteDefinition(wordId, definitionId, user.uid);
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Rollback on error
      setVoteState(previousState);
      setCurrentUpvotes(previousUpvotes);
      setCurrentDownvotes(previousDownvotes);
      alert('Failed to save vote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-0 border-2 border-white rounded-full overflow-hidden w-fit">
      <button
        onClick={handleUpvote}
        disabled={isLoading}
        className={`px-6 py-2.5 hover:bg-highlight transition-colors flex items-center gap-2 border-r border-white ${
          voteState === 'up' ? 'bg-highlight' : ''
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Upvote definition"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10v12"/>
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
        </svg>
        <span className="text-xs font-medium text-white">{currentUpvotes}</span>
      </button>

      <button
        onClick={handleDownvote}
        disabled={isLoading}
        className={`px-6 py-2.5 hover:bg-highlight transition-colors flex items-center gap-2 ${
          voteState === 'down' ? 'bg-highlight' : ''
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Downvote definition"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 14V2"/>
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
        </svg>
        <span className="text-xs font-medium text-white">{currentDownvotes}</span>
      </button>
    </div>
  );
};
