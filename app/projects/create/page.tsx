"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Upload,
  Database,
  Cloud,
  HardDrive,
  FolderOpen,
  Plus,
  X,
  UserPlus,
  Plane,
  CheckCircle2,
  Sparkles,
  Shield,
  Users,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Notifications } from "@/components/notifications"

const dataSourceOptions = [
  { id: "s3", name: "Amazon S3", icon: Database, description: "Connect to AWS S3 bucket" },
  { id: "box", name: "Box", icon: Cloud, description: "Import from Box storage" },
  { id: "drive", name: "Google Drive", icon: HardDrive, description: "Connect to Google Drive" },
  { id: "azure", name: "Azure Blob", icon: Database, description: "Connect to Azure storage" },
  { id: "ftp", name: "FTP/SFTP", icon: FolderOpen, description: "Connect via FTP protocol" },
  { id: "upload", name: "Manual Upload", icon: Upload, description: "Upload documents directly" },
]

const roleOptions = ["Project Owner", "Admin", "Editor", "Viewer", "Approver"]
const organizationTypes = ["MRO", "CAMO", "Lessor", "Operator", "OEM", "Consultant"]

const teamMemberNames = [
  "Sarah Chen",
  "Mike Johnson",
  "Emily Rodriguez",
  "David Kim",
  "Lisa Anderson",
  "James Wilson",
  "Maria Garcia",
  "Robert Taylor",
]

