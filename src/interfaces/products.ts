interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IFilter {
  label: string;
  value: string | number;
}
export interface IFilterOptions {
  category: IFilter[];
  price: IFilter[];
  ratings: IFilter[];
}
