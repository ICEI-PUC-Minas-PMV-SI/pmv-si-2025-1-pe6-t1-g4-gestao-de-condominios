import React from 'react';
import Request from '@/utilities/Request';
import FormEdit from '@/components/form/Edit';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { UserEditFormData, UserFields } from './user/Fields';

export default function SignUp() {
  const navigation = useNavigation();

  const onSubmit = async (data: UserEditFormData) => {
    const { confirmPassword, ...userData } = data;
    if (data.password === confirmPassword) {
      try {
        await Request.post('/users', {
          ...userData,
          apartmentId: data.apartment.id,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Home' }, { name: 'SignIn' }],
          }),
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return <FormEdit fields={UserFields.getEditFields()} onSubmit={onSubmit} />;
}
