import * as analytics from "./analytics";

const events = { ...analytics.events };
const effects = { initAnalyticsFx: analytics.effects.initAnalyticsFx };

export { events, effects };
