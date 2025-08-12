import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import React, { Suspense, lazy } from "react";
import { useLocation } from "wouter";

// Lazy load components for better performance
const NotFound = React.lazy(() => import("@/pages/not-found"));
const MapTest = React.lazy(() => import('@/pages/map-test'));
const MapsDebug = lazy(() => import("./pages/maps-debug"));
const Home = React.lazy(() => import("@/pages/home"));
const AuthPage = React.lazy(() => import("@/pages/auth-page"));
const Dashboard = React.lazy(() => import("@/pages/dashboard"));
const Installations = React.lazy(() => import("@/pages/installations"));
const NewInstallation = React.lazy(() => import("@/pages/new-installation"));
const InstallationDetail = React.lazy(() => import("@/pages/installation-detail"));
const Contact = React.lazy(() => import("@/pages/contact"));
const Settings = React.lazy(() => import("@/pages/settings"));
const ForgotPassword = React.lazy(() => import("@/pages/forgot-password"));
const ResetPassword = React.lazy(() => import("@/pages/reset-password"));
const AccountSettings = React.lazy(() => import("@/pages/account-settings"));
const Onboarding = React.lazy(() => import("@/pages/onboarding"));
const AdvisorPage = React.lazy(() => import("@/pages/advisor-page"));
const ReferralProgram = React.lazy(() => import("@/pages/ReferralProgram"));
const MarketingDashboard = React.lazy(() => import("@/pages/MarketingDashboard"));

// Layout components
import Header from "@/components/layout/new-header";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/home/back-to-top";
import { Chat } from "@/components/ui/chat";
import { AIChatbot } from "@/components/chat/ai-chatbot";
import { FloatingChatBubble } from "@/components/chat/floating-chat-bubble";
import { AIErrorHelper } from "@/components/ai-error-helper";
import { TourProvider } from "@/components/onboarding/tour-provider";
import { ProtectedRoute } from "@/lib/protected-route";
import { AdminRoute } from "@/lib/admin-route";
import { SubcontractorRoute } from "@/lib/subcontractor-route";
import { NotificationProvider } from "@/components/notifications/notification-provider";

// Lazy load admin components
const AdminDashboard = React.lazy(() => import("@/pages/admin/dashboard"));
const AdminInstallationsList = React.lazy(() => import("@/pages/admin/installations"));
const AdminInstallationDetail = React.lazy(() => import("@/pages/admin/installation-detail"));
const AdminChat = React.lazy(() => import("@/pages/admin/chat"));
const AdminSubcontractors = React.lazy(() => import("@/pages/admin/subcontractors"));
const SubcontractorsPage = React.lazy(() => import("@/pages/admin/subcontractors"));
const AdminSchedule = React.lazy(() => import("@/pages/admin/schedule"));
const AdminWorkflow = React.lazy(() => import("@/pages/admin/workflow"));
const SubcontractorSchedulePage = React.lazy(() => import("@/pages/admin/subcontractor-schedule"));
const KpiDashboardPage = React.lazy(() => import("@/pages/admin/kpi-dashboard"));
const InstallationAIMatchingPage = React.lazy(() => import("@/pages/admin/InstallationAIMatchingPage"));
const ArchivedRecords = React.lazy(() => import("@/pages/admin/archived-records"));
const AdminLogin = React.lazy(() => import("@/pages/admin-login"));

// Lazy load admin contact/CRM components
const AdminContactListComponent = React.lazy(() => import("@/pages/admin/contact-submissions"));
const AdminContactsComponent = React.lazy(() => import("@/pages/admin/contacts"));
const AdminCustomerApplicationsPage = React.lazy(() => import("@/pages/admin/applications/customer"));
const AdminCustomerApplicationDetailPage = React.lazy(() => import("@/pages/admin/applications/customer-detail"));
const AdminSubcontractorApplicationsPage = React.lazy(() => import("@/pages/admin/applications/subcontractor"));
const ApplicationArchiveComponent = React.lazy(() => import("@/pages/admin/applications/archive"));
const CRMDashboard = React.lazy(() => import("@/pages/admin/crm-dashboard"));

// Lazy load subcontractor components
const SubcontractorDashboard = React.lazy(() => import("@/pages/subcontractor/dashboard"));
const SubcontractorOnboarding = React.lazy(() => import("@/pages/subcontractor/onboarding"));
const SubcontractorJobDetail = React.lazy(() => import("@/pages/subcontractor/job/[id]"));
const SubcontractorCalendar = React.lazy(() => import("@/pages/subcontractor/calendar"));
const SubcontractorHistory = React.lazy(() => import("@/pages/subcontractor/history"));
const SubcontractorSettings = React.lazy(() => import("@/pages/subcontractor/settings"));

