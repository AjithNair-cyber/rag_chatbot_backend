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
  payload: { title: string; description: string; link: string };
};

export type Source = {
  title: string;
  url: string;
};

export type QueryResult = {
  answer: string;
  sources: Source[];
};

// Extend session type to include 'views'
declare module "express-session" {
  interface SessionData {
    views?: number;
  }
}
