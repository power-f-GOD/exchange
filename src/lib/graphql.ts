import { gql } from '@apollo/client/core/index.js';

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

export const COUNTRIES = gql`
  query CountryNodeConnection($country: String) {
    countries(name_Icontains: $country, first: 5) {
      edges {
        node {
          name
          alpha2Code
          capital
          numericCode
          currencies {
            edges {
              node {
                name
                code
                symbol
              }
            }
          }
          flag
        }
      }
    }
  }
`;
