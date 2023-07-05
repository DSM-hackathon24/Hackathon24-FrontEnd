export const isHttpsUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === "https:";
};
