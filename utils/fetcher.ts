export const fetcher = async (path: string) => {
  const res = await fetch(path);
  const data = await res.json();
  return data;
};
