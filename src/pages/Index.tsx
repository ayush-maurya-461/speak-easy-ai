
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Building2,
  Plane,
  Stethoscope,
  Phone,
  Film,
  Building,
  HelpCircle,
  Share2,
  Shield,
  Landmark,
  ShoppingBag,
  Laptop,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const departmentIcons = {
  banking: <Building2 className="w-6 h-6" />,
  airlines: <Plane className="w-6 h-6" />,
  healthcare: <Stethoscope className="w-6 h-6" />,
  telecom: <Phone className="w-6 h-6" />,
  entertainment: <Film className="w-6 h-6" />,
  government: <Building className="w-6 h-6" />,
  insurance: <Shield className="w-6 h-6" />,
  finance: <Landmark className="w-6 h-6" />,
  retail: <ShoppingBag className="w-6 h-6" />,
  technology: <Laptop className="w-6 h-6" />,
};

const organizationsByDepartment = {
  banking: ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Other"],
  airlines: ["Air India", "IndiGo", "SpiceJet", "Vistara", "Go First", "Other"],
  healthcare: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta", "AIIMS", "Other"],
  telecom: ["Jio", "Airtel", "Vi", "BSNL", "MTNL", "Other"],
  entertainment: ["Netflix", "Amazon Prime", "Disney+ Hotstar", "Sony LIV", "ZEE5", "Other"],
  government: ["Central Government", "State Government", "Municipal Corporation", "Police Department", "Other"],
  insurance: ["LIC", "HDFC Life", "SBI Life", "ICICI Prudential", "Max Life", "Other"],
  finance: ["SEBI", "RBI", "IRDA", "PFRDA", "Other"],
  retail: ["Amazon", "Flipkart", "Myntra", "Nykaa", "Meesho", "Other"],
  technology: ["Google", "Microsoft", "Apple", "Samsung", "Other"],
};

const predefinedCategories = {
  banking: ["Account Issues", "Card Problems", "Online Banking", "Loans", "KYC", "Other"],
  airlines: ["Flight Delays", "Baggage Issues", "Refunds", "Booking Problems", "Customer Service", "Other"],
  healthcare: ["Treatment Quality", "Billing Issues", "Appointment Problems", "Staff Behavior", "Facilities", "Other"],
  telecom: ["Network Issues", "Billing Problems", "Service Quality", "Plan Changes", "Customer Support", "Other"],
  entertainment: ["Streaming Issues", "Billing Problems", "Content Quality", "Technical Support", "Account Issues", "Other"],
  government: ["Service Delays", "Corruption", "Documentation", "Infrastructure", "Public Services", "Other"],
  insurance: ["Claim Issues", "Policy Problems", "Premium Related", "Agent Behavior", "Documentation", "Other"],
  finance: ["Investment Issues", "Market Manipulation", "Fraud", "Regulatory Compliance", "Other"],
  retail: ["Product Quality", "Delivery Issues", "Refund Problems", "Customer Service", "Other"],
  technology: ["Product Issues", "Service Quality", "Technical Support", "Billing Problems", "Other"],
};

const Index = () => {
  const [step, setStep] = useState<"landing" | "categories" | "form">("landing");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate visitor count - in real app, this would come from analytics
    setVisitorCount(Math.floor(Math.random() * 10000) + 5000);
  }, []);

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    setStep("form");
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted Successfully",
      description: "We'll process your complaint and get back to you soon.",
    });
    setStep("categories");
  };

  if (step === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-6xl font-bold mb-6 animate-fadeIn">Speak Up India</h1>
            <p className="text-2xl mb-8 animate-slideUp">Your Voice Matters. We Make It Heard.</p>
            <Button
              size="lg"
              onClick={() => setStep("categories")}
              className="animate-float bg-white text-primary hover:bg-white/90"
            >
              File a Complaint <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center animate-fadeIn hover:shadow-lg transition-all">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">{visitorCount.toLocaleString()}</h3>
                <p className="text-gray-600">Platform Visitors</p>
              </Card>
              <Card className="p-6 text-center animate-fadeIn hover:shadow-lg transition-all">
                <CheckCircle className="w-12 h-12 mx-auto text-success mb-4" />
                <h3 className="text-2xl font-bold mb-2">95%</h3>
                <p className="text-gray-600">Resolution Rate</p>
              </Card>
              <Card className="p-6 text-center animate-fadeIn hover:shadow-lg transition-all">
                <Building className="w-12 h-12 mx-auto text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p className="text-gray-600">Organizations</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-violet-50 to-violet-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Speak Up?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <AlertTriangle className="w-8 h-8 text-primary" />,
                  title: "Quick Resolution",
                  description: "Get your complaints resolved faster with our AI-powered system",
                },
                {
                  icon: <Shield className="w-8 h-8 text-primary" />,
                  title: "Secure Platform",
                  description: "Your data is protected with enterprise-grade security",
                },
                {
                  icon: <Share2 className="w-8 h-8 text-primary" />,
                  title: "Easy Sharing",
                  description: "Share your complaints across social media platforms",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fadeIn">Ready to Make Your Voice Heard?</h2>
            <p className="text-xl mb-8 animate-slideUp">Join thousands of citizens in making India better.</p>
            <Button
              size="lg"
              onClick={() => setStep("categories")}
              className="animate-float bg-white text-primary hover:bg-white/90"
            >
              File a Complaint Now
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="animate-slideUp">
              <h1 className="text-3xl font-bold">Speak Up</h1>
              <p className="mt-2 text-white/80">Your Voice Matters</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link to="/">Home</Link>
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link to="/about">About</Link>
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link to="/complaints">View Complaints</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {step === "categories" ? (
          <>
            <div className="text-center mb-12 animate-slideUp">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Voice Your Concerns
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Select a department to file your complaint. We ensure your voice is heard
                and addressed properly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Object.entries(departmentIcons).map(([dept, icon], index) => (
                <Card
                  key={dept}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white/80 backdrop-blur-sm animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleDepartmentSelect(dept)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary animate-float">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{dept}</h3>
                      <p className="text-muted-foreground text-sm">
                        File complaints related to {dept}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto animate-fadeIn">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => setStep("categories")}
            >
              ← Back to Categories
            </Button>

            <Card className="p-8 shadow-lg bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-primary">
                <AlertTriangle className="mr-2 text-accent" />
                File a Complaint
              </h2>

              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select
                    value={selectedOrganization}
                    onValueChange={setSelectedOrganization}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationsByDepartment[selectedDepartment as keyof typeof organizationsByDepartment]?.map(
                        (org) => (
                          <SelectItem key={org} value={org}>
                            {org}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Complaint Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedCategories[selectedDepartment as keyof typeof predefinedCategories]?.map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of your complaint"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide all relevant details of your complaint"
                    className="min-h-[150px] transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachments (if any)</Label>
                  <Input
                    id="attachment"
                    type="file"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="Your email address"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Submit Complaint
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="animate-fadeIn">© 2024 Speak Up. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
