"use client";
import * as React from "react";
import { cn } from "./lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

const MotionInput = React.forwardRef(
  (
    {
      field,
      label,
      value,
      onChangeHandler,
      onBlurHandler,
      type = "text",
      showErrorMessage,
      validationMessage,
      textArea = false,
      className,
      ...props
    },
    ref
  ) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const handleValueChange = (event) => {
      onChangeHandler?.(event.target.value, field);
    };

    const handleInputBlur = (event) => {
      onBlurHandler?.(event.target.value, field);
    };

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b82f6,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative rounded-lg p-[2px] transition duration-300"
      >
        <div className="relative z-10 bg-zinc-900 rounded-md">
          {textArea ? (
            <textarea
              ref={ref}
              value={value}
              onChange={handleValueChange}
              onBlur={handleInputBlur}
              rows={5}
              className={cn(
                "w-full rounded-md border-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                className
              )}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              type={type}
              value={value}
              onChange={handleValueChange}
              onBlur={handleInputBlur}
              className={cn(
                "w-full rounded-md border-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                className
              )}
              {...props}
            />
          )}
          {showErrorMessage && (
            <span className="text-red-500 text-sm px-3">{validationMessage}</span>
          )}
        </div>
      </motion.div>
    );
  }
);

MotionInput.displayName = "MotionInput";

export { MotionInput };
