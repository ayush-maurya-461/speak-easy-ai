
import { Card } from "@/components/ui/card";
import { Users, Award, Shield, Laptop } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slideUp">
          <h1 className="text-4xl font-bold text-primary mb-4">About Speak Up</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering citizens to voice their concerns and drive positive change in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To create a transparent and efficient platform where every citizen's voice
              matters. We believe in the power of collective action to bring about
              positive change in society.
            </p>
          </Card>

          <Card className="p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become India's most trusted platform for citizen grievance redressal,
              fostering accountability and transparency across all sectors.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Users className="w-12 h-12 text-primary" />,
              title: "User-Centric",
              description: "Built with users in mind, ensuring a seamless experience",
            },
            {
              icon: <Award className="w-12 h-12 text-primary" />,
              title: "Excellence",
              description: "Committed to maintaining the highest standards",
            },
            {
              icon: <Shield className="w-12 h-12 text-primary" />,
              title: "Security",
              description: "Your data is protected with enterprise-grade security",
            },
            {
              icon: <Laptop className="w-12 h-12 text-primary" />,
              title: "Innovation",
              description: "Leveraging AI to provide better solutions",
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 mb-12 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4">How We Work</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Our AI-powered platform processes complaints and ensures they reach the
              right department. We track the status of each complaint and keep users
              updated throughout the resolution process.
            </p>
            <p className="text-gray-600">
              We work with various organizations across sectors to ensure quick
              resolution of complaints. Our platform provides analytics and insights
              to help organizations improve their services.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
