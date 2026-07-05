import { VariableMergeItem } from './variable-merge-item';
import { useVariableMergeVariableTags } from './use-variable-merge-variable-tags';

/**
 * Merge variable node content
 */
export function VariableMergeContent() {
  const mergeGroups = useVariableMergeVariableTags();

  return (
    <>
      {mergeGroups.map((mergeGroup, index) => (
        <VariableMergeItem
          mergeGroup={mergeGroup}
          key={mergeGroup.name}
          index={index}
        />
      ))}
    </>
  );
}
