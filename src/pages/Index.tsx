
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const departmentIcons = {
  banking: <Building2 className="w-6 h-6" />,
  airlines: <Plane className="w-6 h-6" />,
  healthcare: <Stethoscope className="w-6 h-6" />,
  telecom: <Phone className="w-6 h-6" />,
  entertainment: <Film className="w-6 h-6" />,
  government: <Building className="w-6 h-6" />,
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
    // Here we'll later integrate AI for complaint processing
    toast({
      title: "Complaint Submitted Successfully",
      description: "We'll process your complaint and get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      {/* Header */}
      <header className="bg-primary py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Speak Up</h1>
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {step === "categories" ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Voice Your Concerns
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Select a department to file your complaint. We ensure your voice is heard
                and addressed properly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(departmentIcons).map(([dept, icon]) => (
                <Card
                  key={dept}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleDepartmentSelect(dept)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-muted rounded-full">{icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{dept}</h3>
                      <p className="text-secondary text-sm">
                        File complaints related to {dept}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => setStep("categories")}
            >
              ← Back to Categories
            </Button>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <AlertTriangle className="mr-2 text-accent" />
                File a Complaint
              </h2>

              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of your complaint"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide all relevant details of your complaint"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Complaint
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto mt-4 sm:mt-0"
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
      <footer className="bg-primary text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Speak Up. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
