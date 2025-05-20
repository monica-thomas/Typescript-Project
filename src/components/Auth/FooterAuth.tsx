// footerAuth.tsx
import React from "react";
import moment from "moment";

interface FooterTextProps {
  year?: string;
  name?: string;
  desc?: string;
}

const FooterAuth: React.FC<FooterTextProps> = ({
  year = moment().format("YYYY"),
  name = "Calpinemate",
  desc = "Calpine group",
}) => (
  <React.Fragment>
    <span>
      Copyright © {year} {desc},&nbsp; All Rights Reserved.
    </span>
    <a
      href="https://www.calpinetech.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="sidebar__link text-success"
    >
      www.calpinetech.com
    </a>
    <div className="d-flex justify-content-end">
      <span>v2.2.1</span>
    </div>
  </React.Fragment>
);

export default FooterAuth ;
