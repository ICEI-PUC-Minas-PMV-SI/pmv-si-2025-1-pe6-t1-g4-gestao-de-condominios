import { useContext } from 'react';
import { ModalContext } from '../Modal';

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Illegal modal context use');
  }
  return context;
}
