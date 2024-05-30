"use server";
import { getAbout } from "../../server_actions/landing-page";
import { getColor } from "../../utils/styling";

export default async function About(): Promise<JSX.Element> {
  const {
    text,
    background_color: backgroundColor,
    text_color: textColor,
  } = await getAbout();

  console.log("About", text, backgroundColor, textColor);

  return (
    <div
      className="w-screen h-fit flex items-center justify-center px-52 py-44 font-medium"
      style={{
        backgroundColor: getColor(backgroundColor),
        color: getColor(textColor),
      }}
    >
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg mt-4">{text}</p>
      </div>
    </div>
  );
}
