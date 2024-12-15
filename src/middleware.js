/**
 * 
 * @param {*} context 
 * @param {*} next 
 * @returns 
 */

import Auth from "./utils/Auth";

export const onRequest = async (context, next) => {
  if(context.url.pathname == 'admin/login'){
    return next();
  }
  if(context.url.pathname.split('/')[1] !== 'admin') {
    return next()
  }
  const cookies = context.cookies.has('mystock') ? context.cookies.get('mystock').value : null;
  if(!cookies) {
    return next();
  }

  const validUser = await Auth.verifyAuth(cookies);
  if (!validUser) {
    return next();
  }
  context.locals.user = validUser;
  return next()
};