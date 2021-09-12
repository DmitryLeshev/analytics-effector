import { forward, guard, sample } from "effector";
import { modelAnalytics } from "entities/analytics";

import { gates, events, stores } from "./";

enum AnalyticType {
  FORM_SHOW = "search_form_open",
  CHANGED = "search_changed",
  BUTTON_CLICKED = "search_button_clicked",
}

type TypeFormShow = {
  name: AnalyticType.FORM_SHOW;
  payload: {};
};

type TypeChanged = {
  name: AnalyticType.CHANGED;
  payload: { search: string };
};

type TypeButtonClicked = {
  name: AnalyticType.BUTTON_CLICKED;
  payload: {};
};

type AnalyticsEvent = TypeFormShow | TypeChanged | TypeButtonClicked;

const eventFormShow = (): AnalyticsEvent => ({
  name: AnalyticType.FORM_SHOW,
  payload: {},
});

const eventChanged = (search: string): AnalyticsEvent => ({
  name: AnalyticType.CHANGED,
  payload: { search },
});

const eventButtonClicked = (search: string): AnalyticsEvent => ({
  name: AnalyticType.BUTTON_CLICKED,
  payload: { search },
});

sample({
  clock: gates.SearchFormGate.open,
  fn: () => eventFormShow(),
  target: modelAnalytics.events.sendDataToAnalytics,
});

sample({
  clock: events.searchChanged,
  fn: (search) => eventChanged(search),
  target: modelAnalytics.events.sendDataToAnalytics,
});

sample({
  source: stores.$search,
  clock: events.searchButtonnClicked,
  fn: (search) => eventButtonClicked(search),
  target: modelAnalytics.events.sendDataToAnalytics,
});
