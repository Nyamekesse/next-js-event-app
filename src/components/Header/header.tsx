import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image
            src={"/images/logo_black.png"}
            height={50}
            width={50}
            alt="logo image"
          />
          <nav>
            <ul>
              <li>
                {" "}
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href={"/events"}>Events</Link>
              </li>
              <li>
                {" "}
                <Link href="/about-us">About Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title"> Sed ut perspiciatis unde omnis</p>
      </div>
    </header>
  );
};

export default Header;
