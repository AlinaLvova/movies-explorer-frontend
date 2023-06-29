import React, { useState } from "react";

import "./SectionHeader.css";

function SectionHeader({ headerTitle }) {
  return <h3 className="section-header">{headerTitle}</h3>;
}

export default SectionHeader;
