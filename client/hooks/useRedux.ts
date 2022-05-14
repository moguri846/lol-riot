import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootReducerType, AppDispatch } from "../toolkit/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

export { useAppDispatch, useAppSelector };
