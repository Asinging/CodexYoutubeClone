import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, canLoad: boolean): ((node?: Element | null) => void) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView && canLoad) {
      onLoadMore();
    }
  }, [inView, canLoad, onLoadMore]);

  return ref;
};
