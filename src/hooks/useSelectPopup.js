import { useState } from 'react';

export default function useSelectPopup(setToken) {
  const [open, setOpen] = useState(false);

  function handleSelect(e, t) {
    setToken(t);
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return {
    handleClose,
    handleOpen,
    handleSelect,
    open,
  };
}
