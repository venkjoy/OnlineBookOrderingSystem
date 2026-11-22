import { createContext, useCallback, useContext, useState } from "react";
import { CheckIcon } from "./Icons";

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const toast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setItems((p) => [...p, { id, message }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-4 z-[100] flex flex-col gap-2 sm:right-6">
        {items.map((t) => (
          <div key={t.id} className="animate-toast pointer-events-auto flex items-center gap-3 rounded-xl bg-stone-900 px-4 py-3 text-sm text-white shadow-2xl">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-green-500">
              <CheckIcon className="h-4 w-4" strokeWidth={3} />
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}