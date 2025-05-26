import { ReactNode, useState, useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import ConfirmModal from '@/components/modal/Confirm';
import { ModalContext, AllModalProps } from '@/context/Modal';
import MessageModal from '@/components/modal/Message';
import TypeCheck from '@/utilities/TypeCheck';

type ComponentProps = {
  children: ReactNode;
};

type ModalState = Record<string, any>;

type AdditionalProps = {
  closeModal: () => void;
};

const getModalComponent = (modalProps: AllModalProps, additionalProps: AdditionalProps): ReactNode => {
  if (TypeCheck.isDefaultModalProps(modalProps)) {
    return modalProps.children || <></>;
  }
  if (TypeCheck.isMessageModalProps(modalProps)) {
    return <MessageModal {...modalProps} extra={additionalProps} />;
  }
  if (TypeCheck.isQuestionModalProps(modalProps)) {
    return <ConfirmModal {...modalProps} extra={additionalProps} />;
  }
  return <></>;
};

type ModalMapType = Record<
  string,
  {
    isVisible: boolean;
    children: ReactNode;
    id: string;
    onShow?: () => void;
    onSubmit?: () => void;
  } & any
>;

const ModalProvider = ({ children }: ComponentProps) => {
  const [modal, setModal] = useState<ModalMapType>({});

  const modalStateRef = useRef<ModalState>({});

  const closeModal = (id: string) => {
    setModal((oldValue) => {
      return {
        ...oldValue,
        [id]: {
          ...(modal[id] || {}),
          isVisible: false,
          children: <></>,
        },
      };
    });
  };

  const openModal = (props: AllModalProps) => {
    if (!modal[props.id] || !modal[props.id].isVisible) {
      // setIsVisible(true);
      setModal((oldValue) => {
        return {
          ...oldValue,
          [props.id]: {
            ...(modal[props.id] || {}),
            ...props,
            isVisible: true,
            children: getModalComponent(props, { closeModal: () => closeModal(props.id) }),
          },
        };
      });
    }
  };

  const updateModalState = (updates: Partial<ModalState>) => {
    modalStateRef.current = {
      ...modalStateRef.current,
      ...updates,
    };
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        updateModalState,
        modalStateRef,
      }}
    >
      {children}
      <View>
        {modal &&
          Object.values(modal).map((curModal) => {
            return (
              <Modal
                key={curModal.id}
                transparent
                visible={curModal.isVisible}
                animationType="fade"
                onShow={() => {
                  if (curModal.onShow) {
                    curModal.onShow();
                  }
                }}
                onRequestClose={() => {
                  if (curModal.onSubmit) {
                    curModal.onSubmit(false);
                  }
                }}
              >
                <View style={styles.overlay} className="justify-center items-center">
                  {curModal.children}
                </View>
              </Modal>
            );
          })}
      </View>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export { ModalProvider };
