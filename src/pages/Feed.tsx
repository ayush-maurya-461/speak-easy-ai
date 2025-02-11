import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  MessageCircle,
  Share2,
  ThumbsUp,
  Send,
  ImagePlus,
  Building2,
  ArrowUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Complaint {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  timestamp: string;
  department: string;
  organization: string;
  supportCount: number;
  comments: Comment[];
  status: 'pending' | 'reviewing' | 'resolved';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const departmentOptions = [
  "Banking",
  "Airlines",
  "Healthcare",
  "Telecom",
  "Entertainment",
  "Government",
  "Insurance",
  "Finance",
  "Retail",
  "Technology",
];

const dummyComplaints: Complaint[] = [
  {
    id: "1",
    title: "Delayed Flight Compensation Not Received",
    content: "My flight AI-102 was delayed by 6 hours on January 15th, 2024. Despite multiple follow-ups, I haven't received any compensation or proper response from the airline.",
    author: "Rahul Sharma",
    timestamp: "2024-02-11 14:30",
    department: "Airlines",
    organization: "Air India",
    supportCount: 245,
    comments: [
      {
        id: "c1",
        author: "Priya Singh",
        content: "I faced a similar issue last month. Try reaching out to their customer care on Twitter.",
        timestamp: "2024-02-11 15:00"
      }
    ],
    status: 'pending'
  },
  {
    id: "2",
    title: "Bank Account Debited Without Authorization",
    content: "₹15,000 was debited from my account without my authorization on February 8th. Bank's customer service is not responding to my complaints.",
    author: "Amit Patel",
    timestamp: "2024-02-10 09:15",
    department: "Banking",
    organization: "State Bank of India",
    supportCount: 389,
    comments: [
      {
        id: "c2",
        author: "Banking Expert",
        content: "Please file a dispute immediately and contact the banking ombudsman.",
        timestamp: "2024-02-10 10:00"
      }
    ],
    status: 'reviewing'
  },
  {
    id: "3",
    title: "Defective Mobile Phone Delivery",
    content: "Received a defective mobile phone from online purchase. Screen was cracked upon delivery but the delivery agent left before inspection.",
    author: "Sneha Kumar",
    timestamp: "2024-02-09 16:45",
    department: "Retail",
    organization: "FlipKart",
    supportCount: 156,
    comments: [],
    status: 'pending'
  }
];

// Generate more dummy complaints
const generateMoreComplaints = () => {
  const departments = ["Banking", "Airlines", "Healthcare", "Telecom", "Retail"];
  const organizations = {
    Banking: ["SBI", "HDFC", "ICICI", "Axis Bank"],
    Airlines: ["Air India", "IndiGo", "SpiceJet", "Vistara"],
    Healthcare: ["Apollo", "Fortis", "Max", "Medanta"],
    Telecom: ["Airtel", "Jio", "Vi", "BSNL"],
    Retail: ["Amazon", "Flipkart", "Myntra", "Meesho"]
  };
  const statuses: ("pending" | "reviewing" | "resolved")[] = ["pending", "reviewing", "resolved"];
  
  return Array.from({ length: 17 }, (_, i) => {
    const department = departments[Math.floor(Math.random() * departments.length)];
    const organization = organizations[department as keyof typeof organizations][
      Math.floor(Math.random() * organizations[department as keyof typeof organizations].length)
    ];
    
    return {
      id: (i + 4).toString(),
      title: `${department} Service Issue #${i + 1}`,
      content: `Detailed complaint about ${organization}'s service issues. Customer service was unresponsive and the issue remains unresolved for several days.`,
      author: `User${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      department,
      organization,
      supportCount: Math.floor(Math.random() * 500),
      comments: Math.random() > 0.5 ? [
        {
          id: `c${i + 4}`,
          author: `Commenter${i + 1}`,
          content: "Thank you for raising this issue. I've faced similar problems.",
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleString()
        }
      ] : [],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  });
};

const Feed = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    content: "",
    department: "",
    organization: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeCommentComplaint, setActiveCommentComplaint] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Initialize with dummy data
    setComplaints([...dummyComplaints, ...generateMoreComplaints()]);

    // Add scroll listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePostComplaint = () => {
    if (!newComplaint.title.trim() || !newComplaint.content.trim() || !newComplaint.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const complaint: Complaint = {
      id: Date.now().toString(),
      title: newComplaint.title,
      content: newComplaint.content,
      department: newComplaint.department,
      organization: newComplaint.organization,
      author: "Anonymous User", // In real app, this would come from auth
      timestamp: new Date().toLocaleString(),
      supportCount: 0,
      comments: [],
      status: 'pending',
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({
      title: "",
      content: "",
      department: "",
      organization: "",
    });
    setSelectedImage(null);
    
    toast({
      title: "Success",
      description: "Your complaint has been posted! We'll look into it.",
    });
  };

  const handleSupport = (complaintId: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, supportCount: complaint.supportCount + 1 }
          : complaint
      )
    );
    
    toast({
      title: "Support Added",
      description: "Thank you for supporting this complaint!",
    });
  };

  const handleAddComment = (complaintId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Anonymous User", // In real app, this would come from auth
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, comments: [...complaint.comments, comment] }
          : complaint
      )
    );

    setNewComment("");
    setActiveCommentComplaint(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Create Complaint Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <div className="space-y-4">
            <Input
              placeholder="Title of your complaint"
              value={newComplaint.title}
              onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
            />
            <Select
              value={newComplaint.department}
              onValueChange={(value) => setNewComplaint({ ...newComplaint, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((dept) => (
                  <SelectItem key={dept} value={dept.toLowerCase()}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Organization Name"
              value={newComplaint.organization}
              onChange={(e) => setNewComplaint({ ...newComplaint, organization: e.target.value })}
            />
            <Textarea
              placeholder="Describe your complaint in detail..."
              value={newComplaint.content}
              onChange={(e) => setNewComplaint({ ...newComplaint, content: e.target.value })}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <ImagePlus className="mr-2" />
                Add Evidence (Image)
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
              <Button onClick={handlePostComplaint}>Submit Complaint</Button>
            </div>
          </div>
        </Card>

        {/* Feed Section Title */}
        <h2 className="text-2xl font-bold mb-6">Recent Complaints</h2>

        {/* Complaints Feed */}
        <div className="space-y-6">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{complaint.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{complaint.author}</span>
                    <span>•</span>
                    <span>{complaint.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm text-gray-600">
                      {complaint.department} - {complaint.organization}
                    </span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                  {complaint.status}
                </div>
              </div>
              <p className="mb-4 whitespace-pre-wrap">{complaint.content}</p>
              {complaint.image && (
                <img
                  src={complaint.image}
                  alt="Evidence"
                  className="rounded-lg mb-4 max-h-96 w-full object-cover"
                />
              )}
              <div className="flex gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSupport(complaint.id)}
                >
                  <ThumbsUp className="mr-2" />
                  Support ({complaint.supportCount})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCommentComplaint(complaint.id)}
                >
                  <MessageCircle className="mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2" />
                  Share
                </Button>
              </div>
              
              {/* Comments Section */}
              {complaint.comments.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Comments</h4>
                  <div className="space-y-2">
                    {complaint.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Comment */}
              {activeCommentComplaint === complaint.id && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    size="icon"
                    onClick={() => handleAddComment(complaint.id)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            className="fixed bottom-8 right-8 rounded-full p-3 bg-primary text-white shadow-lg hover:bg-primary/90"
            size="icon"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Feed;
