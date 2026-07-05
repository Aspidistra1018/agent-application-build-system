import React, { useCallback, useMemo } from 'react';

import { type interfaces } from 'inversify';
import { FlowRendererContainerModule } from '@flowgram-adapter/free-layout-editor';
import { createNodeCorePlugin } from '@flowgram-adapter/free-layout-editor';
import { createFreeStackPlugin } from '@flowgram-adapter/free-layout-editor';
import { createFreeAutoLayoutPlugin } from '@flowgram-adapter/free-layout-editor';
import { FlowDocumentContainerModule } from '@flowgram-adapter/free-layout-editor';
import {
  PlaygroundReactProvider,
  type Plugin,
} from '@flowgram-adapter/free-layout-editor';
import { WorkflowDocumentContainerModule } from '@flowgram-adapter/free-layout-editor';

import { WorkflowRenderContainerModule } from './workflow-render-container-module';
import { WorkflowLoader } from './workflow-loader';

export interface WorkflowRenderProviderProps {
  children: React.ReactElement;
  containerModules?: interfaces.ContainerModule[];
  preset?: () => Plugin[];
  parentContainer?: interfaces.Container;
}

/**
 * Canvas Engine Rendering
 */
export const WorkflowRenderProvider = (props: WorkflowRenderProviderProps) => {
  const modules = useMemo(
    () => [
      FlowDocumentContainerModule, // default document
      FlowRendererContainerModule, // default rendering
      // FlowActivitiesContainerModule,//This is a module to fix the canvas, no dependency is currently required
      WorkflowDocumentContainerModule, // extended document
      WorkflowRenderContainerModule, // extended rendering
      ...(props.containerModules || []),
    ],
    [],
  );

  const preset = useCallback(
    () => [
      createFreeAutoLayoutPlugin({}),
      createFreeStackPlugin({}), // rendering hierarchy management
      createNodeCorePlugin({}),
      ...(props.preset?.() || []),
    ],
    [],
  );

  return (
    <PlaygroundReactProvider
      containerModules={modules}
      plugins={preset}
      parentContainer={props.parentContainer}
    >
      <WorkflowLoader />
      {props.children}
    </PlaygroundReactProvider>
  );
};
