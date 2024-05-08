import React, { ReactNode } from "react";

// Define TextProps type
export type TextProps = {
  children?: ReactNode;
  className?: string;
  fontFamily?: string;
};

// Export P component with Montserrat font
export function P({
  children,
  className,
  fontFamily = 'Montserrat', // Set Montserrat as the default font family
}: TextProps) {
  return (
    <p
      className={`text-neutral-500 ${className}`}
      style={{ fontFamily: fontFamily, fontSize: 16 }} // Apply the font family and font size
    >
      {children}
    </p>
  );
}

// Export H1 component with Montserrat font
export function H1({ children, className }: TextProps) {
  return (
    <h1
      className={
        "text-[36px] font-bold leading-[140%] sm:text-[44px] " + className
      }
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </h1>
  );
}

// Export Pblk component with Montserrat font
export function Pblk({ children, className }: TextProps) {
  return (
    <p
      className={"text-black " + className}
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </p>
  );
}

// Export Li component with Montserrat font
export function Li({ children, className }: TextProps) {
  return (
    <li
      className={"text-black " + className}
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </li>
  );
}

// Export H2 component with Montserrat font
export function H2({ children, className }: TextProps) {
  return (
    <h2
      className={
        "text-[24px] md:text-4xl md:leading-[120%] font-bold text-black " +
        className
      }
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </h2>
  );
}

// Export H3 component with Montserrat font
export function H3({ children, className }: TextProps) {
  return (
    <h3
      className={"text-[28px] font-bold text-black " + className}
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </h3>
  );
}

// Export H4 component with Montserrat font
export function H4({ children, className }: TextProps) {
  return (
    <h4
      className={"text-2xl font-bold text-black " + className}
      style={{ fontFamily: 'Montserrat' }} // Apply the Montserrat font family
    >
      {children}
    </h4>
  );
}