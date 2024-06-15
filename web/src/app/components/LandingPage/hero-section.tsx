"use server";

import Link from "next/link";
import { getColor } from "../../utils/styling";

export default async function HeroSection(): Promise<JSX.Element> {
  const {
    header,
    subheader,
    background_color: backgroundColor,
    text_color: textColor,
    button_text: buttonText,
    button_text_color: buttonTextColor,
    button_background: buttonBackground,
    button_href: buttonHref,
  } = {
    header: "Welcome to our website",
    subheader: "We are excited to have you here!",
    background_color: "white",
    text_color: "black",
    button_text: "Get started",
    button_text_color: "white",
    button_background: "blue",
    button_href: "/signup",
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center text-black"
      style={{
        backgroundColor: getColor(backgroundColor),
        color: getColor(textColor),
      }}
    >
      <div className="flex flex-col items-center justify-center gap-12 w-full max-w-6xl text-center">
        <h1 className="text-[104px] tracking-widest">{header}</h1>
        <h2>{subheader}</h2>
        <Link
          className="px-9 py-4 font-semibold rounded-xl"
          href={buttonHref}
          style={{
            backgroundColor: getColor(buttonBackground),
            color: getColor(buttonTextColor),
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
