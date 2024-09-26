import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Page() {
  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div className="absolute inset-0 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <div className="relative">
        <CopilotChat
          labels={{
            title: "Cooper Word",
            initial: "Welcome to Cooper Word! How can I help you today?",
          }}
          instructions="When a user asks a question, analyze it to understand the subject and provide a clear, accurate answer relevant to the creation of documents in form of powerpoint presentation , word , excel , text etc. Make sure to focus solely on educational content and avoid giving personal advice or unrelated information."
          className="min-h-screen p-8 pb-32"
        />
      </div>
    </div>
  );
}