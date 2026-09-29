"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, Size, ColorOption } from "@/data/products";

export interface CartItem {
  product: Product;
  size: Size;
  color: ColorOption;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      product: Product;
      size: Size;
      color: ColorOption;
      quantity: number;
    }
  | { type: "REMOVE_ITEM"; slug: string; size: Size; colorName: string }
  | {
      type: "UPDATE_QUANTITY";
      slug: string;
      size: Size;
      colorName: string;
      quantity: number;
    }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "OPEN_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartKey(slug: string, size: Size, colorName: string) {
  return `${slug}-${size}-${colorName}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = cartKey(
        action.product.slug,
        action.size,
        action.color.name
      );
      const existing = state.items.find(
        (i) =>
          cartKey(i.product.slug, i.size, i.color.name) === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            cartKey(i.product.slug, i.size, i.color.name) === key
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          {
            product: action.product,
            size: action.size,
            color: action.color,
            quantity: action.quantity,
          },
        ],
      };
    }
    case "REMOVE_ITEM": {
      const key = cartKey(action.slug, action.size, action.colorName);
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            cartKey(i.product.slug, i.size, i.color.name) !== key
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      const key = cartKey(action.slug, action.size, action.colorName);
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              cartKey(i.product.slug, i.size, i.color.name) !== key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          cartKey(i.product.slug, i.size, i.color.name) === key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rudrani-cart");
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        dispatch({ type: "HYDRATE", items: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rudrani-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
