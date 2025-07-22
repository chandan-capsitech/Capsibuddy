import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import ChatLauncher from "./components/ChatLauncher";
import ChatWidget from "./components/ChatWidget";

const App: FunctionalComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatLauncher onOpen={() => setOpen(true)} />
      {open && <ChatWidget />}
    </>
  );
};

export default App;