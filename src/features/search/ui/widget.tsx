import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { reflect } from "@effector/reflect";

import { makeStyles, createStyles } from "@material-ui/core";

import { events, stores, gates } from "../model";
import { libAnalytics } from "entities/analytics";

import { Theme } from "shared/types";

import { Form, Title, Input, Submit } from "./components";
import { useGate } from "effector-react";

type Props = {
  search: string;
  searchOnChange: (search: string) => void;
  searchStart: () => void;
};

const View: FC<Props> = ({ search, searchOnChange, searchStart }) => {
  const { t } = useTranslation();
  useGate(gates.SearchFormGate);

  function onSubmit() {
    searchStart();

    // Analytics
    // libAnalytics.sendEvent({
    //   name: "search_started",
    //   payload: { search: value },
    // });
  }

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Title label={t("search:form.title")} />
      <Form onSubmit={onSubmit}>
        <Input
          label={t("search:form.input-label")}
          value={search}
          onChange={(e) => searchOnChange(e.target.value)}
        />
        <Submit label={t("search:form.submit")} />
      </Form>
    </div>
  );
};

export const Widget = reflect({
  view: View,
  bind: {
    search: stores.$search,
    searchOnChange: events.searchChanged,
    searchStart: events.searchButtonnClicked,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);
