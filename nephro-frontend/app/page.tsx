"use client"

import { useState } from "react"
import {
  Activity,
  Brain,
  Calendar,
  FileText,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  Pill,
  Settings,
  TrendingUp,
  Upload,
  User,
  Menu,
  X,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChatInterface,
  LabAnalyzer,
  RiskPredictor,
  DietPlanner,
  MedicationTracker,
  ProgressCharts,
  WellnessCompanion,
} from "@/components/nephro-features"

// Placeholder components for feature views
const DashboardView = ({ setActiveView }: { setActiveView: (view: string) => void }) => (
  <div className="space-y-6 animate-in fade-in-50">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Card 1: AI Health Chat */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <MessageSquare className="h-24 w-24 text-primary" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
            <MessageSquare className="h-6 w-6" />
          </div>
          <CardTitle>AI Health Chat</CardTitle>
          <CardDescription>Talk to our AI for personalized CKD guidance.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            onClick={() => setActiveView("chat")}
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-md rounded-full group"
          >
            Start Chat <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Card 2: Lab Report Analyzer */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <FileText className="h-24 w-24 text-teal-500" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-2 dark:bg-teal-900/30">
            <Upload className="h-6 w-6" />
          </div>
          <CardTitle>Lab Report Analyzer</CardTitle>
          <CardDescription>Upload medical reports for instant analysis.</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div
            className="border-2 border-dashed border-teal-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-teal-50/50 cursor-pointer hover:bg-teal-100/50 transition-colors"
            onClick={() => setActiveView("lab")}
          >
            <Upload className="h-8 w-8 text-teal-500 mb-2" />
            <p className="text-xs font-medium text-teal-700">Drag & Drop PDF or JPG</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setActiveView("lab")}
            variant="outline"
            className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-900/50 rounded-full"
          >
            Upload & Analyze
          </Button>
        </CardFooter>
      </Card>

      {/* Card 3: Risk Predictor */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity className="h-24 w-24 text-amber-500" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-2 dark:bg-amber-900/30">
            <Activity className="h-6 w-6" />
          </div>
          <CardTitle>Risk Predictor</CardTitle>
          <CardDescription>Assess kidney risk based on your vitals.</CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex flex-col items-center">
          <div className="relative h-24 w-full flex items-center justify-center">
            <svg viewBox="0 0 100 50" className="w-40 h-20">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 50 10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute bottom-0 text-center mb-1">
              <span className="text-lg font-bold text-amber-600 block leading-none">Moderate</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk Level</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setActiveView("risk")}
            variant="ghost"
            className="w-full text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
          >
            Check Details
          </Button>
        </CardFooter>
      </Card>

      {/* Card 4: Diet Planner */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Calendar className="h-24 w-24 text-green-500" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2 dark:bg-green-900/30">
            <Calendar className="h-6 w-6" />
          </div>
          <CardTitle>Diet Planner</CardTitle>
          <CardDescription>Get a personalized day-wise meal plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-green-100 flex justify-between items-center shadow-sm">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-green-900">Breakfast</span>
              <span className="text-xs text-green-700">Oatmeal with berries</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">
              320 kcal
            </Badge>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-green-100 flex justify-between items-center shadow-sm">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-green-900">Lunch</span>
              <span className="text-xs text-green-700">Grilled chicken salad</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">
              450 kcal
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setActiveView("diet")}
            variant="outline"
            className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/50 rounded-full"
          >
            View Full Plan
          </Button>
        </CardFooter>
      </Card>

      {/* Card 5: Medication Tracker */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Pill className="h-24 w-24 text-purple-500" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-2 dark:bg-purple-900/30">
            <Pill className="h-6 w-6" />
          </div>
          <CardTitle>Medications</CardTitle>
          <CardDescription>Track doses and set reminders.</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-purple-900">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Lisinopril</span>
              </div>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-green-600 bg-green-50 hover:bg-green-100">
                Taken
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-purple-900">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <span className="font-medium">Furosemide</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                Mark Taken
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setActiveView("meds")}
            variant="ghost"
            className="w-full text-purple-700 hover:text-purple-800 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50"
          >
            Manage Meds
          </Button>
        </CardFooter>
      </Card>

      {/* Card 6: Wellness Companion */}
      <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-rose-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain className="h-24 w-24 text-rose-500" />
        </div>
        <CardHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-2 dark:bg-rose-900/30">
            <Brain className="h-6 w-6" />
          </div>
          <CardTitle>Wellness Companion</CardTitle>
          <CardDescription>How are you feeling today?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 gap-1 border-rose-100 hover:bg-rose-50 text-rose-700 bg-white/50"
            >
              <span className="text-xl">😊</span>
              <span className="text-[10px] font-medium">Good</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 gap-1 border-rose-100 hover:bg-rose-50 text-rose-700 bg-white/50"
            >
              <span className="text-xl">😟</span>
              <span className="text-[10px] font-medium">Anxious</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 gap-1 border-rose-100 hover:bg-rose-50 text-rose-700 bg-white/50"
            >
              <span className="text-xl">😴</span>
              <span className="text-[10px] font-medium">Tired</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setActiveView("wellness")}
            className="w-full bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 shadow-none rounded-full"
          >
            Start Meditation
          </Button>
        </CardFooter>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {/* Quick Progress Overview */}
      <Card className="shadow-md border-none bg-white/80 backdrop-blur-sm dark:bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Health Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Creatinine Levels</span>
                <span className="font-bold text-primary">1.2 mg/dL</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>eGFR</span>
                <span className="font-bold text-green-600">85 ml/min</span>
              </div>
              <Progress value={85} className="h-2 bg-green-100 [&>div]:bg-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments or Tips */}
      <Card className="shadow-md border-none bg-white/80 backdrop-blur-sm dark:bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Daily Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">Hydration Reminder</p>
            <p>Drink 200ml of water in the next hour to maintain optimal hydration levels.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

