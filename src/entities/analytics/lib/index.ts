let inited = false;

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
