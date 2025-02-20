/**
 * @param {string} message
 * @returns {void}
 */
const showError = (message) => {
  throw new Error(message);
};

/**
 * @template T
 * @param {string} url
 * @param {string} mimeType
 * @param {() => void} [onError]
 * @returns {Promise<T>}
 */
export const getResource = (
  url,
  mimeType,
  onError = () => {}
) =>
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
      onError();
      showError(`${response.status}`);
    }

    const contentType = response
      .headers
      .get('content-type')
      .toLowerCase();
    const mediaType = mimeType.toLowerCase();
    
    if (contentType !== mediaType) {
      onError();
      showError(
        `MIME Type "${contentType}" not allowed, expected "${mediaType}"`
      );
    }
  
    return /** @type {T} */(response);
  });
