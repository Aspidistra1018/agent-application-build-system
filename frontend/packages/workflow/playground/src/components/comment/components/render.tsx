import { ErrorBoundary } from 'react-error-boundary';
import { type FC } from 'react';

import {
  Field,
  type FieldRenderProps,
  FlowNodeFormData,
  Form,
  type FormModelV2,
} from '@flowgram-adapter/free-layout-editor';
import {
  useNodeRender,
  type WorkflowNodeEntity,
} from '@flowgram-adapter/free-layout-editor';

import { useSize, useModel, useOverflow } from '../hooks';
import { CommentEditorFormField } from '../constant';
import { CommentToolbarContainer } from './toolbar-container';
import { CommentEditor } from './editor';
import { ContentDragArea } from './content-drag-area';
import { CommentContainer } from './container';
import { BorderArea } from './border-area';
import { BlankArea } from './blank-area';

export const CommentRender: FC<{
  node: WorkflowNodeEntity;
}> = props => {
  const { node } = props;
  const model = useModel();

  const { selected: focused, selectNode, nodeRef } = useNodeRender();

  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const formControl = formModel?.formControl;

  const { width, height, onResize } = useSize();
  const { overflow, updateOverflow } = useOverflow({ model, height });

  return (
    <div
      className="workflow-comment w-auto h-auto min-w-[120px] min-h-[80px]"
      style={{
        width,
        height,
      }}
      ref={nodeRef}
      data-node-selected={String(focused)}
      onMouseEnter={updateOverflow}
      onMouseDown={e => {
        setTimeout(() => {
          // Prevent selectNode from intercepting events, causing the slate editor to fail to focus
          selectNode(e);
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- delay
        }, 20);
      }}
    >
      <ErrorBoundary
        fallback={
          <p className="text-red-500">ERROR: Workflow Comment Form Error</p>
        }
      >
        <Form control={formControl}>
          <>
            {/* background */}
            <CommentContainer focused={focused} style={{ height }}>
              <ErrorBoundary
                fallback={
                  <p className="text-red-500">
                    ERROR: Workflow Comment Render Failed
                  </p>
                }
              >
                <Field name={CommentEditorFormField.Note}>
                  {({ field }: FieldRenderProps<string>) => (
                    <>
                      {/** editor */}
                      <CommentEditor
                        model={model}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {/* blank space */}
                      <BlankArea model={model} />
                      {/* content drag and drop area (hidden after clicking) */}
                      <ContentDragArea
                        model={model}
                        focused={focused}
                        overflow={overflow}
                      />
                      {/* toolbar */}
                      <CommentToolbarContainer
                        model={model}
                        containerRef={nodeRef}
                      />
                    </>
                  )}
                </Field>
              </ErrorBoundary>
            </CommentContainer>
            {/* border */}
            <BorderArea model={model} overflow={overflow} onResize={onResize} />
          </>
        </Form>
      </ErrorBoundary>
    </div>
  );
};
