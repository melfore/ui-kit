import React, { FC, ReactElement, useState } from "react";

import Button from "../../components/Button";
import { ButtonVariants } from "../../types/Button";
import { Icons } from "../../types/Icon";

interface ModalMockType {
  buttonLabel?: string;
  initialOpen?: null | number | string | boolean;
  onClose?: Function;
}

const ModalMock: FC<ModalMockType> = ({ buttonLabel = "Open Modal", children, initialOpen, onClose }) => {
  const [open, setOpen] = useState(initialOpen);
  const onCloseCallback = () => {
    onClose && onClose();
    setOpen(false);
  };
  const wrappedModal = React.cloneElement(children as ReactElement<any>, { onClose: onCloseCallback, open });
  return (
    <div>
      <Button
        icon={{ name: Icons.open_new }}
        label={buttonLabel}
        onClick={() => setOpen(!open)}
        variant={ButtonVariants.outlined}
      />
      {wrappedModal}
    </div>
  );
};

export default ModalMock;
