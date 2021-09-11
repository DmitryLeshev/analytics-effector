let inited = false;

export enum AnalyticType {
  FORM_SHOW = "search_form_open",
  CHANGED = "search_changed",
  BUTTON_CLICKED = "search_button_clicked",
}

export type TypeFormShow = {
  name: AnalyticType.FORM_SHOW;
  payload: {};
};

export type TypeChanged = {
  name: AnalyticType.CHANGED;
  payload: { search: string };
};

export type TypeButtonClicked = {
  name: AnalyticType.BUTTON_CLICKED;
  payload: {};
};

// export type AnalyticsEvent = TypeFormShow | TypeChanged | TypeButtonClicked;

export type AnalyticsEvent = {
  name: string;
  payload: Record<string, string | number>;
};

export async function initAnalytics() {
  await new Promise((res) => setTimeout(res, 3000));
  inited = true;
  console.log("INIT analytics");
}

export function sendEvent({ name, payload }: AnalyticsEvent) {
  if (!inited) {
    throw new Error("Analytics not initialized!");
  }

  console.log(
    `Sending event: ${name} with payload "${JSON.stringify(payload)}"`
  );
}

// const FORM_SHOW: string = "search_form_open";
// const CHANGED: string = "search_changed";
// const BUTTON_CLICKED: string = "search_button_clicked";
// export const events = { FORM_SHOW, CHANGED, BUTTON_CLICKED };
