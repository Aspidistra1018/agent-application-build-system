import {
  ArrayType,
  type BaseVariableField,
} from '@flowgram-adapter/free-layout-editor';

export class CustomArrayType extends ArrayType {
  getByKeyPath(keyPath: string[]): BaseVariableField<unknown> | undefined {
    // const [curr, ...rest] = keyPath || [];

    // if (curr === '0' && this.canDrilldownItems) {
    //   //Array item 0
    //   return this.items.getByKeyPath(rest);
    // }

    if (this.canDrilldownItems) {
      // The bottom line in Coze is item 0
      return this.items.getByKeyPath(keyPath);
    }

    return;
  }
}
