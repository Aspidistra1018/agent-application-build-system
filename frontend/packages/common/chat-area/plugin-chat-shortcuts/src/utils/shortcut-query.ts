// Stitching queries based on template_query and components
export const getQueryFromTemplate = (
  templateQuery: string,
  values: Record<string, unknown>,
) => {
  let query = templateQuery;
  // Replace the {{key}} in the template with the value corresponding to the key in values
  Object.keys(values).forEach(key => {
    query = query.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
      values[key] as string,
    );
  });

  return query;
};
