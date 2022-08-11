# Cloudflare Functions Cookie Parser

This module provides a middleware for use with Cloudflare Functions that attaches cookies to `ctx.data.cookies`

It also attaches a helper function to `ctx.data.setCookies` to attach cookies to a response.

## Examples

This example will attach the cookie parser middleware to every incoming request

```ts
// ./functions/_middleware.ts

import { cookieMiddlewareHandler } from '@bpleco/cff-cookie-parser';

export const onRequest = [cookieMiddlewareHandler];
```

Then in your function route you can interact with the existing cookie data and set new cookies

```ts
// ./functions/api/testing

export async function onRequest(context) {
  // this will log the preexisting cookies
  console.log(context.data.cookies);

  const response = new Response('Hello, world!');

  // this will set a new cookie that expires in a weeks time
  context.data.setCookies(response, {
    wantACookie: {
      value: 'yesPlease',
      options: {
        expires: new Date(Date.now() + 86400000 * 7),
      },
    },
  });

  return response;
}
```

You can also set multiple cookies with the cookie object

```ts
// ./functions/api/testing

export async function onRequest(context) {
  // this will log the preexisting cookies
  console.log(context.data.cookies);

  const response = new Response('Hello, world!');

  // this will set two new cookies that expires in a week and two days respectively
  context.data.setCookies(response, {
    wantACookie: {
      value: 'yesPlease',
      // this is a shorthand property for expires in days
      expiresIn: 1,
    },
    wantAnotherCookie: {
      value: 'forSure',
      options: {
        expires: new Date(Date.now() + 86400000 * 2),
        httpOnly: true,
      },
    },
  });

  return response;
}
```

## Options

```ts
interface CreateCookiesObject {
  /** This can be any string and is used to name the cookie */
  [key: string]: {
    /** The value of the cookie */
    value: string;
    /** Shorthand for days expires in, this takes precedence over any expires defined in options  */
    expiresIn?: number;
    /** These options are passed straight to `cookie` module see https://www.npmjs.com/package/cookie
     */
    options?: CookieSerializeOptions;
  };
}
```
