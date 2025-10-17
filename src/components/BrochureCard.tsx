import React from "react";

type Props = {
  title: string;
  imageUrl?: string;
  link?: string;
  buttonText?: string;
  description?: string;
  disabled?: boolean;
};

const BrochureCard: React.FC<Props> = ({ title, imageUrl, link, buttonText = "View", description, disabled }) => {
  return (
    <div
      className={`bg-[#ebebe1] border border-border rounded-lg overflow-hidden shadow-card transition-all duration-300 flex flex-col md:flex-row items-stretch ${
        disabled ? "opacity-60 grayscale" : "hover:shadow-card-hover"
      }`}
      role="region"
      aria-label={title}
    >
      {imageUrl && (
        <div className="md:w-1/2 w-full h-56 md:h-auto overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6 md:w-1/2 flex flex-col justify-center gap-4">
        <h2 className="text-2xl md:text-3xl font-freckle font-semibold text-[#9f694a] leading-tight">
          {title}
        </h2>
        {description && <p className="text-sm font-tilt text-[#9f694a]/80">{description}</p>}

        <div className="mt-2">
          {disabled ? (
            <div className="inline-block px-5 py-2 rounded bg-muted text-muted-foreground font-semibold select-none font-tilt">
              {buttonText}
            </div>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded bg-primary font-semibold shadow hover:bg-primary/90 transition font-tilt text-[#9f694a]/90"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureCard;