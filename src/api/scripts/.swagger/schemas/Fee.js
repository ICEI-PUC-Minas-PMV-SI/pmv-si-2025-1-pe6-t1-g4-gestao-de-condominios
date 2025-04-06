export const FeeDefinition = {
    create: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'RENT|CONDOMINIUM|OTHER'
              },
              name: {
                type: 'string',
                example: 'Fee Name',
              },
              due: {
                type: 'datetime',
                example: '2020-01-01T00:00:00.000Z',
              },
              isRecurrent: {
                type: 'boolean',
                example: true,
              },
              condominiumId: {
                type: 'CUID',
                example: '1234567890abcdef',
              }
            },
            required: ['type', 'name', 'due', 'isRecurrent', 'condominiumId'],
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
                    type: {
                    type: 'string',
                    example: 'RENT|CONDOMINIUM|OTHER'
                    },
                    name: {
                    type: 'string',
                    example: 'Fee Name',
                    },
                    due: {
                    type: 'datetime',
                    example: '2020-01-01T00:00:00.000Z',
                    },
                    isRecurrent: {
                    type: 'boolean',
                    example: true,
                    },
                    condominiumId: {
                    type: 'CUID',
                    example: '1234567890abcdef',
                    }
                },
                required: ['type', 'name', 'due', 'isRecurrent', 'condominiumId'],
            },
        },
      },
    },
  };
  