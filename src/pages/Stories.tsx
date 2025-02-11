import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Send,
  ImagePlus,
} from "lucide-react";

interface Story {
  id: string;
  content: string;
  image?: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  supported: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const Stories = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newComment, setNewComment] = useState("");
  const [activeCommentStory, setActiveCommentStory] = useState<string | null>(null);

  const handlePostStory = () => {
    if (!newStory.trim()) {
      toast({
        title: "Error",
        description: "Please write something to post",
        variant: "destructive",
      });
      return;
    }

    const story: Story = {
      id: Date.now().toString(),
      content: newStory,
      author: "Anonymous User", // In real app, this would come from auth
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments: [],
      supported: false,
    };

    setStories([story, ...stories]);
    setNewStory("");
    setSelectedImage(null);
    
    toast({
      title: "Success",
      description: "Your story has been posted!",
    });
  };

  const handleSupport = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId
          ? { ...story, supported: !story.supported }
          : story
      )
    );
    
    toast({
      title: "Success",
      description: "Thank you for your support!",
    });
  };

  const handleAddComment = (storyId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Anonymous User", // In real app, this would come from auth
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setStories(
      stories.map((story) =>
        story.id === storyId
          ? { ...story, comments: [...story.comments, comment] }
          : story
      )
    );

    setNewComment("");
    setActiveCommentStory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Create Post Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <ImagePlus className="mr-2" />
                Add Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
              <Button onClick={handlePostStory}>Post Story</Button>
            </div>
          </div>
        </Card>

        {/* Stories Feed */}
        <div className="space-y-6">
          {stories.map((story) => (
            <Card key={story.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{story.author}</h3>
                  <p className="text-sm text-gray-500">{story.timestamp}</p>
                </div>
              </div>
              <p className="mb-4">{story.content}</p>
              {story.image && (
                <img
                  src={story.image}
                  alt="Story"
                  className="rounded-lg mb-4 max-h-96 w-full object-cover"
                />
              )}
              <div className="flex gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSupport(story.id)}
                  className={story.supported ? "text-primary" : ""}
                >
                  <ThumbsUp className="mr-2" />
                  Support
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCommentStory(story.id)}
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
              {story.comments.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Comments</h4>
                  <div className="space-y-2">
                    {story.comments.map((comment) => (
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
              {activeCommentStory === story.id && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    size="icon"
                    onClick={() => handleAddComment(story.id)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
