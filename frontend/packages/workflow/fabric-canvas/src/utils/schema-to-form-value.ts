import {
  Mode,
  type FabricObjectSchema,
  type FabricSchema,
  type FormMeta,
} from '../typings';

/**
 * Fabric schema to formValue
 */
export const schemaToFormValue = ({
  schema,
  activeObjectId,
  formMeta,
}: {
  schema: FabricSchema;
  activeObjectId: string;
  formMeta: FormMeta;
}): Partial<FabricObjectSchema> => {
  let s = schema.objects.find(o => o.customId === activeObjectId);

  // The picture is a Group composite element, and the required elements should be taken out.
  if (s?.customType === Mode.IMAGE) {
    s = {
      ...s,
      ...s.objects?.[0],
      // Stroke color and thickness are taken from borderRect
      stroke: s.objects?.[1].stroke,
      strokeWidth: s.objects?.[1].strokeWidth,
    } as unknown as FabricObjectSchema;
  }
  const defaultFormValue: Partial<FabricObjectSchema> = {};
  formMeta?.content.forEach(item => {
    if (item.name) {
      defaultFormValue[item.name] =
        s?.[item.name] ?? item.setterProps?.defaultValue;
    }

    if ((item.tooltip?.content.length ?? 0) > 0) {
      item.tooltip?.content.forEach(d => {
        if (d.name) {
          defaultFormValue[d.name] = s?.[d.name] ?? d.setterProps?.defaultValue;
        }
      });
    }
  });
  return defaultFormValue;
};
