import { SubmissionResult } from "@conform-to/react";
import { useFetcher, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

export function useFormAccordions<T extends string | number | symbol>(
  accordionValues: T[],
  lastResult: SubmissionResult<string[]> | null,
  preventCloseAccordions?: T[]
) {
  const { formData } = useNavigation();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const currentIntent = formData?.get("intent") as T;

  const [lastResults, setLastResults] = useState(
    accordionValues.reduce((acc, accordion) => {
      acc[accordion] = { initialValue: null };
      return acc;
    }, {} as Record<T, SubmissionResult<string[]>>)
  );

  const [accordionStates, setAccordionStates] = useState(
    accordionValues.reduce((acc, accordion) => {
      acc[accordion] = false;
      return acc;
    }, {} as Record<T, boolean>)
  );

  const [cancelStates, setCancelStates] = useState(
    accordionValues.reduce((acc, accordion) => {
      acc[accordion] = false;
      return acc;
    }, {} as Record<T, boolean>)
  );

  const loadingStates: Record<T, boolean> = accordionValues.reduce(
    (acc, accordion) => {
      acc[accordion] = !isSubmitting && currentIntent === accordion;
      return acc;
    },
    {} as Record<T, boolean>
  );

  useEffect(() => {
    if (
      lastResult &&
      lastResult.initialValue &&
      lastResult.initialValue.intent
    ) {
      const key = lastResult.initialValue.intent as string;
      setLastResults((prev) => ({
        ...prev,
        [key]: lastResult,
      }));
      if (
        lastResult?.intent?.type !== "insert" &&
        lastResult?.intent?.type !== "remove" &&
        lastResult.status !== "error" &&
        !preventCloseAccordions?.includes(key as T)
      ) {
        setAccordionStates((prev) => ({
          ...prev,
          [key]: false,
        }));
        setCancelStates((prev) => ({
          ...prev,
          [key]: true,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastResult]);

  const toggleAccordion = (id: T) => {
    setCancelStates((prev) => ({
      ...prev,
      [id]: false,
    }));
    setAccordionStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleCancelState = (id: T) => {
    setCancelStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return {
    lastResults,
    accordionStates,
    cancelStates,
    loadingStates,
    toggleAccordion,
    toggleCancelState,
  };
}
