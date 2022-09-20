import React, { useEffect, useMemo, useState } from 'react';

const MyHooks = ({ title, id }: { title: string; id?: string }) => {
  const items = 10;
  const multiplier = 5;

  const result = useMemo(() => {
    return calculate(items, multiplier);
  }, [items, multiplier]);

  // const result = calculate(items, multiplier);

  // console.log(result)

  return (
    <div style={{ width: window.innerWidth }}>
      {title} {id} {result}
    </div>
  );
};

export default MyHooks;

function calculate(items: number, multiplier: number) {
  console.log('calc');
  return new Array(items).fill(1).reduce((total, item) => total * multiplier);
}

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted];
}
