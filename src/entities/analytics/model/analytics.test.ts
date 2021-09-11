import { fork, allSettled } from "effector";
import { domains, events, effects } from "./analytics";

describe("analytics", () => {
  test("should send events instantly if analytics already inited", async () => {
    const scope = fork(domains.analyticsDomain, {
      handlers: new Map([[effects.initAnalyticsFx, jest.fn()]]),
    });
    // init analitics
    await allSettled(effects.initAnalyticsFx, { scope });
    await effects.initAnalyticsFx();
    // send event
    events.sendDataToAnalytics({ name: "test_1", payload: {} });
    // check event send
  });
});