const iataFoldersWithSubfolders = [
  {
    id: "A",
    name: "A — Current Certificates",
    subfolders: [
      { id: "A001", name: "Certificate of Airworthiness (incl. ARC if applicable)" },
      { id: "A002", name: "Certificate of Registration" },
      { id: "A003", name: "Certificate of Airworthiness for Export (if applicable)" },
      { id: "A004", name: "Noise Certificate (or AFM page equivalent)" },
      { id: "A005", name: "Radio Station License copy (incl. list of installed radio-transmitting equipment)" },
      { id: "A006", name: "Aircraft De-Registration confirmation (if applicable)" },
      { id: "A007", name: "Burn Certification (FAR 25.853 / EASA equivalent; in-combination where applicable)" },
    ],
  },
  {
    id: "B",
    name: "B — Aircraft Maintenance Status Summaries (certified)",
    subfolders: [
      { id: "B001", name: "Airframe Check / Inspection History / Maintenance Checks performed" },
      { id: "B002", name: "Total Time in Service (hours/cycles)" },
      { id: "B003", name: "Flight Time Report / Tech Log / MIS utilization report" },
      { id: "B004", name: "Airframe & Appliance AD status (incl. revision, applicability, method of compliance)" },
      { id: "B005", name: "Manufacturer SBs incorporated (or in Mod Listing)" },
      { id: "B006", name: "Non-manufacturer modifications (incl. STCs) status (or in Mod Listing)" },
      { id: "B007", name: "AMP compliance status (task list, source, LDND, ICA, out-of-phase)" },
      { id: "B008", name: "SSI / ALS (Airbus) status" },
      { id: "B009", name: "CPCP / ISIP status" },
      { id: "B010", name: "CMR status" },
      { id: "B011", name: "ALI status" },
      { id: "B012", name: "Deferred maintenance items list (if applicable)" },
      { id: "B013", name: "Time-Controlled Components status (with limitation parameter)" },
      { id: "B014", name: "Life-Limited Airframe Parts status (limits/TSN-CSN remaining)" },
      {
        id: "B015",
        name: "Operator-tracked Components listing (incl. engines where applicable; P/N, S/N, install date, TSN/CSN/TSO/CSO)",
      },
      {
        id: "B016",
        name: "Incident/Accident Clearance Statement (IATA/AWG format) for Aircraft, Engines, (Propeller if applicable)",
      },
      { id: "B017", name: "Internal/external structural repairs & allowable damage list + dent & buckle map" },
      { id: "B018", name: "Oils/fluids types used (airframe, engines, APU)" },
      { id: "B019", name: "Operator loadable software list (affecting aircraft operation/control)" },
      {
        id: "B020",
        name: "Operational capability evidence (RVSM, RNP, ETOPS, CAT, MNPS, FANS, 8.33, ADS-B, etc.)",
      },
      { id: "B021", name: "FDR report (parameters within limits after last commercial flight)" },
      { id: "B022", name: "AMP summary (intro pages, LDND list, MPD↔AMP cross-ref if applicable)" },
      { id: "B023", name: "CVR report (EASA OPS CAT IDE) after last commercial flight" },
    ],
  },
  {
    id: "C",
    name: "C — Aircraft Maintenance Records",
    subfolders: [
      { id: "C001", name: "CRS/Release to Service statements acceptable to next State of Registry" },
      {
        id: "C002",
        name: "Last complete cycle of A-Checks (or operator equivalent) with tally sheet & CRS (min. last 3 years)",
      },
      { id: "C003", name: "Last complete cycle of C-Checks (or operator equivalent) with tally sheet & CRS" },
      {
        id: "C004",
        name: "All major scheduled structural check packages (e.g., 6/12yr, 8/10/12yr, S4C/S8C), with tally & CRS",
      },
      { id: "C005", name: "CPCP/ISIP task cards (incl. corrosion level & rectification)" },
      {
        id: "C006",
        name: "Compliance files for each applicable Airframe/Appliance AD done on-wing (AD copy, EO/SB, certified task cards)",
      },
      { id: "C007", name: "Files for on-wing SBs (SB copy + certified task card; may be in Mod File)" },
      {
        id: "C008",
        name: "Files for non-OEM modifications (incl. STCs): substantiation data, approvals, DFP, RTU letter, manual supplements, ICA, LDND",
      },
      {
        id: "C009",
        name: "Structural repair/allowable damage maintenance data (embodiment instructions, ICA, approvals if outside SRM)",
      },
      { id: "C010", name: "Aircraft weight report (current configuration)" },
      { id: "C011", name: "Flight-control balance status (OEM data + latest certified task card, if applicable)" },
      { id: "C012", name: "Last Demonstration Flight report + tech log (if applicable)" },
      { id: "C013", name: "Compass Deviation report + certified task card (if applicable)" },
      { id: "C014", name: "Current hard-copy records inventory (if applicable)" },
    ],
  },
  {
    id: "D",
    name: "D — Configuration Status",
    subfolders: [
      { id: "D001", name: "LOPA drawing (incl. seat P/Ns)" },
      { id: "D002", name: "Galley drawings" },
      { id: "D003", name: "Emergency equipment drawing (items + P/Ns)" },
      { id: "D004", name: "Loose & galley equipment inventory" },
      { id: "D005", name: "Avionics units inventory (E&E bay) or in component listing" },
      { id: "D006", name: "Electrical Load Analysis (current, or original + supplements)" },
    ],
  },
  {
    id: "E",
    name: "E — Aircraft Manufacturer Records (as provided at delivery and not superseded)",
    subfolders: [
      { id: "E001", name: "CofA or Export CofA at manufacture (if applicable)" },
      { id: "E002", name: "ADs incorporated at manufacture (manufacturer report)" },
      { id: "E003", name: "Original component fitted listing (e.g., Airbus AIR / Boeing ARL)" },
      { id: "E004", name: "Repair/Alteration Report / Significant Repair Log" },
      { id: "E005", name: "Modifications incorporated at manufacture (manufacturer report)" },
      { id: "E006", name: "Service Difficulty Reports / Delivery Inspection Report (as applicable)" },
      { id: "E007", name: "Production Aircraft Test Completion Record" },
      { id: "E008", name: "Manufacture Flight Logs (hours/cycles)" },
      { id: "E009", name: "Aircraft Historical/Miscellaneous Log (Boeing)" },
      { id: "E010", name: "Landing Gear LLPs at manufacture (P/N, S/N), if not elsewhere" },
      { id: "E011", name: "Statement of eligible type certification" },
      { id: "E012", name: "Aircraft Weighing Report at manufacture (certified)" },
      { id: "E013", name: "Certificate of Conformance (if applicable)" },
      { id: "E014", name: "Production Flight Certificate (if applicable)" },
      { id: "E015", name: "Final Inspection Report (if applicable)" },
      { id: "E016", name: "Rigging Brochure (if applicable)" },
      { id: "E017", name: "Certificate of Sanitary Construction (if applicable)" },
      { id: "E018", name: "Detailed Specification / Technical Description (if applicable)" },
      { id: "E019", name: "Interior Finish Specification" },
      { id: "E020", name: "Customer Checklist Document (if applicable)" },
    ],
  },
  {
    id: "F",
    name: "F — Engine Records (separate folder per engine)",
    subfolders: [
      {
        id: "F001",
        name: "Manufacturer delivery docs (EDS, log book, test/perf summary, config listing, SB status at manufacture)",
      },
      { id: "F002", name: "Export CofA at manufacture (if applicable)" },
      { id: "F003", name: "Total Time in Service (hours/cycles) — certified" },
      { id: "F004", name: "Engine AD status (incl. applicability & MoC) — certified" },
      { id: "F005", name: "Engine manufacturer SB status — certified" },
      { id: "F006", name: "Non-manufacturer mods (incl. STCs) status — certified" },
      { id: "F007", name: "LLP listing (limits, since new, remaining) — certified" },
      { id: "F008", name: "Back-to-birth cycle substantiation for each LLP — certified" },
      { id: "F009", name: "All historical engine/module shop visit reports" },
      { id: "F010", name: "Condition Monitoring (current trend data)" },
      { id: "F011", name: "Engine logbook / master install & removal record" },
      { id: "F012", name: "Last borescope report (incl. video if required)" },
      { id: "F013", name: "Last test-cell report" },
      { id: "F014", name: "Last on-wing maximum power assurance ground run (if applicable)" },
      {
        id: "F015",
        name: "Engine incident/accident clearance (IATA/AWG or equivalent; if not covered by B016) — certified",
      },
      {
        id: "F016",
        name: "Power rating operation statement (cycles by thrust rating; may be in disc sheet/LLP tracking) — certified",
      },
      {
        id: "F017",
        name: "Specialist engine field-repair task cards since last shop (if applicable) — certified",
      },
      {
        id: "F018",
        name: "Fan blade distribution task cards (incl. P/N, S/N, moment weight) — certified",
      },
      {
        id: "F019",
        name: "Last inspection of installed engine mounts (task card; if required/if not in LDND) — certified",
      },
      { id: "F020", name: "HPT blade listing incl. TSN/CSN/TSO/CSO — certified" },
      { id: "F021", name: "Current OEM concessions (e.g., CDR/OTC/TV as applicable) — copy" },
      {
        id: "F022",
        name: "Engine component listing of serialized LRUs tracked by operator incl. TSN/CSN/TSO/CSO (if available) — certified",
      },
    ],
  },
  {
    id: "G",
    name: "G — APU",
    subfolders: [
      {
        id: "G001",
        name: "(i) Total Time in Service (hours/cycles) (ii) Ratio Aircraft Hours : APU Hours — certified",
      },
      { id: "G002", name: "APU AD status — certified" },
      { id: "G003", name: "APU manufacturer SB status — certified" },
      { id: "G004", name: "APU logbook / master install & removal record" },
      { id: "G005", name: "All shop visit reports back to last heavy SV (earlier SVs if available)" },
      {
        id: "G006",
        name: "LLP listing with limits/since new/remaining + back-to-birth substantiation if applicable — certified",
      },
      { id: "G007", name: "On-wing operational performance test task card (if applicable) — certified" },
      { id: "G008", name: "Last borescope report (incl. video if required by lease)" },
    ],
  },
  {
    id: "H",
    name: "H — Component Records",
    subfolders: [
      {
        id: "H001",
        name: "Authorized Release Certificate for each Time-Controlled Component per OEM class (incl. last overhaul/repair/test as applicable)",
      },
      {
        id: "H002",
        name: "Authorized Release Certificate for each operator-tracked component (subject to lease/regulatory oversight)",
      },
    ],
  },
  {
    id: "I",
    name: "I — Landing Gears (separate folder per gear)",
    subfolders: [
      { id: "I001", name: "OEM report of LLPs installed at manufacture (P/N, S/N) — for installed LG" },
      { id: "I002", name: "ARC from last overhaul of each major LG assembly" },
      { id: "I003", name: "LLP status per LG (limits/since new/remaining) — certified" },
      { id: "I004", name: "Last overhaul shop report" },
      { id: "I005", name: "Back-to-birth cycle substantiation for each LG LLP (per applicable OEM doc)" },
    ],
  },
  {
    id: "J",
    name: "J — Manuals (as applicable at EOL; redact proprietary operator data; OEM-sourced manuals excluded)",
    subfolders: [
      { id: "J001", name: "Airplane Flight Manual (incl. all acceptable supplements)" },
      { id: "J002", name: "Wiring Diagram Manual" },
      { id: "J003", name: "Illustrated Parts Catalogue" },
      { id: "J004", name: "Maintenance Manual" },
      { id: "J005", name: "System Schematics Manual" },
      { id: "J006", name: "Wire List & Hook-up charts" },
      { id: "J007", name: "Aircraft Operating Manual" },
      { id: "J008", name: "Quick Reference Handbook" },
      { id: "J009", name: "Weight & Balance Manual" },
      { id: "J010", name: "Power Plant Buildup Manual" },
      { id: "J011", name: "Structural Repair Manual" },
      { id: "J012", name: "Engine Maintenance Manual" },
      { id: "J013", name: "Engine Illustrated Parts Manual" },
      { id: "J014", name: "Master Minimum Equipment List" },
      { id: "J015", name: "Manufacturer's Maintenance Planning Document" },
      { id: "J016", name: "Dispatch Deviation Procedures Guide" },
      { id: "J017", name: "Manufacturer's Cabin Crew Operating Manual (if applicable)" },
      { id: "J018", name: "Passenger Seat manuals (CMM & IPC; subject to proprietary restrictions)" },
      { id: "J019", name: "Galley CMM" },
    ],
  },
  {
    id: "K",
    name: "K — Propellers (separate folder per propeller)",
    subfolders: [
      { id: "K001", name: "Total Time in Service (hours/cycles) — certified" },
      { id: "K002", name: "Propeller AD status (incl. applicability & MoC) — certified" },
      { id: "K003", name: "Manufacturer SB status — certified" },
      { id: "K004", name: "Non-manufacturer mods (incl. STCs) + approvals — certified" },
      { id: "K005", name: "Logbook / master install & removal record" },
      { id: "K006", name: "Time-Controlled Component / LLP listing (with applicable limitations) — certified" },
      { id: "K007", name: "Last overhaul shop report" },
      {
        id: "K008",
        name: "For each LLP: back-to-birth cycle substantiation; OR for each TCC: ARC + last overhaul/repair/test report",
      },
      {
        id: "K009",
        name: "Propeller incident/accident clearance for period with Lessee (IATA/AWG or equivalent; if not covered by B016) — certified",
      },
    ],
  },
]

