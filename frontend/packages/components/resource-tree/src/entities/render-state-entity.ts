import { ConfigEntity } from '@flowgram-adapter/fixed-layout-editor';

interface CustomRenderState {
  version: number;
}
/**
 * Rendering-related global state management
 */
export class CustomRenderStateEntity extends ConfigEntity<CustomRenderState> {
  static type = 'CustomRenderStateEntity';

  private _localVersion = 0;

  getDefaultConfig() {
    return {
      version: 0,
    };
  }

  private bumpVersion() {
    this._localVersion = this._localVersion + 1;
    if (this._localVersion === Number.MAX_SAFE_INTEGER) {
      this._localVersion = 0;
    }
  }

  updateVersion() {
    this.bumpVersion();
    this.updateConfig({
      version: this._localVersion,
    });
  }
}
