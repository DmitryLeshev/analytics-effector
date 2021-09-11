import React, { FC } from "react";

import { useTranslation } from "react-i18next";
import { makeStyles, createStyles } from "@material-ui/core";

import { Theme } from "shared/types";

type Props = { onSubmit: () => void };

export const Form: FC<Props> = ({ onSubmit, children }) => {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      alignItems: "center",

      marginTop: theme.spacing(2),

      "& > button": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);
