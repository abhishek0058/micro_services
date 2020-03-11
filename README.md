# micro_services


Database structure:

User collection
  name,
  email,
  phoneNumber,
  zipCode,
  address,
  country,
  gender,
  fDisabled
  
Session collection
  token 
  user

Description of a few tasks:

- Jwt token that will be expired after 4 hours
  While creating the token, I set the expiration time to be 4 hours from the time of the creation of token.

- User can't be login in multiple windows
  we have a session collection which lets us control that we won't create more than one token for one user.

- When admin disabled user then if user logged in that should be logged out on any next action.
  we make use of the key in the user collection called "fDisabled", if we make it true, then the user can't login again, and   we also remove the entry of user from session collection/

P. S. -> database is in mongoDB.
