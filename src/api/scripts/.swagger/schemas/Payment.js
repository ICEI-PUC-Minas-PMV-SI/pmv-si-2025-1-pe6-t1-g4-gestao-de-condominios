export const PaymentDefinition = {
    create: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              amount: {
                type: 'decimal',
                example: 20.00
              },
              paymentDate: {
                type: 'datetime',
                example: '2020-01-01T00:00:00.000Z',
              },
              feeId: {
                type: 'CUID',
                example: '1234567890abcdef',
              },
              condominiumId: {
                type: 'CUID',
                example: '1234567890abcdef',
              },
              userId: {
                type: 'CUID',
                example: '1234567890abcdef',
              },
              apartmentId: {
                type: 'CUID',
                example: '1234567890abcdef',
              }
            },
            required: ['amount', 'paymentDate', 'feeId', 'condominiumId', 'userId', 'apartmentId'],
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
                  amount: {
                    type: 'decimal',
                    example: 20.00
                  },
                  paymentDate: {
                    type: 'datetime',
                    example: '2020-01-01T00:00:00.000Z',
                  },
                  feeId: {
                    type: 'CUID',
                    example: '1234567890abcdef',
                  },
                  condominiumId: {
                    type: 'CUID',
                    example: '1234567890abcdef',
                  },
                  userId: {
                    type: 'CUID',
                    example: '1234567890abcdef',
                  },
                  apartmentId: {
                    type: 'CUID',
                    example: '1234567890abcdef',
                  }
                },
                required: ['amount', 'paymentDate', 'feeId', 'condominiumId', 'userId', 'apartmentId'],
              },
        },
      },
    },
  };
  