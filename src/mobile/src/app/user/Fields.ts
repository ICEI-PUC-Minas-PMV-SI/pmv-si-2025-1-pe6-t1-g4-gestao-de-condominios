import { FormFieldEdit } from '@/components/form/Edit';
import { Profile } from '@/constants/Profile';
import { Apartment } from '@/types/Data';
import { User } from '@/types/User';
import { DateUtil } from '@/utilities/Date';
import Text from '@/utilities/Text';
import ValidationPattern from '@/utilities/ValidationPattern';

export type UserEditFormData = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date | string;
  phone: string;
  profile: string;
  apartmentId: string;
  apartment: Apartment;
};

class UserFields {
  getViewFields(user: User) {
    return [
      { name: 'id', label: 'Id', value: user.id },
      { name: 'name', label: 'Nome', value: user.name },
      { name: 'email', label: 'E-mail', value: user.email },
      { name: 'birthDate', label: 'Data de nascimento', value: DateUtil.formatISO(user.birthDate) || '-' },
      { name: 'phone', label: 'Celular', value: user.phone ? Text.formatPhone(user.phone) : '-' },
      { name: 'profile', label: 'Perfil', value: Profile[user.profile] },
      { name: 'apartmentId', label: 'Apartamento', value: user?.apartment?.id },
    ];
  }
  getEditFields(isEditing = false) {
    const fields: FormFieldEdit<UserEditFormData, Apartment>[] = [
      {
        name: 'id',
        type: 'text',
        label: 'Id',
        editable: false,
      },
      {
        name: 'name',
        type: 'text',
        label: 'Nome',
        rules: { required: true },
        placeholder: 'Digite seu nome',
        textContentType: 'name',
      },
      {
        name: 'email',
        type: 'text',
        label: 'E-mail',
        rules: {
          required: true,
          validate(value) {
            const isValid = value && typeof value === 'string' ? ValidationPattern.email.test(value) : false;
            return isValid ? true : 'E-mail inválido. Ex.: example@example.com';
          },
        },
        placeholder: 'example@example.com',
        textContentType: 'emailAddress',
        keyboardType: 'email-address',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Senha',
        rules: isEditing ? {} : { required: true },
        placeholder: isEditing ? '(deixe em branco para manter a senha atual)' : '******',
        textContentType: 'newPassword',
        secureTextEntry: true,
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirme a senha',
        rules: isEditing
          ? {
              validate: (confirmPassword, formData) => {
                return confirmPassword !== formData.password ? 'As senhas não coincidem' : true;
              },
            }
          : {
              required: true,
              validate: (confirmPassword, formData) => {
                return confirmPassword !== formData.password ? 'As senhas não coincidem' : true;
              },
            },
        placeholder: '******',
        textContentType: 'newPassword',
        secureTextEntry: true,
      },
      {
        name: 'birthDate',
        type: 'date',
        mode: 'date',
        label: 'Data de nascimento',
        maximumDate: (() => {
          const curDate = new Date();
          curDate.setFullYear(curDate.getFullYear() - 18);
          return curDate;
        })(),
      },
      {
        name: 'phone',
        label: 'Celular',
        type: 'phone',
        keyboardType: 'phone-pad',
        textContentType: 'telephoneNumber',
        placeholder: '(99) 99999-9999',
        valueFormat: Text.formatPhone.bind(Text),
        onlyDigits: true,
      },
      {
        name: 'profile',
        type: 'select',
        label: 'Perfil',
        rules: { required: true },
        selectOptions: [
          { id: 'ADMIN', name: 'Administrador' },
          { id: 'MANAGER', name: 'Síndico' },
          { id: 'RESIDENT', name: 'Morador' },
        ],
        selectLabelKey: 'name',
        selectValueKey: 'id',
        placeholder: 'Selecione um perfil',
      },
      {
        name: 'apartment',
        type: 'select-wrapper',
        label: 'Apartamento',
        rules: { required: true },
        dataSource: {
          resource: 'apartments',
          uniqueKey: 'id',
        },
        defaultValueKey: 'apartmentId',
        placeholder: 'Selecione um apartamento',
        getItemText(item: Apartment) {
          return `Apto ${item.number} | Andar: ${item.floor} | Bloco: ${item.block}`;
        },
        keyExtractor: (item: Apartment) => item.id,
      },
    ];
    return fields;
  }
}
const instance = new UserFields();
export { instance as UserFields };
