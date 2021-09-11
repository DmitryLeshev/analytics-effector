import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { Atom } from "shared/ui";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};
export const Input: FC<Props> = ({ value, onChange, label }) => {
  const { t } = useTranslation();
  return <Atom.Input label={label} value={value} onChange={onChange} />;
};
