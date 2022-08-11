import { setCookies } from './setCookies';
import { parse } from 'cookie';

export async function cookieMiddlewareHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: EventContext<any, any, any>,
) {
  const cookieHeader = context.request.headers.get('cookie');

  if (cookieHeader) {
    context.data.cookies = parse(cookieHeader);
  } else {
    context.data.cookies = {};
  }

  context.data.setCookies = setCookies;

  return await context.next();
}
