export let register = async (state) => {
  console.log('/api/users/register');
  console.log('TODO registering user!!');
  console.log(state);
  return {
    'token': 'fakehahaha',
    'statusCode': 200,
    'content': 'Created user'
  };
};
