export const throwError = (message: string): void => {
  throw new Error(message);
};

export const getResource = (
  url: string,
  mimeType: string
): Promise<Response> => fetch(url, {
  method: 'GET',
  mode: 'same-origin',
  headers: new Headers({
    'Accept': mimeType,
    'Content-Type': mimeType,
    'X-Content-Type-Options': 'nosniff'
  })
}).then((response) => {
  if (!response.ok) {
    throwError(`${response.status}`);
  }

  const mediaType = mimeType.toLowerCase();
  const contentType = response
    .headers
    .get('content-type')
    ?.toLocaleLowerCase();

  if (contentType !== mediaType) {
    throwError(
      `MIME Type "${contentType}" not allowed, expected "${mediaType}"`
    );
  }

  return response;
});
