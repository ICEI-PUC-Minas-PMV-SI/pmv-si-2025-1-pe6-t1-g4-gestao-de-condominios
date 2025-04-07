import { generateAccessToken } from './getToken';

interface MessagePayload {
  token: string;
  body: string;
}

const { 
    FIREBASE_PROJECT_ID,
  } = process.env;

export async function sendMessage(payload: MessagePayload) {
  const { token, body } = payload;

  const accessToken = await generateAccessToken();

  const url = `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`;

  const message = {
    message: {
      token,
      notification:{
        title: "Nova Mensagem",
        body: body,
      },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(message),
    redirect: 'follow'
  });

  const data = await response.json();

  if (response.ok) {
    console.log(`✅ Notificação enviada com sucesso: ${token}`, data);
    return {
      status: 200,
      message: 'Notificação enviada.',
      data,
    };
  } else {
    console.error('❌ Erro ao enviar notificação:', data);
    return {
      status: 500,
      error: 'Failed to send notification',
      details: data,
    };
  }
}
