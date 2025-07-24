import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import ChatLauncher from "./components/ChatLauncher";
import ChatWidget from "./components/ChatWidget";

const App: FunctionalComponent = () => {
   const [showChat, setShowChat] = useState(false);

  return (
    <>
      <ChatLauncher onOpen={() => setShowChat(true)} />
      {showChat && <ChatWidget  onClose={() => setShowChat(false)} />}
    </>
  );
};

export default App;