export type offert = {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: number;
  bought: number;
  photos: any[];
  author: author;
  discount: discount;
};

export type discount = { value: number; expireDate: string };

export type author = {
  id: string;
  username: string;
};

export type offertForm = {
  title: string;
  description: string;
  price: number;
  inStock: number;
  bought: number;
  category: string;
  photos: any[];
};
