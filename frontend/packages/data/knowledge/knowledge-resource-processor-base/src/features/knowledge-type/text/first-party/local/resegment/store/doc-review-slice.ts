import { type StateCreator } from 'zustand';
import { type Review } from '@coze-arch/idl/knowledge';

export interface IDocReviewState {
  /**
   * The id of the currently active doc review
   */
  currentReviewID?: string;
  /**
   * The ID of the currently selected segment
   */
  selectionIDs?: string[];
  /**
   * List of docReview
   */
  docReviewList: Review[];
}

export interface IDocReviewAction {
  /**
   * Set the id of the currently active doc review
   * @param id
   */
  setCurrentReviewID: (id: string) => void;
  /**
   * Sets the ID of the currently selected segment.
   * @param ids
   */
  setSelectionIDs: (ids: string[]) => void;
  /**
   * Set up a list of docReviews
   * @param list
   */
  setDocReviewList: (list: Review[]) => void;
}

export type IDocReviewSlice = IDocReviewState & IDocReviewAction;

export const getDefaultDocReviewState = () => ({
  currentReviewID: undefined,
  selectionID: undefined,
  docReviewList: [],
});

export const createDocReviewSlice: StateCreator<IDocReviewSlice> = set => ({
  ...getDefaultDocReviewState(),

  setCurrentReviewID: (id: string) => set(() => ({ currentReviewID: id })),
  setSelectionIDs: (ids: string[]) => set(() => ({ selectionIDs: ids })),
  setDocReviewList: (list: Review[]) => set(() => ({ docReviewList: list })),
});
