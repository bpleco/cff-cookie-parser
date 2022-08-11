import type { CookieSerializeOptions as _CookieSerializeOptions } from 'cookie';

export * from './middleware';

export type CookieSerializeOptions = _CookieSerializeOptions;

export interface CreateCookiesObject {
  /** This can be any string and is used to name the cookie */
  [key: string]: {
    /** The value of the cookie */
    value: string;
    /** Shorthand for days expires in, this takes precedence over any expires defined in options  */
    expiresIn?: number;
    /** These options are passed straight to `cookie` module */
    options?: CookieSerializeOptions;
  };
}

export type setCookies = (response: Response, cookies: CreateCookiesObject) => void;
