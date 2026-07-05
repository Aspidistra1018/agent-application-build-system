import {
  type OnTextContentRenderingContext,
  type OnMessageBoxRenderContext,
} from '../../types/plugin-class/render-life-cycle';
import {
  ReadonlyLifeCycleService,
  WriteableLifeCycleService,
} from './life-cycle-service';

/**
 * ! Hope you noticed that the context information for the lifecycle is placed in ctx
 * ! If the judgment is just context, please pay attention to the convergence into ctx and do not add new parameters
 * ! Please pay attention here when CodeReview.
 */
export abstract class ReadonlyRenderLifeCycleService<
  T = unknown,
  K = unknown,
> extends ReadonlyLifeCycleService<T, K> {
  onTextContentRendering?(
    ctx: OnTextContentRenderingContext,
  ): OnTextContentRenderingContext;
  onMessageBoxRender?(
    ctx: OnMessageBoxRenderContext,
  ): OnMessageBoxRenderContext;
}

export abstract class WriteableRenderLifeCycleService<
  T = unknown,
  K = unknown,
> extends WriteableLifeCycleService<T, K> {
  onTextContentRendering?(
    ctx: OnTextContentRenderingContext,
  ): OnTextContentRenderingContext;
  onMessageBoxRender?(
    ctx: OnMessageBoxRenderContext,
  ): OnMessageBoxRenderContext;
}
