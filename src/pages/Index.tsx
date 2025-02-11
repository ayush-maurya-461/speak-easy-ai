
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const Index = () => {
  const [step, setStep] = useState<"categories" | "form">("categories");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { toast } = useToast();

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
  };

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
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
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
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="Your email address"
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
