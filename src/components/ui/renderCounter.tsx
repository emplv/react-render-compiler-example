import { HTMLAttributes, PropsWithChildren, useRef } from "react";

const useRenderCounter = () => {
  const counterRef = useRef(0);
  counterRef.current++;
  return counterRef.current;
};

// const showCounter = true;
const showCounter = false;

export default function RenderCounter({
  children,
  className = "",
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  const renderCount = useRenderCounter();
  return showCounter ? (
    <div className={`${className} relative`} {...rest}>
      {children}
      <div className="absolute z-[9] bg-error text-center line-height-[24px] h-[18px] rounded-[12px] px-[4px] top-[0] right-[0] text-[12px]">
        {renderCount}
      </div>
    </div>
  ) : (
    children
  );
}
