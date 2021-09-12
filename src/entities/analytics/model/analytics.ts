import { createDomain, guard, sample } from "effector";

import { AnalyticsEvent, initAnalytics, sendEvent } from "../lib";

const analyticsDomain = createDomain();

const logout = analyticsDomain.createEvent({ sid: "logout" });
analyticsDomain.onCreateStore((store) => store.reset(logout));

const $inited = analyticsDomain.createStore(false, { sid: "inited" });

const initAnalyticsFx = analyticsDomain.createEffect({
  sid: "initAnalyticsFx",
  handler: initAnalytics,
});

$inited.on(initAnalyticsFx.done, () => true);

const sendDataToAnalytics = analyticsDomain.createEvent<AnalyticsEvent>({
  sid: "sendDataToAnalytics",
});

const sendEventFx = analyticsDomain.createEffect({
  sid: "sendEventFx",
  handler: sendEvent,
});

guard({ source: sendDataToAnalytics, filter: $inited, target: sendEventFx });

// Not inited
const $notInited = $inited.map((inited) => !inited);

const $delaydEvents = analyticsDomain.createStore<AnalyticsEvent[]>([], {
  sid: "delaydEvents",
});

const sendEventToQueue = analyticsDomain.createEvent<AnalyticsEvent>({
  sid: "sendEventToQueue",
});

$delaydEvents.on(sendEventToQueue, (events, newEvent) => [...events, newEvent]);

const sendManyEventsFx = analyticsDomain.createEffect({
  sid: "sendManyEventsFx",
  handler: (events: AnalyticsEvent[]) => {
    return Promise.all(events.map(sendEventFx));
  },
});

const delayedEventsSent = analyticsDomain.createEvent({
  sid: "delayedEventsSent",
});

guard({
  source: sendDataToAnalytics,
  filter: $notInited,
  target: sendEventToQueue,
});

sample({
  clock: initAnalyticsFx.done,
  source: $delaydEvents,
  target: [sendManyEventsFx, delayedEventsSent],
});

$delaydEvents.reset(delayedEventsSent);

export const domains = { analyticsDomain };
export const events = { sendDataToAnalytics, logout };
export const effects = { initAnalyticsFx, sendEventFx };
