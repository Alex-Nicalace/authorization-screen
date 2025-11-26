import { useCallback, useRef } from "react";
/**
 * Hook, который возвращает ссылку на Map, хранящий ссылки на DOM-элементы,
 * по которым можно обратиться по ключу.
 * @returns
 * Возвращает массив из двух элементов:
 * 1. ссылка на Map, хранящий ссылки на DOM-элементы,
 *    по которым можно обратиться по ключу.
 *    Ключ - это `React.Key`, по которому можно найти элемент.
 *    `current.map.get(key)` - получить ссылку на DOM-элемент.
 * 2. функция `setRef(key)` предназначена для использования в качестве *ref callback*.
 *    Возвращает функцию `(node) => {}`
 *    `key` - `React.Key`, по которому можно найти элемент.
 * @example
 * const [InputsRef, setInputsRef] = useRefs<HTMLInputElement>();
 *
 * return (
 *  <div>
 *   {Array.from({ length }).map((_, index) => (
 *     <input ref={setInputsRef(index)}/>
 *   ))}
 *  </div>
 * )
 */
export function useRefs<T extends HTMLElement>() {
  const itemsRef = useRef<Map<React.Key, T> | null>(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const setRef = useCallback(
    (key: React.Key) => (node: T | null) => {
      const map = getMap();
      if (node) {
        map.set(key, node);
      } else {
        // Для совместимости с React < 19
        // удалить ссылку на DOM-элемент
        map.delete(key);
      }

      // Функция очистки (cleanup function) — добавлена в React 19
      return () => {
        map.delete(key);
      };
    },
    [],
  );

  return [itemsRef, setRef] as const;
}
