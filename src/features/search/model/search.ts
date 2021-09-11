import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";

import { createGate } from "effector-react";

const SearchFormGate = createGate();

const $search = createStore("");
const searchChanged = createEvent<string>();
const searchReset = createEvent();

$search.on(searchChanged, (_, newSearch) => newSearch);
const searchButtonnClicked = createEvent();

const startSearchFx = createEffect<string, void, Error>();

startSearchFx.use((search: string) => {
  console.log("Поиск начался", search);
});

sample({
  clock: searchButtonnClicked,
  source: $search,
  fn: (search) => search,
  target: startSearchFx,
});
forward({ from: startSearchFx, to: searchReset });

$search.reset(searchReset);

export const stores = { $search };
export const events = { searchChanged, searchButtonnClicked };
export const effects = { startSearchFx };
export const gates = { SearchFormGate };
