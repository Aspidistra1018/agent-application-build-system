/**
 * Why maintain triggerId so much?
 * The new process fetchStartNodeTriggerFormValue without triggerId, after the initial save, the backend returns triggerId
 * The saved process, when fetchStartNodeTriggerFormValue, will return triggerId
 * The acquisition time is different, and it is more troublesome to hard-plug the triggerId into formData, so it is directly maintained in the cacheTriggerId.
 */
const cacheTriggerId: Record<string, string> = {};
export const setTriggerId = (wfId: string, triggerId: string) => {
  cacheTriggerId[wfId] = triggerId;
};

export const getTriggerId = (wfId: string) => cacheTriggerId[wfId];
