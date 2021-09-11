import React, { FC } from "react";

import { Atom } from "shared/ui";

type Props = { label: string };

export const Title: FC<Props> = ({ label }) => {
  return <Atom.Typography>{label}</Atom.Typography>;
};
