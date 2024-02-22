import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

export interface ConfirmationDialogProps {
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
  onConfirm: () => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, onConfirm, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Are you sure you want to delete this row?</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          This row will be deleted permanently when you press save changes.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="warning" onClick={handleOk}>
          Confirm Delete Row on Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
