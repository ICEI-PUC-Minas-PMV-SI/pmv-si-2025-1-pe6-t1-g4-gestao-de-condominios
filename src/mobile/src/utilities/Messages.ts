const Messages = {
  SUCCESS_SERVER_CONNECTION: 'Conexão realizada com sucesso ao servidor',
  FAIL_SERVER_CONNECTION: 'Não foi possível conectar ao servidor informado',
  EMPTY_USER_PASSWORD: 'Usuário e/ou senha não informados',
  AUTH_FAIL: 'Não foi possível autenticar usuário. Verifique o e-mail / senha e tente novamente.',
  UNEXPECTED_ERROR: 'Não foi possível concluir a operação. Tente novamente',
  REQUIRED_FIELD: 'Preencha os campos obrigatórios (*)',
  INVALID_FIELDS: 'Há campos inválidos',
  UNKNOWN_ERROR: 'Não foi possível concluir operação. Tente novamente',
  EMPTY_EMAIL_FIELD: 'Preencha o endereço de e-mail',
  EMAIL_ALREADY_EXISTS: 'Não foi possível concluir a operação. E-mail já cadastrado.',
};
export type MessageKey = keyof typeof Messages;
export default Messages;
