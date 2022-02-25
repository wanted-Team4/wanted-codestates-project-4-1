import { atom, selector } from "recoil";

export const Repos = atom({
  key: "Repos",
  default: {},
});

export const toggleState = atom({
  key: "Toggle",
  default: false
});

export const bookState = selector({
  key: 'bookState',
  get: ({ get }) => {
    const toggle = get(toggleState);
    if (toggle) {
      return get(!toggle)
    } else {
      return get(toggle)
    }
  }
})