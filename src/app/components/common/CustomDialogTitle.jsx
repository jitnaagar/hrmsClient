import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton } from '@mui/material';

function CustomDialogTitle({ onClose, children }) {
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        textAlign: 'center',
        borderBottom: '1px solid #eaeaea',
        fontSize: '20px',
      }}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default CustomDialogTitle;
