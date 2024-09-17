import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SidebarProfile from "@/components/SidebarProfile";
import ChatContent from "@/components/ChatContent";

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={20} maxSize={30} order={1}>
        <div className="flex flex-col items-center h-full">
          <SidebarProfile />
          <SidebarProfile />
          <SidebarProfile />
          <SidebarProfile />
          <SidebarProfile />
          <SidebarProfile />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} order={2}>
        <div className="flex h-full items-center justify-center">
          <ChatContent />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
