import { Http } from '$lib';

export * from './countries.query';

export const baseQuery = async <ResponseType>(
  url: string,
  operationName: string,
  query: string,
  variables: Record<string, string>
) => {
  try {
    return await Http.post<ResponseType>(url, {
      operationName,
      query,
      variables
    });
  } catch (e) {
    Http.error(e as string);
    throw e;
  }
};
