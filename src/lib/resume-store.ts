import { useCallback, useEffect, useState } from "react";
import type { Resume } from "./resume-types";

import {
  fetchResumes,
  createResume,
  updateResume,
  deleteResume,
} from "./api";

export function useResumes() {
  const [items, setItems] = useState<Resume[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // =====================
  // Load resumes
  // =====================
  const load = useCallback(async () => {
    try {
      const resumes = await fetchResumes();

      setItems(resumes);
    } catch (err) {
      console.error(err);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // =====================
  // Create
  // =====================
  const create = useCallback(
    async (resume: Resume) => {
      const created = await createResume(resume);

      setItems((prev) => [created, ...prev]);

      return created;
    },
    []
  );

  // =====================
  // Update
  // =====================
  const update = useCallback(
    async (resume: Resume) => {
      const updated = await updateResume(resume);

      setItems((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );

      return updated;
    },
    []
  );

  // =====================
  // Delete
  // =====================
  const remove = useCallback(async (id: string) => {
    await deleteResume(id);

    setItems((prev) =>
      prev.filter((r) => r.id !== id)
    );
  }, []);

  // =====================
  // Get
  // =====================
  const get = useCallback(
    (id: string) =>
      items.find((r) => r.id === id),
    [items]
  );

  return {
    items,
    hydrated,
    create,
    update,
    remove,
    get,
    reload: load,
  };
}