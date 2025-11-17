import { useState } from 'react';
import { migrateDefinitionIds, resetAllVotes } from '../database/migrate-definition-ids';
import { Button } from '../components/common/button';

type MigrationStatus = 'idle' | 'running' | 'complete' | 'error';

export default function Migrate() {
  const [idStatus, setIdStatus] = useState<MigrationStatus>('idle');
  const [idMessage, setIdMessage] = useState('');

  const [voteStatus, setVoteStatus] = useState<MigrationStatus>('idle');
  const [voteMessage, setVoteMessage] = useState('');

  const runIdMigration = async () => {
    setIdStatus('running');
    setIdMessage('Running ID migration...');

    try {
      await migrateDefinitionIds();
      setIdStatus('complete');
      setIdMessage('ID migration completed successfully!');
    } catch (error) {
      setIdStatus('error');
      setIdMessage(`ID migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('ID migration error:', error);
    }
  };

  const runVoteReset = async () => {
    setVoteStatus('running');
    setVoteMessage('Resetting all votes...');

    try {
      await resetAllVotes();
      setVoteStatus('complete');
      setVoteMessage('All votes reset successfully!');
    } catch (error) {
      setVoteStatus('error');
      setVoteMessage(`Vote reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Vote reset error:', error);
    }
  };

  const renderStatus = (status: MigrationStatus, message: string, onRetry: () => void) => {
    if (status === 'running') {
      return (
        <div className="text-text">
          <div className="animate-pulse">{message}</div>
        </div>
      );
    }

    if (status === 'complete') {
      return (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
          <p className="text-green-500 font-medium">{message}</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-500 font-medium">{message}</p>
          <Button onClick={onRetry} variant="primary" className="mt-4">
            Try Again
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Add Definition IDs */}
      <div className="bg-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-text mb-2">1. Add Definition IDs</h2>
        <p className="text-text-muted mb-6">
          Adds unique IDs to all definitions that don't have one. Required for the voting system.
        </p>

        {idStatus === 'idle' && (
          <Button onClick={runIdMigration} variant="primary">
            Add Definition IDs
          </Button>
        )}

        {renderStatus(idStatus, idMessage, runIdMigration)}
      </div>

      {/* Reset All Votes */}
      <div className="bg-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-text mb-2">2. Reset All Votes</h2>
        <p className="text-text-muted mb-6">
          Resets all vote counts to 0 and clears all vote arrays. Use this to start fresh with voting.
        </p>

        {voteStatus === 'idle' && (
          <Button onClick={runVoteReset} variant="primary">
            Reset All Votes to 0
          </Button>
        )}

        {renderStatus(voteStatus, voteMessage, runVoteReset)}
      </div>
    </div>
  );
}
