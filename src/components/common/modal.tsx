import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  variant?: 'bottom-tray' | 'center';
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  variant = 'bottom-tray',
  size = 'md',
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const containerClasses =
    variant === 'bottom-tray'
      ? 'items-end md:items-center'
      : 'items-center';

  const contentClasses =
    variant === 'bottom-tray'
      ? 'rounded-t-3xl md:rounded-lg'
      : 'rounded-lg';

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center z-50 ${containerClasses}`}
      onClick={onClose}
    >
      <div
        className={`bg-card ${contentClasses} ${sizeClasses[size]} w-full animate-slide-up flex flex-col max-h-[90vh] md:max-h-[85vh]`}
        onClick={(e) => e.stopPropagation()}
      >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
              {title && <h3 className="text-xl font-bold text-text">{title}</h3>}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-text-muted hover:text-text transition-colors ml-auto"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

        <div className="overflow-y-auto px-6 pb-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
