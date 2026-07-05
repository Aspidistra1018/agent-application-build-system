import type { FC, PropsWithChildren } from 'react';

// This issue does not need to support multiple layout analysis
export const DSLColumnLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center justify-between w-full mb-3 gap-2">
    {children}
  </div>
);
