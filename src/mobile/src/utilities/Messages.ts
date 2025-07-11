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
  SUCCESS_CREATED_USER: 'Usuário criado com sucesso',
  SUCCESS_CREATED_APARTMENT: 'Apartamento criado com sucesso',
  DIFFERENT_PASSWORDS: "Os campos de 'Senha' e 'Confirmar senha' não coincidem",
  SUCCESS_EDITED_USER: 'Usuário alterado com sucesso',
  SUCCESS_EDITED_APARTMENT: 'Apartamento alterado com sucesso',
  SUCCESS_REMOVE_RECORD: 'Registro removido com sucesso.',
  INVALID_OTP_OR_EXPIRED: 'Código inválido ou expirado'
};
export type MessageKey = keyof typeof Messages;
export default Messages;
