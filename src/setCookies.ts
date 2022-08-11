import { serialize } from 'cookie';
import { CreateCookiesObject } from '.';

const setCookies = function setCookies(response: Response, cookies: CreateCookiesObject): void {
  const cookieKeys = Object.keys(cookies);

  cookieKeys.forEach((key) => {
    const options = { ...cookies[key].options };

    if (cookies[key].expiresIn) {
      options.expires = new Date(Date.now() + 86400000 * cookies[key].expiresIn);
    }

    const cookie = serialize(key, cookies[key].value, options);

    response.headers.append('Set-Cookie', cookie);
  });
};

export { setCookies };
