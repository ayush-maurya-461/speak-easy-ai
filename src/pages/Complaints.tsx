import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const sampleComplaints = [
  {
    id: 1,
    title: "Frequent Network Disruptions",
    department: "telecom",
    organization: "Jio",
    status: "resolved",
    date: "2024-02-01",
    description: "Experiencing frequent call drops and internet connectivity issues.",
    userId: "user123",
  },
  {
    id: 2,
    title: "Unauthorized Transaction",
    department: "banking",
    organization: "HDFC Bank",
    status: "in-progress",
    date: "2024-02-02",
    description: "Found an unauthorized transaction of ₹5000 in my account.",
    userId: "user123",
  },
  {
    id: 3,
    title: "Flight Cancellation Without Notice",
    department: "airlines",
    organization: "Air India",
    status: "pending",
    date: "2024-02-03",
    description: "Flight was cancelled without any prior notice or compensation.",
    userId: "user123",
  },
];

const Complaints = () => {
  const currentUserId = "user123";
  const userComplaints = sampleComplaints.filter(complaint => complaint.userId === currentUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary animate-slideUp">My Complaints</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center animate-fadeIn bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-primary mb-2">1,234</h3>
            <p className="text-gray-600">Total Complaints</p>
          </Card>
          <Card className="p-6 text-center animate-fadeIn bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-success mb-2">987</h3>
            <p className="text-gray-600">Resolved</p>
          </Card>
          <Card className="p-6 text-center animate-fadeIn bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-accent mb-2">247</h3>
            <p className="text-gray-600">In Progress</p>
          </Card>
        </div>

        <Card className="p-6 mb-8 animate-fadeIn bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Search</Label>
              <Input placeholder="Search complaints..." className="w-full" />
            </div>
            <div>
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="telecom">Telecom</SelectItem>
                  <SelectItem value="airlines">Airlines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {userComplaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-fadeIn bg-white dark:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{complaint.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {complaint.organization} • {complaint.date}
                  </p>
                </div>
                <Badge
                  className={`
                    ${complaint.status === "resolved" && "bg-success"}
                    ${complaint.status === "in-progress" && "bg-primary"}
                    ${complaint.status === "pending" && "bg-accent"}
                  `}
                >
                  {complaint.status === "resolved" && <CheckCircle className="w-4 h-4 mr-1" />}
                  {complaint.status === "in-progress" && <Clock className="w-4 h-4 mr-1" />}
                  {complaint.status === "pending" && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </Badge>
              </div>
              <p className="text-gray-600">{complaint.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
