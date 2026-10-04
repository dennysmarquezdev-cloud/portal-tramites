import React from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";

interface ConfirmDialogProps {
  title: string;
  message: string;
  warning?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  title,
  message,
  warning,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onClose
}: ConfirmDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(_, d) => { if (!d.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <p style={{ margin: "0 0 8px" }}>{message}</p>
            {warning && (
              <p style={{ margin: 0, color: "var(--colorPaletteRedForeground1)", fontSize: "12px", fontWeight: "600" }}>
                {warning}
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>{cancelText}</Button>
            <Button appearance="primary" style={{ backgroundColor: "var(--colorPaletteRedBackground3)", color: "white" }} onClick={onConfirm}>
              {confirmText}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
