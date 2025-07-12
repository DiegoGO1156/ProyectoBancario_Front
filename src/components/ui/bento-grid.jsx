import { div } from "motion/react-client";
import { cn } from "./lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col rounded-xl border border-neutral-200 bg-white p-0 transition duration-200 hover:shadow-xl bg-[#e5e5e5]",
        className
      )}
    >
      {/* Imagen en el header */}
      {image && (
        <div className="w-full h-32 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-30 h-30 object-cover"
          />
        </div>
      )}

      {/* Contenido debajo */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="font-sans font-bold text-black">{title}</span>
        </div>
        <p className="font-sans text-sm text-black">{description}</p>
      </div>
    </div>
  );
};
