const clientCssVars = {
  '--coze-z-index-iframe': 1000,
};

export const getCssVars = ({ zIndex }: { zIndex?: number }) => ({
  ...clientCssVars,
  ...(typeof zIndex === 'number'
    ? {
        '--coze-z-index-iframe': zIndex,
      }
    : {}),
});
