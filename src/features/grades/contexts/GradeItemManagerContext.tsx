'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { SUBJECTS } from 'data';

import type { GradeItem } from 'types';

interface GradeItemManagerContextProps {
  hasChanged: boolean;
  getAddedItems: () => GradeItem[];
  getRemovedItems: () => GradeItem[];
  getUpdatedItems: () => GradeItem[];
  addItem: (item: GradeItem) => void;
  removeItem: (item: GradeItem) => void;
  updateItem: (item: GradeItem, score: number) => void;
  patch: (original: GradeItem[]) => GradeItem[];
  clear: () => void;
}

const GradeItemManagerContext =
  createContext<GradeItemManagerContextProps | null>(null);

export const GradeItemManagerProvider = ({
  children,
}: Required<React.PropsWithChildren>) => {
  const [added, setAdded] = useState<GradeItem[]>([]);
  const [removed, setRemoved] = useState<GradeItem[]>([]);
  const [updated, setUpdated] = useState<GradeItem[]>([]);

  const hasChanged =
    added.length > 0 || removed.length > 0 || updated.length > 0;

  const getAddedItems = useCallback(() => added, [added]);
  const getRemovedItems = useCallback(() => removed, [removed]);
  const getUpdatedItems = useCallback(() => updated, [updated]);

  const addItem = (item: GradeItem) => {
    setAdded(prev => [...prev, item]);
  };
  const removeItem = (item: GradeItem) => {
    setRemoved(prev => [...prev, item]);
  };
  const updateItem = (item: GradeItem, score: number) => {
    setUpdated(prev => [
      ...prev.filter(prevItem => prevItem.id !== item.id),
      { ...item, score },
    ]);
  };

  const patch = useCallback(
    (original: GradeItem[]): GradeItem[] => {
      return [
        ...original.filter(
          item =>
            removed.every(({ id }) => id !== item.id) &&
            updated.every(({ id }) => id !== item.id),
        ),
        ...added,
        ...removed,
        ...updated,
      ].toSorted((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.semester !== b.semester) return b.semester - a.semester;
        if (a.term !== b.term) return a.term < b.term ? 1 : -1;
        if (a.subject !== b.subject) {
          const keys = Object.keys(SUBJECTS);
          return keys.indexOf(a.subject) - keys.indexOf(b.subject);
        }
        return 0;
      });
    },
    [added, removed, updated],
  );
  const clear = () => {
    setAdded([]);
    setRemoved([]);
    setUpdated([]);
  };

  const value = useMemo(
    () => ({
      hasChanged,
      getAddedItems,
      getRemovedItems,
      getUpdatedItems,
      addItem,
      removeItem,
      updateItem,
      patch,
      clear,
    }),
    [hasChanged, getAddedItems, getRemovedItems, getUpdatedItems, patch],
  );

  return (
    <GradeItemManagerContext.Provider value={value}>
      {children}
    </GradeItemManagerContext.Provider>
  );
};

export const useGradeManager = () => {
  const context = useContext(GradeItemManagerContext);
  if (!context)
    throw new Error(
      'useGradeManager는 GradeItemManagerProvider 내부에서만 사용할 수 있습니다.',
    );
  return context;
};
