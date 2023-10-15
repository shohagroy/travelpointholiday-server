export type ICategory = {
  id?: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: Date;
  categoryId: string;
  categories?: ICategory;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ICountryFilters = {
  search?: string;
};