// Loading component
function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const { user } = useAuth();
  const isAuthPage = location === "/auth";
  const isAdminPage = location.startsWith("/admin");
  const isSubcontractorPage = location.startsWith("/subcontractor");
  const isOnboardingPage = location === "/onboarding";
  const showHeaderFooter = !isAuthPage && !isAdminPage && !isOnboardingPage && !isSubcontractorPage;

  return (
    <TourProvider>
      {showHeaderFooter && <Header />}
      <main className={!showHeaderFooter ? "min-h-screen" : ""}>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {/* Public routes */}
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/contact" component={Contact} />
            <Route path="/advisor" component={AdvisorPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/admin-login" component={AdminLogin} />

            {/* Map test and debug routes */}
            <Route path="/map-test" component={MapTest} />
            <Route path="/maps-debug" component={MapsDebug} />

            {/* Protected customer routes */}
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/installations" component={Installations} />
            <ProtectedRoute path="/installations/new" component={NewInstallation} />
            <ProtectedRoute path="/installations/:id" component={InstallationDetail} />
            <ProtectedRoute path="/settings" component={Settings} />
            <ProtectedRoute path="/account-settings" component={AccountSettings} />
            <ProtectedRoute path="/referrals" component={ReferralProgram} />

            {/* Subcontractor routes */}
            <SubcontractorRoute path="/subcontractor" component={SubcontractorDashboard} />
            <SubcontractorRoute path="/subcontractor/dashboard" component={SubcontractorDashboard} />
            <SubcontractorRoute path="/subcontractor/onboarding" component={SubcontractorOnboarding} />
            <SubcontractorRoute path="/subcontractor/job/:id" component={SubcontractorJobDetail} />
            <SubcontractorRoute path="/subcontractor/calendar" component={SubcontractorCalendar} />
            <SubcontractorRoute path="/subcontractor/history" component={SubcontractorHistory} />
            <SubcontractorRoute path="/subcontractor/settings" component={SubcontractorSettings} />

            {/* Admin routes */}
            <AdminRoute path="/admin" component={AdminDashboard} />
            <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
            <AdminRoute path="/admin/installations" component={AdminInstallationsList} />
            <AdminRoute path="/admin/installations/:id" component={AdminInstallationDetail} />
            <AdminRoute path="/admin/installations/:id/ai-matching" component={InstallationAIMatchingPage} />
            <AdminRoute path="/admin/contact" component={AdminContactListComponent} />
            <AdminRoute path="/admin/contacts" component={AdminContactsComponent} />
            <AdminRoute path="/admin/chat" component={AdminChat} />
            <AdminRoute path="/admin/subcontractors" component={SubcontractorsPage} />
            <AdminRoute path="/admin/subcontractors/new" component={SubcontractorsPage} />
            <AdminRoute path="/admin/subcontractor-schedule/:id" component={SubcontractorSchedulePage} />
            <AdminRoute path="/admin/schedule" component={AdminSchedule} />
            <AdminRoute path="/admin/workflow" component={AdminWorkflow} />
            <AdminRoute path="/admin/applications/customer" component={AdminCustomerApplicationsPage} />
            <AdminRoute path="/admin/applications/customer/:id" component={AdminCustomerApplicationDetailPage} />
            <AdminRoute path="/admin/applications/subcontractor" component={AdminSubcontractorApplicationsPage} />
            <AdminRoute path="/admin/archived-records" component={ArchivedRecords} />
            <AdminRoute path="/admin/crm" component={CRMDashboard} />
            <AdminRoute path="/admin/kpi" component={KpiDashboardPage} />
            <AdminRoute path="/admin/marketing" component={MarketingDashboard} />

            {/* Not found */}
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      {showHeaderFooter && <Footer />}
      {showHeaderFooter && <BackToTop />}
      {/* Temporarily disabled to prevent WebSocket connection issues */}
      {/* {showHeaderFooter && <Chat />} */}
      {/* <FloatingChatBubble /> */}
      {/* <AIChatbot /> */}
      <AIErrorHelper userRole={user?.role} />
    </TourProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <Router />
            <Toaster />
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;