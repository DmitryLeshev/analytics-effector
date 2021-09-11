import React from "react";

import { RouteChildrenProps } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { reflect } from "@effector/reflect";

import { UISearch, modelSearch } from "features/search";

import { Molec, Atom } from "shared/ui";
import { Theme } from "shared/types";

type Props = RouteChildrenProps<{}> & {};

const View = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Molec.Page className={classes.page} title={t("pages:home.title")}>
      <Atom.Typography variant="h3" align="center">
        HomePage
      </Atom.Typography>
      <Atom.Divider />
      <UISearch.Widget />
    </Molec.Page>
  );
};

const HomePage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      padding: theme.spacing(3),
    },
  })
);

export default HomePage;
