import { useEffect, useState, useCallback } from "react";
import { type Resume, emptyResume, sampleResume } from "./resume-types";

const KEY = "resumely.resumes.v1";

function read(): Resume[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function write(items: Resume[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export function useResumes() {
  const [items, setItems] = useState<Resume[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let data = read();
    if (data.length === 0) {
      data = [sampleResume()];
      write(data);
    }
    setItems(data);
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Resume[]) => {
    setItems(next);
    write(next);
  }, []);

  const create = useCallback(() => {
    const r = emptyResume();
    r.title = "New Resume";
    const next = [r, ...read()];
    persist(next);
    return r;
  }, [persist]);

  const remove = useCallback(
    (id: string) => {
      persist(read().filter((r) => r.id !== id));
    },
    [persist],
  );

  const update = useCallback(
    (id: string, patch: Partial<Resume> | ((r: Resume) => Resume)) => {
      const current = read();
      const next = current.map((r) => {
        if (r.id !== id) return r;
        const merged = typeof patch === "function" ? patch(r) : { ...r, ...patch };
        return { ...merged, updatedAt: Date.now() };
      });
      persist(next);
    },
    [persist],
  );

  const get = useCallback((id: string) => read().find((r) => r.id === id), []);

  return { items, hydrated, create, remove, update, get };
}
