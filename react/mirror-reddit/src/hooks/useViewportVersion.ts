import { useEffect, useState } from 'react';

export enum EViewportVersion {
  desktop = 1024,
  table = 660,
  tableMini = 420,
  mobile = 320,
  unknown = 'unknown',
}

export function useViewportVersion() {
  const [viewportSize, setViewportSize] = useState<EViewportVersion>(EViewportVersion.unknown);

  function setViewportVersion() {
    if (document.body.offsetWidth >= EViewportVersion.desktop) {
      setViewportSize(EViewportVersion.desktop);
    } else if (document.body.offsetWidth >= EViewportVersion.table && document.body.offsetWidth < EViewportVersion.desktop) {
      setViewportSize(EViewportVersion.table);
    } else if (document.body.offsetWidth >= EViewportVersion.tableMini && document.body.offsetWidth < EViewportVersion.table) {
      setViewportSize(EViewportVersion.tableMini);
    } else if (document.body.offsetWidth >= EViewportVersion.mobile && document.body.offsetWidth < EViewportVersion.tableMini) {
      setViewportSize(EViewportVersion.mobile);
    }
  }

  useEffect(() => {
    setViewportVersion();
    window.addEventListener('resize', setViewportVersion);

    return () => {
      window.removeEventListener('resize', setViewportVersion);
    };
  }, []);

  return [viewportSize];
}
