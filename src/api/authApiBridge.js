export let register = async (state) => {
  console.log('/api/auth/register');
  console.log('TODO registering user!!');
  console.log(state);
  return newResponse('fakehahaha', 200, 'Created user');
};

export let login = async (state) => {
  console.log('/api/auth/login');
  console.log('TODO login user!!');
  console.log(state);
  return newResponse('fakehahaha', 200, 'Created user');
};

let newResponse = (token, statusCode, content) => {
  return {
    'token': token,
    'statusCode': statusCode,
    'content': content
  };
}
