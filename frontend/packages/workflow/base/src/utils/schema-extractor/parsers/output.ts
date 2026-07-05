import { isWorkflowImageTypeURL } from '../utils';
import { type SchemaExtractorOutputsParser } from '../type';
import { AssistTypeDTO, VariableTypeDTO } from '../../../types/dto';
export const outputsParser: SchemaExtractorOutputsParser = outputs => {
  // Determine whether it is an array
  if (!Array.isArray(outputs)) {
    return [];
  }

  return outputs.map(output => {
    const parsed: {
      name: string;
      description?: string;
      children?: ReturnType<SchemaExtractorOutputsParser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value?: any;
      isImage?: boolean;
      // When the default value includes pictures, the picture information is put here separately.
      images?: string[];
    } = {
      name: output.name || '',
    };
    if (output.description) {
      parsed.description = output.description;
    }
    if (output.type === 'object' && Array.isArray(output.schema)) {
      parsed.children = outputsParser(output.schema);
    }
    if (output.type === 'list' && Array.isArray(output.schema?.schema)) {
      parsed.children = outputsParser(output.schema.schema);
    }
    // Start node default value put on value
    if (output.defaultValue) {
      parsed.value = output.defaultValue;

      // string、file、image、svg
      if (
        (output.type === 'string' &&
          isWorkflowImageTypeURL(output.defaultValue)) ||
        [AssistTypeDTO.image, AssistTypeDTO.svg].includes(
          output.assistType as AssistTypeDTO,
        )
      ) {
        parsed.images = [String(output.defaultValue)];
      } else if (output.type === VariableTypeDTO.list) {
        // Array<Image> | Array<Svg>
        if (
          [AssistTypeDTO.image, AssistTypeDTO.svg].includes(
            output.schema?.assistType,
          )
        ) {
          try {
            const list = JSON.parse(output.defaultValue) as string[];
            Array.isArray(list) &&
              (parsed.images = list.map(item => String(item)));
          } catch (e) {
            console.error(e);
          }
          // Array<File>
        } else if (output.schema?.assistType === AssistTypeDTO.file) {
          try {
            const list = JSON.parse(output.defaultValue) as string[];
            Array.isArray(list) &&
              (parsed.images = list
                .map(item => String(item))
                .filter(item => isWorkflowImageTypeURL(item)));
          } catch (e) {
            console.error(e);
          }
        }
      }
      parsed.isImage = (parsed.images?.length ?? 0) > 0;
    }
    return parsed;
  });
};
