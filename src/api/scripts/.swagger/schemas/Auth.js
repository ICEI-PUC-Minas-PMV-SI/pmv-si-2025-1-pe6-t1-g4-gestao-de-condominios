export const AuthDefinition = {
  authRequestBody: {
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
          },
          required: ['email', 'password'],
        },
      },
    },
  },
};
