import { atom } from "nanostores";
import { STORAGE } from "./constants";

export const $accessToken = atom<string | null>(
  localStorage.getItem(STORAGE.GITHUB.ACCESS_TOKEN)
);
$accessToken.subscribe((value) => {
  if (value === null) localStorage.removeItem(STORAGE.GITHUB.ACCESS_TOKEN);
  else localStorage.setItem(STORAGE.GITHUB.ACCESS_TOKEN, value);
});

export const $refreshToken = atom<string | null>(
  localStorage.getItem(STORAGE.GITHUB.REFRESH_TOKEN)
);
$refreshToken.subscribe((value) => {
  if (value === null) localStorage.removeItem(STORAGE.GITHUB.REFRESH_TOKEN);
  else localStorage.setItem(STORAGE.GITHUB.REFRESH_TOKEN, value);
});
