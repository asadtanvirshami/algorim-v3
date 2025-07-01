/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Separator } from "../../separator";
import Link from "next/link";

export const ContactInfo = () => {
  return (
    <div className="max-w-screen-xl flex-col lg:flex xl:flex  mx-auto px-4 py-2">
      <div className=" flex-none md:flex lg:flex gap-2  justify-between items-center ">
        {/* Socials*/}
        <div className="flex gap-2">
          <div>
            <div className="flex h-5 items-center space-x-4 text-sm  font-[family-name:var(--font-redhat)]">
              {/* LinkedIn */}
              <Link href={"https://www.linkedin.com/company/algorim-io/"}>
                LinkedIn
              </Link>
              <Separator orientation="vertical" />
              {/* Facebook */}
              <Link
                href={"https://www.facebook.com/profile.php?id=61568140792184#"}
              >
                Facebook
              </Link>
              {/* Instagram */}
              <Separator orientation="vertical" />
              <Link href={"https://www.instagram.com/algorim.io/"}>
                Instagram
              </Link>
              {/* Twitter
              <Separator orientation="vertical" />
              <Link href={"/"}>Twitter</Link> */}
            </div>
            <h1 className="w-[20rem] text-xl font-semibold text-justify hyphens-auto mt-12">
              Let's begin a conversation about your needs. Email our team at
              info@algorimsoft.com
            </h1>
          </div>
        </div>
        <div className="flex-col flex mt-12">
          <ul>
            <h1>Location</h1>
            <ul>Karachi, Pakistan.</ul>
            <ul>Dubai, UAE.</ul>
          </ul>
        </div>
        <div className="flex-col flex mt-12">
          <ul>
            <h1>Contact</h1>
            <ul>{"(+92) 336-1818-434"}</ul>
          </ul>
        </div>
      </div>
    </div>
  );
};
