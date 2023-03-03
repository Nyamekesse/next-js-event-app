import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
};

export default Footer;
