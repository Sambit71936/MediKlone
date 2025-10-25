import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Shield,
  Clock,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Complete Patient Journey",
      description: "From registration to discharge, manage the entire patient lifecycle seamlessly.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant system with role-based access control and audit trails.",
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Live dashboards with instant notifications and workflow automation.",
    },
    {
      icon: Users,
      title: "Integrated Modules",
      description: "54+ interconnected modules covering all hospital operations.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive insights with customizable reports and KPI tracking.",
    },
  ];

  const modules = [
    "Patient Registration",
    "OPD Management",
    "IPD Management",
    "Laboratory",
    "Pharmacy",
    "Billing & Insurance",
    "Radiology",
    "Operation Theater",
    "Emergency Services",
    "Inventory Management",
    "HR Management",
    "Finance & Accounts",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 500+ Healthcare Facilities</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Complete Hospital Management System
            </h1>
            <p className="mb-8 text-xl opacity-90">
              Streamline operations, improve patient care, and drive efficiency with our
              comprehensive healthcare management platform.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
                className="group"
              >
                Access Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Why Choose HealthCare Plus?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for modern healthcare with cutting-edge technology
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Comprehensive Module Coverage
            </h2>
            <p className="text-lg text-muted-foreground">
              54+ integrated modules for complete hospital operations
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {modules.map((module, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-success" />
                <span className="font-medium text-foreground">{module}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Ready to Transform Your Hospital?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join hundreds of healthcare facilities using HealthCare Plus
              </p>
              <Button size="lg" onClick={() => navigate("/dashboard")} className="group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 HealthCare Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
