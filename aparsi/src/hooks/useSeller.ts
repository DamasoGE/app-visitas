import { useContext } from "react";
import { SellerContext, SellerContextType } from "../context/SellerContext";

export const useSeller = (): SellerContextType => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller debe ser usado dentro de un SellerProvider');
  }
  return context;
};
