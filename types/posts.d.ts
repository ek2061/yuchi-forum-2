export interface PostAbstractType {
  pid: string;
  nickname: string;
  createdAt: string;
  title: string;
  excerpt: string;
  like: string | number;
  dislike: string | number;
}

export interface PostContentType {
  uid: string;
  nickname: string;
  createdAt: string;
  title: string;
  content: string;
  like: string | number;
  dislike: string | number;
}

export interface CommentType {
  uid: string;
  nickname: string;
  createdAt: string;
  content: string;
}
