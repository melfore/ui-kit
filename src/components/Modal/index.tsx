import React, { FC } from "react";
import {
  Dialog as MUIDialog,
  DialogActions as MUIDialogActions,
  DialogContent as MUIDialogContent,
  DialogTitle as MUIDialogTitle,
} from "@material-ui/core";

import { Icons, IconSize } from "../../types/Icon";
import { IModal, ModalSize } from "../../types/Modal";
import { TypographyVariants } from "../../types/Typography";
import { getComposedDataCy, suppressEvent } from "../../utils";
import localized, { ILocalizableProperty } from "../../utils/hocs/localized";
import Button from "../Button";
import IconButton from "../IconButton";
import Typography from "../Typography";

const onCloseWrapper = (event?: any, onClose?: Function) => {
  if (event) {
    suppressEvent(event);
  }
  onClose && onClose();
};

export const DATA_CY_DEFAULT = "modal";
export const DATA_CY_SHORTCUT = "title";
export const LOCALIZABLE_PROPS: ILocalizableProperty[] = [
  { name: "title", type: "string" },
  { name: "cancel.label", type: "any" },
  { name: "confirm.label", type: "any" },
];

export const SUBPARTS_MAP = {
  title: {
    label: "Title",
  },
  content: {
    label: "Content",
  },
  actionCancel: {
    label: "Action Cancel",
  },
  actionConfirm: {
    label: "Action Confirm",
  },
};

// TODO#lb: should handle style?
const Modal: FC<IModal> = ({
  cancel = undefined,
  children,
  closable = false,
  confirm = undefined,
  dataCy = DATA_CY_DEFAULT,
  onClose = undefined,
  open = false,
  size = ModalSize.default,
  title = "",
}) => {
  const hasActions = cancel || confirm;
  return (
    <MUIDialog
      aria-labelledby="modal-title"
      data-cy={dataCy}
      fullWidth
      maxWidth={size}
      onClose={(event) => onCloseWrapper(event, onClose)}
      open={open}
    >
      <MUIDialogTitle
        id="modal-title"
        disableTypography
        style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}
      >
        <Typography dataCy={getComposedDataCy(dataCy, SUBPARTS_MAP.title)} variant={TypographyVariants.title}>
          {title}
        </Typography>
        {closable && (
          <IconButton icon={Icons.close} size={IconSize.small} onClick={() => onCloseWrapper(undefined, onClose)} />
        )}
      </MUIDialogTitle>
      <MUIDialogContent data-cy={getComposedDataCy(dataCy, SUBPARTS_MAP.content)} dividers>
        {children}
      </MUIDialogContent>
      {hasActions && (
        <MUIDialogActions>
          {cancel && (
            <Button
              dataCy={getComposedDataCy(dataCy, SUBPARTS_MAP.actionCancel)}
              disabled={cancel.disabled}
              label={cancel.label}
              onClick={cancel.action}
              style={cancel.style}
              variant={cancel.variant}
            />
          )}
          {confirm && (
            <Button
              dataCy={getComposedDataCy(dataCy, SUBPARTS_MAP.actionConfirm)}
              disabled={confirm.disabled}
              label={confirm.label}
              onClick={confirm.action}
              style={confirm.style}
              variant={confirm.variant}
            />
          )}
        </MUIDialogActions>
      )}
    </MUIDialog>
  );
};

export const ModalWithProps = Modal;

export default localized(Modal, {
  dataCyShortcut: DATA_CY_SHORTCUT,
  localizableProps: LOCALIZABLE_PROPS,
});