export default function NephroCareApp() {
  const [activeView, setActiveView] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView setActiveView={setActiveView} />
      case "chat":
        return <ChatInterface />
      case "lab":
        return <LabAnalyzer />
      case "risk":
        return <RiskPredictor />
      case "diet":
        return <DietPlanner />
      case "meds":
        return <MedicationTracker />
      case "progress":
        return <ProgressCharts />
      case "wellness":
        return <WellnessCompanion />
      default:
        return <DashboardView setActiveView={setActiveView} />
    }
  }

  const NavButton = ({ view, label, icon: Icon }: { view: string; label: string; icon: any }) => (
    <Button
      variant={activeView === view ? "secondary" : "ghost"}
      className={`w-full justify-start gap-3 ${activeView === view ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
      onClick={() => {
        setActiveView(view)
        setIsMobileMenuOpen(false)
      }}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Button>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans selection:bg-primary/20">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20">
            <Brain className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg tracking-tight">NephroCare AI</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Navigation (Desktop) & Mobile Drawer */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-10 w-72 bg-white/95 backdrop-blur-xl border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        shadow-2xl md:shadow-none
      `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 mb-8 px-2">
            <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">NephroCare AI</h1>
              <p className="text-xs text-muted-foreground font-medium">CKD Assistant</p>
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 mt-4">
              Main
            </div>
            <NavButton view="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <NavButton view="chat" label="AI Assistant" icon={MessageSquare} />
            <NavButton view="lab" label="Lab Analysis" icon={FileText} />

            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 mt-6">
              Management
            </div>
            <NavButton view="diet" label="Diet Planner" icon={Calendar} />
            <NavButton view="meds" label="Medications" icon={Pill} />
            <NavButton view="risk" label="Risk Assessment" icon={Activity} />
            <NavButton view="progress" label="My Progress" icon={TrendingUp} />
            <NavButton view="wellness" label="Mental Wellness" icon={HeartPulse} />
          </div>

          <div className="mt-auto pt-6 border-t">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-sm mb-4">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Dr. Sarah Wilson</p>
                  <p className="text-xs text-muted-foreground">Nephrologist</p>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full gap-2 border-dashed bg-transparent">
              <Settings className="h-4 w-4" /> Settings
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-65px)] md:h-screen bg-background/50">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {activeView === "dashboard"
                  ? "Welcome back, Alex"
                  : activeView === "chat"
                    ? "AI Assistant"
                    : activeView === "lab"
                      ? "Lab Analysis"
                      : activeView === "risk"
                        ? "Risk Assessment"
                        : activeView === "diet"
                          ? "Diet Planner"
                          : activeView === "meds"
                            ? "Medications"
                            : activeView === "progress"
                              ? "Patient Progress"
                              : "Wellness Companion"}
              </h2>
              <p className="text-muted-foreground">
                {activeView === "dashboard"
                  ? "Here is your daily kidney health overview."
                  : "Manage your health details below."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">Current Stage</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-semibold">
                  CKD Stage 3a
                </Badge>
              </div>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary">AL</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {renderView()}

          <footer className="mt-12 text-center text-xs text-muted-foreground py-4 border-t">
            <p>© 2025 NephroCare AI. Not a replacement for professional medical advice.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
