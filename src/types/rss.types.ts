export type NewsItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
};

export type QdrantInsertPayload = {
  id: number | string;
  vector: number[];
  payload: { title: string; description: string; url: string };
};
