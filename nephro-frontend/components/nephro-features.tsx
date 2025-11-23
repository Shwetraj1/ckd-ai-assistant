"use client"

import { useState, useEffect } from "react"
import {
  Send,
  Upload,
  FileText,
  Plus,
  Check,
  AlertTriangle,
  Brain,
  Clock,
  RefreshCw,
  HeartPulse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

const API_BASE = "http://127.0.0.1:8000/api/v1"

// --- AI Chat Interface ---
export function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: "Hello! I'm your NephroCare Assistant. How can I help you manage your kidney health today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    const newMessages = [...messages, { role: "user" as const, content: userMessage }]

    setMessages(newMessages)
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch(`${API_BASE}/azure-chat/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!res.ok) throw new Error("Chat API error")

      const data = await res.json()

      setMessages([...newMessages, { role: "ai" as const, content: data.reply ?? "No reply from AI." }])
    } catch (err) {
      console.error(err)
      setMessages([
        ...newMessages,
        { role: "ai", content: "AI server not responding. Check backend." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <Card className="h-[600px] flex flex-col border-none shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Brain className="h-5 w-5" /> AI Health Assistant
        </CardTitle>
        <CardDescription>Ask about diet, symptoms, or lab results.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
                  <span
                    className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-background">
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Input
            placeholder="Type your health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full"
          />
          <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

// --- Lab Report Analyzer (connected to backend) ---
export function LabAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeReport = async () => {
    if (!file) return alert("Please upload report first")

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/labs/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Server error")
      }

      const data = await response.json()
      setAnalysis(data.analysis)

    } catch (err) {
      setError("Failed to connect to AI server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* Upload Section */}
      <Card className="lg:col-span-1 border-none shadow-md">
        <CardHeader>
          <CardTitle>Upload Report</CardTitle>
          <CardDescription>Upload PDF or Image of your lab test.</CardDescription>
        </CardHeader>

        <CardContent>
          <Input 
            type="file" 
            accept="image/*,.pdf" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
          />

          <Button 
            className="mt-4 w-full bg-primary"
            onClick={analyzeReport}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Result Section */}
      <div className="lg:col-span-2">
        {!analysis && !loading ? (
          <div className="text-muted-foreground text-center p-10 border rounded-xl">
            Upload a report to view clinical analysis
          </div>
        ) : loading ? (
          <div className="p-10 text-center animate-pulse">
            AI is evaluating clinical parameters...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Clinical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm">
                {analysis}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  )
}


// --- Risk Predictor (connected to backend) ---
export function RiskPredictor() {
  const [creatinine, setCreatinine] = useState([1.2])
  const [egfr, setEgfr] = useState([65])
  const [hb, setHb] = useState([11])

  const [apiRiskLevel, setApiRiskLevel] = useState<string | null>(null)
  const [apiReasons, setApiReasons] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRiskLevel = (e: number) => {
    if (e > 90) return { label: "Low Risk", color: "text-green-600", bg: "bg-green-500" }
    if (e > 60) return { label: "Moderate Risk", color: "text-yellow-600", bg: "bg-yellow-500" }
    return { label: "High Risk", color: "text-red-600", bg: "bg-red-500" }
  }

  const risk = getRiskLevel(egfr[0])

  const handleAssess = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/risk/assess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatinine: creatinine[0],
          egfr: egfr[0],
          hb: hb[0],
        }),
      })

      if (!res.ok) throw new Error("Risk API error")

      const data = await res.json()
      setApiRiskLevel(data.risk_level ?? null)
      setApiReasons(Array.isArray(data.reasons) ? data.reasons : [])
    } catch (err) {
      console.error(err)
      setError("Could not contact risk service.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>CKD Risk Assessment</CardTitle>
          <CardDescription>Adjust the values and run AI-assisted risk prediction.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Serum Creatinine (mg/dL)</Label>
                  <span className="font-mono text-sm font-bold">{creatinine[0]}</span>
                </div>
                <Slider
                  value={creatinine}
                  min={0.5}
                  max={5.0}
                  step={0.1}
                  onValueChange={setCreatinine}
                  className="[&>.bg-primary]:bg-primary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>eGFR (mL/min/1.73m²)</Label>
                  <span className="font-mono text-sm font-bold">{egfr[0]}</span>
                </div>
                <Slider
                  value={egfr}
                  min={10}
                  max={120}
                  step={1}
                  onValueChange={setEgfr}
                  className="[&>.bg-primary]:bg-primary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Hemoglobin (g/dL)</Label>
                  <span className="font-mono text-sm font-bold">{hb[0]}</span>
                </div>
                <Slider
                  value={hb}
                  min={6}
                  max={16}
                  step={0.1}
                  onValueChange={setHb}
                  className="[&>.bg-primary]:bg-primary"
                />
              </div>

              <div className="space-y-3">
                <Label>Urine Albumin-Creatinine Ratio</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (&lt;30 mg/g)</SelectItem>
                    <SelectItem value="moderate">Moderately Increased (30-300 mg/g)</SelectItem>
                    <SelectItem value="severe">Severely Increased (&gt;300 mg/g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center border">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Estimated Risk Profile
              </h3>

              <div className="relative h-40 w-40 flex items-center justify-center mb-4">
                {/* Simple SVG Gauge */}
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="126"
                    strokeDashoffset={126 - 126 * ((120 - egfr[0]) / 110)}
                    className={`${risk.color} transition-all duration-500`}
                  />
                </svg>
                <div className="absolute bottom-0 mb-2 text-center">
                  <span className={`text-2xl font-bold ${risk.color}`}>{risk.label}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                Based on eGFR of {egfr[0]}, kidney function is considered {egfr[0] > 60 ? "adequate" : "reduced"}.
              </p>

              <Button
                className="mt-6 w-full bg-white border hover:bg-gray-50 text-foreground shadow-sm"
                onClick={handleAssess}
                disabled={loading}
              >
                {loading ? "Assessing..." : "Generate Full Report"}
              </Button>

              {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

              {apiRiskLevel && (
                <div className="mt-4 text-left w-full text-sm">
                  <p className="font-semibold">
                    Backend Risk Level:{" "}
                    <span className="font-bold">
                      {apiRiskLevel}
                    </span>
                  </p>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                    {apiReasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Diet Planner (connected to backend) ---
export function DietPlanner() {
  const [stage, setStage] = useState("3")
  const [restriction, setRestriction] = useState("low-sodium")
  const [mealPlan, setMealPlan] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setMealPlan("")
    try {
      const res = await fetch(`${API_BASE}/diet/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          restrictions: restriction,
          notes: "",
        }),
      })
      if (!res.ok) throw new Error("Diet API error")
      const data = await res.json()
      setMealPlan(data.meal_plan ?? "")
    } catch (err) {
      console.error(err)
      setError("Failed to generate meal plan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md bg-green-50/50 dark:bg-green-900/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="stage">CKD Stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger id="stage" className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Stage 1 (Normal)</SelectItem>
                  <SelectItem value="2">Stage 2 (Mild)</SelectItem>
                  <SelectItem value="3">Stage 3 (Moderate)</SelectItem>
                  <SelectItem value="4">Stage 4 (Severe)</SelectItem>
                  <SelectItem value="5">Stage 5 (Failure)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="restriction">Dietary Restriction</Label>
              <Select value={restriction} onValueChange={setRestriction}>
                <SelectTrigger id="restriction" className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select Restriction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-sodium">Low Sodium</SelectItem>
                  <SelectItem value="low-potassium">Low Potassium</SelectItem>
                  <SelectItem value="diabetic">Diabetic Friendly</SelectItem>
                  <SelectItem value="high-protein">High Protein (Dialysis)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
              onClick={handleGenerate}
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> {loading ? "Generating..." : "Generate Plan"}
            </Button>
          </div>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        </CardContent>
      </Card>

      {/* Sample structured cards (visual only, nice for demo) */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            meal: "Breakfast",
            items: ["Oatmeal with berries", "Scrambled egg whites", "Green tea"],
            cals: "320 kcal",
            protein: "12g",
          },
          {
            meal: "Lunch",
            items: ["Grilled chicken salad", "Olive oil dressing", "Apple slices"],
            cals: "450 kcal",
            protein: "25g",
          },
          {
            meal: "Dinner",
            items: ["Baked salmon", "Steamed cauliflower", "White rice (small portion)"],
            cals: "500 kcal",
            protein: "30g",
          },
        ].map((plan, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="h-2 bg-green-500"></div>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                {plan.meal}
                <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {plan.cals}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.items.map((item, k) => (
                  <li key={k} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground w-full text-center">Protein: {plan.protein} • Low Sodium</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Raw AI meal plan text from backend */}
      {mealPlan && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>AI-Generated Meal Plan (Full Text)</CardTitle>
          </CardHeader>
          <CardContent>
            {mealPlan && (
  <Card className="border-none shadow-md">
    <CardHeader>
      <CardTitle>AI-Generated Meal Plan (Full Text)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="border rounded-md bg-muted/40 p-4 max-h-96 overflow-y-auto">
        <div className="prose prose-sm max-w-none whitespace-pre-wrap break-words leading-relaxed">
          {mealPlan}
        </div>
      </div>
    </CardContent>
  </Card>
)}

          </CardContent>
        </Card>
      )}

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm flex gap-3 items-start">
        <Brain className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Dr. Sarah&apos;s Note:</p>
          <p>Remember to limit your sodium intake to less than 2000mg per day. Avoid processed foods and canned soups.</p>
        </div>
      </div>
    </div>
  )
}

// --- Medication Tracker (connected to backend) ---
type Medication = {
  name: string
  dose: string
  time: string
}

export function MedicationTracker() {
  const [meds, setMeds] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newName, setNewName] = useState("")
  const [newDose, setNewDose] = useState("")
  const [newTime, setNewTime] = useState("")

  const fetchMeds = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/meds/list`)
      if (!res.ok) throw new Error("Meds list error")
      const data = await res.json()
      setMeds(Array.isArray(data.medications) ? data.medications : [])
    } catch (err) {
      console.error(err)
      setError("Failed to load medications.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeds()
  }, [])

  const handleAdd = async () => {
    if (!newName.trim() || !newDose.trim() || !newTime.trim()) return

    try {
      setError(null)
      const res = await fetch(`${API_BASE}/meds/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          dose: newDose,
          time: newTime,
        }),
      })
      if (!res.ok) throw new Error("Add meds error")

      // Optimistically update
      setMeds((prev) => [...prev, { name: newName, dose: newDose, time: newTime }])
      setNewName("")
      setNewDose("")
      setNewTime("")
    } catch (err) {
      console.error(err)
      setError("Failed to add medication.")
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Keep track of your daily prescriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading medications...</p>
            ) : meds.length === 0 ? (
              <p className="text-sm text-muted-foreground">No medications added yet.</p>
            ) : (
              <div className="space-y-4">
                {meds.map((med, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/40 transition-colors bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {med.name}{" "}
                          <span className="text-muted-foreground text-xs font-normal">({med.dose})</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{med.time}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                      Taken
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-purple-50 border-purple-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-purple-900">Add Medication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Medicine Name</Label>
              <Input
                className="bg-white"
                placeholder="e.g. Aspirin"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Dosage</Label>
              <Input
                className="bg-white"
                placeholder="e.g. 10mg"
                value={newDose}
                onChange={(e) => setNewDose(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Time</Label>
              <Input
                className="bg-white"
                placeholder="e.g. after dinner"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-2" onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" /> Add Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- Progress Charts (still local dummy data – backend doesn’t expose monthly series yet) ---
export function ProgressCharts() {
  const data = [
    { month: "Jan", creatinine: 1.4, egfr: 55 },
    { month: "Feb", creatinine: 1.3, egfr: 58 },
    { month: "Mar", creatinine: 1.35, egfr: 56 },
    { month: "Apr", creatinine: 1.2, egfr: 62 },
    { month: "May", creatinine: 1.1, egfr: 65 },
    { month: "Jun", creatinine: 1.2, egfr: 60 },
  ]

  const width = 300
  const height = 200
  const paddingX = 30
  const paddingY = 20
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * chartWidth

  const getEgfrY = (val: number) => height - paddingY - ((val - 40) / (80 - 40)) * chartHeight
  const getCreatinineY = (val: number) => height - paddingY - ((val - 0.5) / (2.0 - 0.5)) * chartHeight

  const egfrPoints = data.map((d, i) => `${getX(i)},${getEgfrY(d.egfr)}`).join(" ")
  const creatininePoints = data.map((d, i) => `${getX(i)},${getCreatinineY(d.creatinine)}`).join(" ")

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* eGFR Chart */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>eGFR Trend</CardTitle>
            <CardDescription>Estimated Glomerular Filtration Rate over 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full max-w-[500px]">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={paddingY + tick * chartHeight}
                    x2={width - paddingX}
                    y2={paddingY + tick * chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                <path
                  d={`M ${paddingX},${height - paddingY} L ${egfrPoints} L ${width - paddingX},${height - paddingY} Z`}
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="none"
                />

                <polyline
                  points={egfrPoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {data.map((d, i) => (
                  <g key={i}>
                    <circle cx={getX(i)} cy={getEgfrY(d.egfr)} r="3" fill="#10b981" stroke="white" strokeWidth="2" />
                    <text x={getX(i)} y={height - 5} textAnchor="middle" fontSize="10" fill="#6b7280">
                      {d.month}
                    </text>
                  </g>
                ))}

                {[40, 50, 60, 70, 80].map((val, i) => (
                  <text key={i} x={paddingX - 10} y={getEgfrY(val) + 3} textAnchor="end" fontSize="10" fill="#6b7280">
                    {val}
                  </text>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Creatinine Chart */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Serum Creatinine</CardTitle>
            <CardDescription>Kidney function marker (Lower is better)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full max-w-[500px]">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={paddingY + tick * chartHeight}
                    x2={width - paddingX}
                    y2={paddingY + tick * chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                <polyline
                  points={creatininePoints}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {data.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={getX(i)}
                      cy={getCreatinineY(d.creatinine)}
                      r="4"
                      fill="#f59e0b"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text x={getX(i)} y={height - 5} textAnchor="middle" fontSize="10" fill="#6b7280">
                      {d.month}
                    </text>
                  </g>
                ))}

                {[0.5, 1.0, 1.5, 2.0].map((val, i) => (
                  <text
                    key={i}
                    x={paddingX - 10}
                    y={getCreatinineY(val) + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#6b7280"
                  >
                    {val}
                  </text>
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- Wellness Companion (unchanged UI) ---
export function WellnessCompanion() {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const sendEmotion = async (emotion: string) => {
    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/wellness/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: emotion }),
      })

      const data = await res.json()
      setResponse(data.reply)
    } catch (error) {
      setResponse("Wellness AI is currently unavailable. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-rose-50 to-white min-h-[500px] flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        <HeartPulse className="h-12 w-12 text-rose-400" />
      </div>

      <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Share your emotional state and receive supportive guidance.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
        <Button onClick={() => sendEmotion("I feel good")} variant="outline">
          😊 Feeling Good
        </Button>

        <Button onClick={() => sendEmotion("I feel anxious")} variant="outline">
          😟 Anxious
        </Button>

        <Button onClick={() => sendEmotion("I feel tired")} variant="outline">
          😴 Tired
        </Button>

        <Button onClick={() => sendEmotion("Guide me through meditation")} variant="outline">
          🧘 Start Meditation
        </Button>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Analyzing emotional state...
        </p>
      )}

      {response && (
        <div className="mt-4 bg-white border rounded-lg p-4 max-w-xl shadow">
          <p className="text-sm text-gray-700 leading-relaxed">{response}</p>
        </div>
      )}
    </Card>
  )
}
