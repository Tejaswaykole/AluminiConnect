export const useAuth = () => {
  return {
    login: async (token: string) => {
      console.log('Dummy login with token', token);
    },
    logout: async () => {
      console.log('Dummy logout');
    }
  };
};
