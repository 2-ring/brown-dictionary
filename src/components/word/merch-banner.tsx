interface MerchBannerProps {
  term: string;
}

export const MerchBanner = ({ term }: MerchBannerProps) => {
  return (
    <div className="bg-black hover:bg-pink-500 transition-colors px-6 py-4 flex items-center justify-center gap-4 cursor-pointer">
      <div className="text-white text-sm">
        Get the <span className="font-bold">{term}</span> mug.
      </div>
    </div>
  );
};
