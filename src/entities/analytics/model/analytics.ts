import { createDomain } from "effector";

import { AnalyticsEvent, initAnalytics } from "../lib";

const analyticsDomain = createDomain();

const initAnalyticsFx = analyticsDomain.createEffect({
  handler: initAnalytics,
});

const sendDataToAnalytics = analyticsDomain.createEvent<AnalyticsEvent>();

export const domains = { analyticsDomain };
export const events = { sendDataToAnalytics };
export const effects = { initAnalyticsFx };
