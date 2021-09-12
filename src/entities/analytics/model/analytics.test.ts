import { fork, allSettled } from "effector";
import { domains, events, effects } from "./analytics";

describe("analytics", () => {
  test("should send events instantly if analytics already inited", async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: "test_event_1", payload: {} };

    const scope = fork(domains.analyticsDomain, {
      handlers: new Map<any, any>([
        [effects.initAnalyticsFx, jest.fn()],
        [effects.sendEventFx, sendEventMock],
      ]),
    });
    // init analitics
    await allSettled(effects.initAnalyticsFx, { scope });
    // send event
    await allSettled(events.sendDataToAnalytics, { scope, params: TEST_EVENT });
    // check event send
    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });

  test("should send events only after intiailization", async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: "test_1", payload: {} };

    const scope = fork(domains.analyticsDomain, {
      handlers: new Map<any, any>([
        [effects.initAnalyticsFx, jest.fn()],
        [effects.sendEventFx, sendEventMock],
      ]),
    });

    // send event
    await allSettled(events.sendDataToAnalytics, { scope, params: TEST_EVENT });
    expect(sendEventMock).not.toHaveBeenCalled();

    // init analitics
    await allSettled(effects.initAnalyticsFx, { scope });
    // check event send
    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });

  test("double initialization", async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: "test_1", payload: {} };

    const scope = fork(domains.analyticsDomain, {
      handlers: new Map<any, any>([
        [effects.initAnalyticsFx, jest.fn()],
        [effects.sendEventFx, sendEventMock],
      ]),
    });

    // send event
    await allSettled(events.sendDataToAnalytics, { scope, params: TEST_EVENT });
    expect(sendEventMock).not.toHaveBeenCalled();

    // init analitics
    await allSettled(effects.initAnalyticsFx, { scope });
    // check event send
    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);

    // init analitics
    await allSettled(effects.initAnalyticsFx, { scope });
    // check event send
    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });
});