const complianceCheckTemplates = [
  { id: "eo-compliance", name: "EO Compliance", description: "Engineering Order compliance verification" },
  { id: "man-hour", name: "Man Hour Validation", description: "Validate maintenance hours" },
  { id: "effectivity", name: "Effectivity Match", description: "Check part effectivity" },
  { id: "ad-compliance", name: "AD Compliance", description: "Airworthiness Directive compliance" },
  { id: "sb-compliance", name: "SB Compliance", description: "Service Bulletin compliance" },
  { id: "document-chain", name: "Document Chain", description: "Verify document dependencies" },
]

export default function CreateProjectPage() {
  const [selectedDataSource, setSelectedDataSource] = useState<string>("")
  const [projectUsers, setProjectUsers] = useState<Array<{ name: string; email: string; role: string; org: string }>>(
    [],
  )
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", org: "" })
  const [showCustomOrg, setShowCustomOrg] = useState(false)
  const [customOrg, setCustomOrg] = useState("")
  const [aircraftMode, setAircraftMode] = useState<"existing" | "new">("existing")
  const [selectedCompliance, setSelectedCompliance] = useState<Record<string, string[]>>({})
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [showNewComplianceForm, setShowNewComplianceForm] = useState<string | null>(null) // Now tracks which subfolder
  const [newCompliance, setNewCompliance] = useState({ name: "", description: "" })

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.role && newUser.org) {
      setProjectUsers([...projectUsers, newUser])
      setNewUser({ name: "", email: "", role: "", org: "" })
      setShowCustomOrg(false)
      setCustomOrg("")
    }
  }

  const removeUser = (index: number) => {
    setProjectUsers(projectUsers.filter((_, i) => i !== index))
  }

  const toggleComplianceCheck = (subfolderId: string, checkId: string) => {
    setSelectedCompliance((prev) => {
      const subfolderChecks = prev[subfolderId] || []
      const isSelected = subfolderChecks.includes(checkId)
      return {
        ...prev,
        [subfolderId]: isSelected ? subfolderChecks.filter((id) => id !== checkId) : [...subfolderChecks, checkId],
      }
    })
  }

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const addNewComplianceCheck = (subfolderId: string) => {
    if (newCompliance.name && newCompliance.description) {
      console.log("[v0] New compliance check for subfolder:", subfolderId, newCompliance)
      setNewCompliance({ name: "", description: "" })
      setShowNewComplianceForm(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
                <p className="text-sm text-gray-600">Set up a new aircraft redelivery project</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Notifications />
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                Project Details
              </CardTitle>
              <CardDescription>Basic information about the redelivery project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input id="project-name" placeholder="e.g., EFW A321-200 P2F Redelivery" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-date">Aircraft Delivery Date *</Label>
                  <Input id="delivery-date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-gray-900">Aircraft Information</CardTitle>
              <CardDescription>Select an existing aircraft or create a new one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex gap-4">
                <Button
                  variant={aircraftMode === "existing" ? "default" : "outline"}
                  onClick={() => setAircraftMode("existing")}
                  className={aircraftMode === "existing" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Select Existing Aircraft
                </Button>
                <Button
                  variant={aircraftMode === "new" ? "default" : "outline"}
                  onClick={() => setAircraftMode("new")}
                  className={aircraftMode === "new" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Aircraft
                </Button>
              </div>

              {aircraftMode === "existing" ? (
                <div className="space-y-2">
                  <Label htmlFor="aircraft-select">Select Aircraft *</Label>
                  <Select>
                    <SelectTrigger id="aircraft-select">
                      <SelectValue placeholder="Choose an aircraft..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7382">MSN 7382 - JA112A (A321)</SelectItem>
                      <SelectItem value="5421">MSN 5421 - N123AB (B737-800)</SelectItem>
                      <SelectItem value="8901">MSN 8901 - G-ABCD (A320)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="msn">MSN (Manufacturer Serial Number) *</Label>
                    <Input id="msn" placeholder="e.g., 7382" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration">Registration *</Label>
                    <Input id="registration" placeholder="e.g., JA112A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aircraft-type">Aircraft Type *</Label>
                    <Select>
                      <SelectTrigger id="aircraft-type">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a320">Airbus A320</SelectItem>
                        <SelectItem value="a321">Airbus A321</SelectItem>
                        <SelectItem value="b737">Boeing 737</SelectItem>
                        <SelectItem value="b777">Boeing 777</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Input id="variant" placeholder="e.g., A321-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tsn">TSN (Time Since New)</Label>
                    <Input id="tsn" placeholder="e.g., 16,635:51" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="csn">CSN (Cycles Since New)</Label>
                    <Input id="csn" placeholder="e.g., 14,538" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-gray-900">Parties & Terms</CardTitle>
              <CardDescription>Lease information and involved parties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lessee">Lessee *</Label>
                  <Input id="lessee" placeholder="e.g., ABC Airlines" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lessor">Lessor *</Label>
                  <Input id="lessor" placeholder="e.g., XYZ Leasing" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease-start">Lease Start Date</Label>
                  <Input id="lease-start" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease-end">End of Lease Date *</Label>
                  <Input id="lease-end" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                Data Source
              </CardTitle>
              <CardDescription>Choose how to import project documents</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                {dataSourceOptions.map((source) => {
                  const Icon = source.icon
                  return (
                    <button
                      key={source.id}
                      onClick={() => setSelectedDataSource(source.id)}
                      className={`p-6 border-2 rounded-lg text-left transition-all ${
                        selectedDataSource === source.id
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`h-10 w-10 mb-3 ${selectedDataSource === source.id ? "text-blue-600" : "text-gray-400"}`}
                      />
                      <h3
                        className={`font-semibold mb-1 ${selectedDataSource === source.id ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {source.name}
                      </h3>
                      <p className="text-sm text-gray-600">{source.description}</p>
                    </button>
                  )
                })}
              </div>

              {selectedDataSource && selectedDataSource !== "upload" && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Connection Settings
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="connection-url">Connection URL</Label>
                      <Input id="connection-url" placeholder="Enter connection URL..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-key">Access Key / Credentials</Label>
                      <Input id="access-key" type="password" placeholder="Enter credentials..." />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Test Connection
                  </Button>
                </div>
              )}

              {selectedDataSource === "upload" && (
                <div className="mt-6 p-12 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors bg-gray-50">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-2">Drag and drop files here</p>
                  <p className="text-sm text-gray-600 mb-4">or click to browse</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Files
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                Add Project Team Member
              </CardTitle>
              <CardDescription>Add users and assign their roles and privileges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="p-6 bg-gray-50 rounded-lg border space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  Add Project Team Member
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Name</Label>
                    <Select value={newUser.name} onValueChange={(value) => setNewUser({ ...newUser, name: value })}>
                      <SelectTrigger id="user-name">
                        <SelectValue placeholder="Select name..." />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMemberNames.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="john@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-org">Organization</Label>
                    {!showCustomOrg ? (
                      <Select
                        value={newUser.org}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setShowCustomOrg(true)
                            setNewUser({ ...newUser, org: "" })
                          } else {
                            setNewUser({ ...newUser, org: value })
                          }
                        }}
                      >
                        <SelectTrigger id="user-org">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypes.map((org) => (
                            <SelectItem key={org} value={org}>
                              {org}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">
                            <span className="flex items-center gap-2">
                              <Plus className="h-3 w-3" />
                              Add New Organization...
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter organization..."
                          value={customOrg}
                          onChange={(e) => {
                            setCustomOrg(e.target.value)
                            setNewUser({ ...newUser, org: e.target.value })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowCustomOrg(false)
                            setCustomOrg("")
                            setNewUser({ ...newUser, org: "" })
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger id="user-role">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addUser} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              {projectUsers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Team Members ({projectUsers.length})</h4>
                  <div className="space-y-2">
                    {projectUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white border rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-gray-300">
                            {user.org}
                          </Badge>
                          <Badge className="bg-blue-600">{user.role}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUser(index)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 rounded-lg bg-blue-100">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                Compliance Checks Configuration
              </CardTitle>
              <CardDescription>Select compliance checks to run on each subfolder's documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                {iataFoldersWithSubfolders.map((folder) => (
                  <div key={folder.id} className="border rounded-lg bg-white">
                    {/* Main Folder Header */}
                    <button
                      onClick={() => toggleFolder(folder.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-t-lg"
                    >
                      <div className="flex items-center gap-3">
                        {expandedFolders[folder.id] ? (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-600" />
                        )}
                        <FolderOpen className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">{folder.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {folder.subfolders.length} subfolders
                      </Badge>
                    </button>

                    {/* Subfolders */}
                    {expandedFolders[folder.id] && (
                      <div className="border-t bg-gray-50/50">
                        {folder.subfolders.map((subfolder) => (
                          <div key={subfolder.id} className="border-b last:border-b-0">
                            <div className="p-4 bg-white">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-2 flex-1">
                                  <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm text-gray-900">{subfolder.name}</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">{subfolder.id}</p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setShowNewComplianceForm(
                                      showNewComplianceForm === subfolder.id ? null : subfolder.id,
                                    )
                                  }
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  New Check
                                </Button>
                              </div>

                              {/* New Compliance Check Form for this subfolder */}
                              {showNewComplianceForm === subfolder.id && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
                                  <h6 className="text-xs font-semibold text-gray-900">Create New Compliance Check</h6>
                                  <div className="space-y-2">
                                    <div className="space-y-1">
                                      <Label htmlFor={`compliance-name-${subfolder.id}`} className="text-xs">
                                        Check Name
                                      </Label>
                                      <Input
                                        id={`compliance-name-${subfolder.id}`}
                                        placeholder="e.g., Part Number Validation"
                                        value={newCompliance.name}
                                        onChange={(e) => setNewCompliance({ ...newCompliance, name: e.target.value })}
                                        className="h-8 text-xs"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor={`compliance-desc-${subfolder.id}`} className="text-xs">
                                        Description
                                      </Label>
                                      <Textarea
                                        id={`compliance-desc-${subfolder.id}`}
                                        placeholder="Describe what this check validates..."
                                        value={newCompliance.description}
                                        onChange={(e) =>
                                          setNewCompliance({ ...newCompliance, description: e.target.value })
                                        }
                                        className="h-16 text-xs resize-none"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => addNewComplianceCheck(subfolder.id)}
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 h-7 text-xs"
                                    >
                                      Add Check
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setShowNewComplianceForm(null)}
                                      className="h-7 text-xs"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Compliance Check Options */}
                              <div className="grid grid-cols-2 gap-2">
                                {complianceCheckTemplates.map((check) => (
                                  <div
                                    key={check.id}
                                    className="flex items-start space-x-2 p-2 rounded hover:bg-gray-50 transition-colors"
                                  >
                                    <Checkbox
                                      id={`${subfolder.id}-${check.id}`}
                                      checked={selectedCompliance[subfolder.id]?.includes(check.id) || false}
                                      onCheckedChange={() => toggleComplianceCheck(subfolder.id, check.id)}
                                      className="mt-0.5"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <label
                                        htmlFor={`${subfolder.id}-${check.id}`}
                                        className="text-xs font-medium text-gray-900 cursor-pointer block leading-tight"
                                      >
                                        {check.name}
                                      </label>
                                      <p className="text-[10px] text-gray-600 mt-0.5 leading-tight">
                                        {check.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pb-8">
            <Link href="/projects">
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Sparkles className="mr-2 h-5 w-5" />
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
