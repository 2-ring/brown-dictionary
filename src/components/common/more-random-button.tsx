import { Button } from './button';

interface MoreRandomButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export const MoreRandomButton = ({ onClick, isLoading = false }: MoreRandomButtonProps) => {
  return (
    <div className="flex justify-center mt-8">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'More random definitions'}
      </Button>
    </div>
  );
};
