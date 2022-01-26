import { useDispatch } from "react-redux";

import { AppDispatch } from "../lib/redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
