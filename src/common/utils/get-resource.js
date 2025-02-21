/**
 * @param {string} message
 * @returns {void}
 */
const throwError = (message) => {
  throw new Error(message);
};

/**
 * @template T
 * @param {string} url
 * @param {string} mimeType
 * @returns {Promise<T>}
 */
export const getResource = (url, mimeType) =>
  fetch(url, {
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

    const contentType = response
      .headers
      .get('content-type')
      .toLowerCase();
    const mediaType = mimeType.toLowerCase();
    
    if (contentType !== mediaType) {
      throwError(
        `MIME Type "${contentType}" not allowed, expected "${mediaType}"`
      );
    }
  
    return /** @type {T} */(response);
  });
