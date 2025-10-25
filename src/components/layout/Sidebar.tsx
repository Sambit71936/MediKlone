import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  BedDouble,
  TestTube,
  Pill,
  Receipt,
  FileText,
  MessageSquare,
  ChevronDown,
  Users,
  Package,
  Settings,
  BarChart3,
  Shield,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: UserPlus, label: "Registration", path: "/registration" },
  { icon: Stethoscope, label: "Consultation", path: "/consultation" },
  { icon: BedDouble, label: "Admission", path: "/admission" },
  { icon: TestTube, label: "Diagnostics", path: "/diagnostics" },
  { icon: Pill, label: "Pharmacy", path: "/pharmacy" },
  { icon: Receipt, label: "Billing", path: "/billing" },
  { icon: FileText, label: "Discharge", path: "/discharge" },
  { icon: MessageSquare, label: "Feedback", path: "/feedback" },
];

const supportModules = [
  { icon: Users, label: "HR Management", path: "/hr" },
  { icon: Package, label: "Store & Inventory", path: "/inventory" },
  { icon: Wrench, label: "Biomedical", path: "/biomedical" },
  { icon: Shield, label: "Quality Control", path: "/quality" },
  { icon: Settings, label: "IT Systems", path: "/it" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </div>

            <Collapsible open={supportOpen} onOpenChange={setSupportOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span>Support Modules</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      supportOpen && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pt-1">
                {supportModules.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </nav>

          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">System Status</p>
              <p className="mt-1 flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-success"></span>
                All systems operational
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
