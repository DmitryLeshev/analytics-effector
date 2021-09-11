import React, { FC } from "react";

import { Atom } from "shared/ui";

type Props = { label: string };
export const Submit: FC<Props> = ({ label }) => {
  return <Atom.Button type="submit">{label}</Atom.Button>;
};
