/* global React */

/* PageShell — wraps a page's content with Nav, Footer, and the DemoModal.
   Each page does:
     ReactDOM.createRoot(...).render(
       <PageShell current="source"><MyPageContent /></PageShell>
     );
*/

function PageShell({ current, children }) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const open = React.useCallback(() => setDemoOpen(true), []);
  const close = React.useCallback(() => setDemoOpen(false), []);

  // expose to children via context-like prop drilling helper
  const ctx = React.useMemo(() => ({ onBookDemo: open }), [open]);

  // give a child the onBookDemo prop if it's a single element
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { onBookDemo: open });
  });

  return (
    <React.Fragment>
      <Nav onBookDemo={open} current={current} />
      {enhancedChildren}
      <Footer />
      <DemoModal open={demoOpen} onClose={close} />
    </React.Fragment>
  );
}

Object.assign(window, { PageShell });
