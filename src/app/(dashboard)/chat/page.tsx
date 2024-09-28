import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Page() {
  return (
    <>
      <DashboardNavbar/>
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <div className="relative">
        <CopilotChat
          labels={{
            title: "Cooper Word",
            initial: "Welcome to Cooper Word! How can I help you today?",
          }}
          instructions="When a user asks a question, analyze it to understand the subject and provide a clear, accurate answer relevant to the user's query."
          className="min-h-screen p-8 pb-32 bg-black  text-white"
        />
      </div>
    </div>
      <Footer/>
    </>
  );
}