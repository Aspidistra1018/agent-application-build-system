export function removeGlobalLoading() {
  const spin = document.querySelector('#global-spin-wrapper');
  // Hide loading directly for browsers that do not support MutationObserver to avoid affecting the display of normal pages
  if (!window.MutationObserver && spin) {
    (spin as HTMLElement).style.display = 'none';
    return;
  }
  const targetNode = document.querySelector('#root');
  const observerOptions = {
    childList: true, // Observe the changes of the target sub-node and see if any are added or deleted
    attributes: true, // Observe attribute changes
    subtree: true, // Observe the descendant nodes, the default is false
  };

  const observer = new MutationObserver(function callback(mutationList) {
    // Cancel loading if there is any change in the root node and cancel the observation
    mutationList.forEach(mutation => {
      if (spin) {
        (spin as HTMLElement).style.display = 'none';
      }
      observer.disconnect();
    });
  });
  observer.observe(targetNode as Element, observerOptions);
}
