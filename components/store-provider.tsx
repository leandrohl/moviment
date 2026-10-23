'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { products, type CartItem } from '@/lib/catalog'
type Store = {
  items: CartItem[]
  favorites: string[]
  toggleFavorite: (id: string) => void
  add: (item: CartItem) => void
  change: (index: number, quantity: number) => void
  open: boolean
  setOpen: (v: boolean) => void
  ready: boolean
}
const Context = createContext<Store | null>(null)
export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('moviment-cart') || '[]')
      if (Array.isArray(saved))
        setItems(
          saved.filter(
            (i: CartItem) =>
              products.some(
                (p) =>
                  p.id === i.productId &&
                  p.variants.some((v) => v.color === i.color && v.sizes.includes(i.size)),
              ) &&
              Number.isInteger(i.quantity) &&
              i.quantity > 0 &&
              i.quantity <= 10,
          ),
        )
    } catch {}
    setReady(true)
  }, [])
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem('moviment-cart', JSON.stringify(items))
      } catch {}
  }, [items, ready])
  const add = (item: CartItem) => {
    setItems((prev) => {
      const index = prev.findIndex(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size,
      )
      return index < 0
        ? [...prev, item]
        : prev.map((i, n) =>
            n === index ? { ...i, quantity: Math.min(10, i.quantity + item.quantity) } : i,
          )
    })
    setOpen(true)
  }
  return (
    <Context.Provider
      value={{
        items,
        favorites,
        toggleFavorite: (id) =>
          setFavorites((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
          ),
        add,
        change: (index, quantity) =>
          setItems((prev) =>
            prev
              .map((item, i) =>
                i === index ? { ...item, quantity: Math.min(10, quantity) } : item,
              )
              .filter((i) => i.quantity > 0),
          ),
        open,
        setOpen,
        ready,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export function useStore() {
  const value = useContext(Context)
  if (!value) throw new Error('StoreProvider ausente')
  return value
}
