import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import ChatLauncher from "./components/ChatLauncher";
import ChatWidget from "./components/ChatWidget";

const App: FunctionalComponent = () => {
  const [showChat, setShowChat] = useState(false);

  const handleToggleChat = () => setShowChat(open => !open);

  return (
    <>
      <ChatLauncher onOpen={handleToggleChat} isOpen={showChat} />
      {showChat && <ChatWidget onClose={handleToggleChat} />}
    </>
  );
};

export default App;