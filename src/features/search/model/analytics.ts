import { libAnalytics } from "entities/analytics";

import { gates, events } from "./";

const eventFormShow = (): libAnalytics.TypeFormShow => ({
  name: libAnalytics.AnalyticType.FORM_SHOW,
  payload: {},
});

const eventChanged = (search: string): libAnalytics.TypeChanged => ({
  name: libAnalytics.AnalyticType.CHANGED,
  payload: { search },
});

const eventButtonClicked = (): libAnalytics.TypeButtonClicked => ({
  name: libAnalytics.AnalyticType.BUTTON_CLICKED,
  payload: {},
});

gates.SearchFormGate.open.watch(() => {
  libAnalytics.sendEvent(eventFormShow());
});

events.searchChanged.watch((search) => {
  libAnalytics.sendEvent(eventChanged(search));
});

events.searchButtonnClicked.watch(() => {
  libAnalytics.sendEvent(eventButtonClicked());
});
