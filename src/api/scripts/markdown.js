import fs from 'fs';

const swaggerFile = './swagger-output.json';
const outputMarkdown = './README.md';

// Função para resolver referências de custom-schemas
function resolveCustomSchema(ref, swaggerData) {
  const prefix = "#/components/custom-schemas/";
  if (ref.startsWith(prefix)) {
    const schemaKey = ref.substring(prefix.length);
    if (
      swaggerData.components &&
      swaggerData.components['custom-schemas'] &&
      swaggerData.components['custom-schemas'][schemaKey]
    ) {
      return swaggerData.components['custom-schemas'][schemaKey];
    }
  }
  return null;
}

// Função para gerar um payload exemplo a partir do schema
function generatePayloadExample(schema) {
  if (schema.type === 'object' && schema.properties) {
    const payload = {};
    for (const [prop, propSchema] of Object.entries(schema.properties)) {
      payload[prop] = propSchema.example !== undefined ? propSchema.example : "";
    }
    return payload;
  }
  return null;
}

function generateMarkdown(swaggerData) {
  let markdown = `# ${swaggerData.info.title}\n\n`;
  markdown += `> ${swaggerData.info.description}\n\n`;

  // Base URL (usando o primeiro server)
  if (swaggerData.servers && swaggerData.servers.length > 0) {
    markdown += `## Base URL\n\n\`\`\`\n${swaggerData.servers[0].url}\n\`\`\`\n\n`;
  }

  // Agrupar endpoints pela primeira tag
  const groupedEndpoints = {};
  for (const [path, methods] of Object.entries(swaggerData.paths)) {
    for (const [method, details] of Object.entries(methods)) {
      const tag = details.tags && details.tags.length > 0 ? details.tags[0] : "Other";
      if (!groupedEndpoints[tag]) {
        groupedEndpoints[tag] = [];
      }
      groupedEndpoints[tag].push({ path, method, details });
    }
  }

  // Itera sobre os grupos de endpoints
  for (const tag of Object.keys(groupedEndpoints)) {
    markdown += `## ${tag}\n\n`;
    groupedEndpoints[tag].forEach(({ path, method, details }) => {
      const summaryText = details.summary ? ` (${details.summary})` : '';
      markdown += `<details>\n  <summary>\n    <code>${method.toUpperCase()}</code> <code><b>${path}</b></code>${summaryText}\n  </summary>\n\n`;

      // Descrição
      if (details.description) {
        markdown += `**Description:** ${details.description}\n\n`;
      }

      // Parâmetros
      if (details.parameters && details.parameters.length > 0) {
        markdown += `##### Parameters\n\n`;
        markdown += `| Name | In | Type | Description |\n`;
        markdown += `| ---- | -- | ---- | ----------- |\n`;
        details.parameters.forEach(param => {
          const type = param.schema ? param.schema.type : '';
          markdown += `| \`${param.name}\` | ${param.in} | ${type} | ${param.description || ''} |\n`;
        });
        markdown += `\n`;
      }

      // Request Body
      if (details.requestBody) {
        markdown += `##### Request Body\n\n`;
        if (details.requestBody["$ref"]) {
          const resolvedSchema = resolveCustomSchema(details.requestBody["$ref"], swaggerData);
          if (resolvedSchema && resolvedSchema.content) {
            for (const [contentType, contentData] of Object.entries(resolvedSchema.content)) {
              markdown += `**Content-Type:** \`${contentType}\`\n\n`;
              if (contentData.schema) {
                const payloadExample = generatePayloadExample(contentData.schema);
                if (payloadExample) {
                  markdown += `#### Payload\n\n`;
                  markdown += '```json\n';
                  markdown += JSON.stringify(payloadExample, null, 2);
                  markdown += '\n```\n\n';
                } else {
                  markdown += '```json\n';
                  markdown += JSON.stringify(contentData.schema, null, 2);
                  markdown += '\n```\n\n';
                }
              }
            }
          }
        } else if (details.requestBody.content) {
          for (const [contentType, contentData] of Object.entries(details.requestBody.content)) {
            markdown += `**Content-Type:** \`${contentType}\`\n\n`;
            if (contentData.schema) {
              const payloadExample = generatePayloadExample(contentData.schema);
              if (payloadExample) {
                markdown += `#### Payload\n\n`;
                markdown += '```json\n';
                markdown += JSON.stringify(payloadExample, null, 2);
                markdown += '\n```\n\n';
              } else {
                markdown += '```json\n';
                markdown += JSON.stringify(contentData.schema, null, 2);
                markdown += '\n```\n\n';
              }
            }
          }
        }
      }

      // Respostas
      if (details.responses) {
        markdown += `##### Response Status Code\n\n`;
        markdown += `| HTTP Code | Description |\n`;
        markdown += `| --------- | ----------- |\n`;
        for (const [code, response] of Object.entries(details.responses)) {
          markdown += `| \`${code}\` | ${response.description || ''} |\n`;
        }
        markdown += `\n`;
      }

      markdown += `</details>\n\n`;
    });
  }

  return markdown;
}

fs.readFile(swaggerFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo Swagger:', err);
    return;
  }

  const swaggerData = JSON.parse(data);
  const markdown = generateMarkdown(swaggerData);

  fs.writeFile(outputMarkdown, markdown, err => {
    if (err) {
      console.error('Erro ao escrever o README.md:', err);
    } else {
      console.log('README.md gerado com sucesso!');
    }
  });
});
