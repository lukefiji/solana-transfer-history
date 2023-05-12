import { Transfer } from '@/schemas/transfer';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

export function Autocomplete(
  props: Omit<
    AutocompleteOptions<Transfer>,
    'container' | 'renderer' | 'render'
  >
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete<Transfer>({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },

      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
