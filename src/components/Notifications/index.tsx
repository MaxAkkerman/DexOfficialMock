import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { SWAP_FAILED, SWAP_HAPPENING, SWAP_SUCCEEDED } from "../../store/types";

export default function Notifications() {
  const { enqueueSnackbar } = useSnackbar();
  const tips = useAppSelector((state) => state.tips);

  useEffect(() => {
    if (tips.length === 0) return;

    switch (tips[tips.length - 1]) {
      case SWAP_HAPPENING:
        enqueueSnackbar({
          type: "info",
          message: "Swap process in progress",
        });
        break;
      case SWAP_SUCCEEDED:
        enqueueSnackbar({
          type: "success",
          message: "Swap successfully finished",
        });
        break;
      case SWAP_FAILED:
        enqueueSnackbar({
          type: "error",
          message: "Swap, unfortunately, failed",
        });
        break;
      default:
        console.log("Unhandled notification - ", tips[tips.length - 1]);
    }
  }, [tips, enqueueSnackbar]);

  return null;
}
