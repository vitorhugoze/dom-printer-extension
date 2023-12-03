function tabSuspendHandler() {
  (window as any).stopExecution = true;
  console.log("execution interrupted");
}
tabSuspendHandler();
