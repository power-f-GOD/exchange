export interface Country {
  node: {
    name: string;
    alpha2Code: string;
    capital: string;
    numericCode: number;
    currencies: {
      edges: Array<{
        node: {
          name: string;
          code: string;
          symbol: string;
        };
      }>;
    };
    flag: string;
  };
}

export interface Countries {
  edges: Country[];
}
