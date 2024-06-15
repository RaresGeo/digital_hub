import Link from "next/link";
import React from "react";

function getGoogleOAth2URL(): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_THIS_URL!}/auth/callback/google`;
  const responseType = "code";
  const scope = "email profile";
  const authEndpoint = "https://accounts.google.com/o/oauth2/auth";

  const url = new URL(authEndpoint);
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("response_type", responseType);
  url.searchParams.append("scope", scope);

  return url.toString();
}

export default function Navbar(): JSX.Element {
  return (
    <nav className="text-black flex justify-between px-64 py-6 w-full absolute top-0">
      <h1 className="text-2xl font-bold">LOGO</h1>
      <ul className="flex gap-4">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <Link href={getGoogleOAth2URL()}>Log in</Link>
      </ul>
    </nav>
  );
}
