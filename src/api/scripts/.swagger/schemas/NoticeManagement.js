export const NoticeManagementDefinition = {
    create: {
      type: "object",
      properties: {
        title: {
          type: "string",
          example: "Manutenção do elevador"
        },
        description: {
          type: "string",
          example: "Manutenção programada para o elevador social"
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2025-05-01T00:00:00.000Z"
        },
        condominiumId: {
          type: "string",
          example: "cm94wz8280000kya04xds8wir"
        }
      },
      required: ["title", "description", "date", "condominiumId"]
    },
    
    response: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "cm964ntsw0001ky7ggumvu08c"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        date: {
          type: "string",
          format: "date-time"
        },
        condominiumId: {
          type: "string"
        },
        createdAt: {
          type: "string",
          format: "date-time"
        },
        updatedAt: {
          type: "string",
          format: "date-time"
        }
      }
    }
  };