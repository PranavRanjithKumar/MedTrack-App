import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

export default function useFilteredData(queryKey, fetchFn, searchKey) {
  const [inputValue, setInputValue] = useState('');

  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const { isLoading, data, refetch, error } = useQuery(queryKey, fetchFn, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [debouncedInputValue, refetch]);

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data.filter((item) =>
      item[searchKey]
        .toLowerCase()
        .startsWith(debouncedInputValue.toLowerCase())
    );
  }, [data, debouncedInputValue, searchKey]);

  function onChangeText(newValue) {
    setInputValue(newValue);
  }

  return { isLoading, error, filteredData, onChangeText };
}
