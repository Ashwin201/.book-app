export type Tcategory = {
  id: string;
  catName: string;
};

export type Tpost = {
  id: string;
  title: string;
  desc: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    email: string;
  };
};
