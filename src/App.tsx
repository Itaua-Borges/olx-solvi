import { useState } from "react";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import TopBar from "./components/TopBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchResults from "./pages/SearchResults";
import ItemDetails from "./pages/ItemDetails";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import MyAnnouncements from "./pages/MyAnnouncements";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import SaveNeed from "./pages/SaveNeed";
import MyNeeds from "./pages/MyNeeds";

export type Page =
  | "login"
  | "dashboard"
  | "search"
  | "item-details"
  | "create"
  | "my-announcements"
  | "notifications"
  | "chat"
  | "profile"
  | "needs"
  | "my-needs";

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth >= 768);

  const navigate = (p: Page, itemId?: string) => {
    if (itemId) setSelectedItemId(itemId);
    setPage(p);
    window.scrollTo({ top: 0 });

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  if (page === "login") {
    return <Login onLogin={() => navigate("dashboard")} />;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden" style={{ background: "#f0f4fb" }}>
      <Sidebar currentPage={page} navigate={navigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar
          onSearch={(q) => {
            setSearchQuery(q);
            navigate("search");
          }}
          onNotifications={() => navigate("notifications")}
          onProfile={() => navigate("profile")}
          navigate={navigate}
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pb-16 md:pb-0">
          {page === "dashboard" && <Dashboard navigate={navigate} />}
          {page === "search" && <SearchResults query={searchQuery} navigate={navigate} />}
          {page === "item-details" && <ItemDetails itemId={selectedItemId} navigate={navigate} />}
          {page === "create" && <CreateAnnouncement navigate={navigate} />}
          {page === "my-announcements" && <MyAnnouncements navigate={navigate} />}
          {page === "notifications" && <Notifications navigate={navigate} />}
          {page === "chat" && <Chat navigate={navigate} />}
          {page === "profile" && <UserProfile navigate={navigate} />}
          {page === "needs" && <SaveNeed navigate={navigate} />}
          {page === "my-needs" && <MyNeeds navigate={navigate} />}
        </main>
      </div>
      <BottomNav currentPage={page} navigate={navigate} />
    </div>
  );
}
