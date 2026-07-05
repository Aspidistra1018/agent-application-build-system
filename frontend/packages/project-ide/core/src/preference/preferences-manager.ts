import { injectable } from 'inversify';
import {
  isObject,
  type SchemaDecoration,
  Emitter,
} from '@flowgram-adapter/common';

import { type PreferenceSchema } from './preference-contribution';

@injectable()
class PreferencesManager {
  private readonly preferences: Record<string, any> = {};

  readonly schema: PreferenceSchema = {
    properties: {},
  };

  private readonly preferencesChange = new Emitter<void>();

  onDidPreferencesChange = this.preferencesChange.event;

  public init(data: any) {
    /**
     * Read user configuration remotely or locally
     */
    Object.assign(this.preferences, data);
    this.preferencesChange.fire();
  }

  public setSchema(schema: PreferenceSchema) {
    const { properties } = schema;
    /** Here is a simple verification first, followed by the entire validateSchema. */
    if (!properties || !isObject(properties)) {
      return;
    }
    Object.entries<SchemaDecoration>(properties).forEach(([key, value]) => {
      if (this.schema.properties[key]) {
        // Repeatedly defined do not cover, report a warning first
        console.error(
          'Preference name collision detected in the schema for property: ',
          key,
        );
        return;
      }
      this.schema.properties[key] = value;
    });
  }

  getPreferenceData(key: string) {
    return this.preferences[key];
  }
}

export { PreferencesManager };
