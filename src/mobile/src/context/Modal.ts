import React, { Ref } from 'react';

export type QuestionModalProps = {
  type: 'question';
  rightBtnLabel?: string;
  leftBtnLabel?: string;
  children?: React.ReactNode;
};

export type MessageModalProps = {
  type: 'message';
  messageType: 'error' | 'info' | 'warn';
};

export type DefaultModalProps = {
  type: 'default';
  children?: React.ReactNode;
};

export type ModalProps<T> = {
  id: string;
  title?: string;
  text?: string;
  onShow?: () => void;
  onSubmit?: (answer: boolean) => void;
  extra?: {
    closeModal: () => void;
  };
} & T;

export type AllModalProps = ModalProps<QuestionModalProps | MessageModalProps | DefaultModalProps>;

export type ModalContextProps = {
  openModal: (props: AllModalProps, state?: Record<string, any>) => void;
  closeModal: (id: string) => void;
  updateModalState: (state: Record<string, any>) => void;
  modalStateRef: Ref<Record<string, any>>;
};

export const ModalContext = React.createContext<ModalContextProps>({
  openModal() {},
  closeModal() {},
  updateModalState() {},
  modalStateRef: null,
});
