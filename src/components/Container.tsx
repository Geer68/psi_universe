import React from "react";

export default function Container({
  wrapper: Wrapper = "div",
  className,
  children,
}: {
  wrapper?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Wrapper className={`max-w-[85%] m-auto ${className || ""}`}>
      {children}
    </Wrapper>
  );
}
