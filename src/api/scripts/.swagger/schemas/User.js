export const UserDefinition = {
  create: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
            name: {
              type: 'string',
              example: 'User Name',
            },
            profile: {
              type: 'string',
              example: 'ADMIN|MANAGER|RESIDENT',
            },
            phone: {
              type: 'string',
              example: '31999999999',
            },
            birthDate: {
              type: 'string',
              example: '12/12/2012'
            }
          },
          required: ['email', 'password', 'name', 'profile'],
        },
      },
    },
  },
  update: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
            name: {
              type: 'string',
              example: 'User Name',
            },
            profile: {
              type: 'string',
              example: 'ADMIN|MANAGER|RESIDENT',
            },
            phone: {
              type: 'string',
              example: '31999999999',
            },
            birthDate: {
              type: 'string',
              example: '12/12/2012'
            }
          },
          required: ['email', 'password', 'name', 'profile'],
        },
      },
    },
  },
};
