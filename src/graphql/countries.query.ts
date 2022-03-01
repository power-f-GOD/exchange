import type { Countries } from 'src/types';
import { baseQuery } from '.';

const COUNTRIES = `
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

export const countriesQuery = async (variables: Record<string, string>) => {
  return (
    await baseQuery<{ data: { countries: Countries } }>(
      'https://graphql.country/graphql',
      'CountryNodeConnection',
      COUNTRIES,
      variables
    )
  )?.data.countries.edges;
};
