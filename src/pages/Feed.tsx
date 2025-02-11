
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface Story {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  date: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

const sampleStories: Story[] = [
  {
    id: 1,
    author: "Priya Singh",
    avatar: "/placeholder.svg",
    content: "After filing a complaint about frequent power outages in our area through this platform, the electricity board took notice and fixed the underlying infrastructure issues. Now we have stable power supply!",
    likes: 45,
    comments: [
      {
        id: 1,
        author: "Rahul Kumar",
        avatar: "/placeholder.svg",
        content: "This is great news! We faced similar issues in our locality.",
        date: "2024-02-15",
      },
    ],
    date: "2024-02-14",
  },
  {
    id: 2,
    author: "Amit Patel",
    avatar: "/placeholder.svg",
    content: "Successfully resolved a banking dispute through this platform. The bank responded within 48 hours and reversed the unauthorized transaction.",
    likes: 32,
    comments: [],
    date: "2024-02-13",
  },
];

const Feed = () => {
  const [stories, setStories] = useState<Story[]>(sampleStories);
  const [newStory, setNewStory] = useState("");
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  const handlePostStory = () => {
    if (!newStory.trim()) return;

    const story: Story = {
      id: stories.length + 1,
      author: "Anonymous User",
      avatar: "/placeholder.svg",
      content: newStory,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split("T")[0],
    };

    setStories([story, ...stories]);
    setNewStory("");
    toast({
      title: "Story Posted",
      description: "Your story has been shared successfully!",
    });
  };

  const handlePostComment = (storyId: number) => {
    if (!commentText[storyId]?.trim()) return;

    const comment: Comment = {
      id: Math.random(),
      author: "Anonymous User",
      avatar: "/placeholder.svg",
      content: commentText[storyId],
      date: new Date().toISOString().split("T")[0],
    };

    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          comments: [...story.comments, comment],
        };
      }
      return story;
    }));

    setCommentText({ ...commentText, [storyId]: "" });
    toast({
      title: "Comment Posted",
      description: "Your comment has been added successfully!",
    });
  };

  const handleLike = (storyId: number) => {
    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          likes: story.likes + 1,
        };
      }
      return story;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 animate-slideUp">Community Stories</h1>

        {/* Post Story Form */}
        <Card className="p-6 mb-8 animate-fadeIn">
          <Textarea
            placeholder="Share your story or experience..."
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handlePostStory}>Post Story</Button>
        </Card>

        {/* Stories Feed */}
        <div className="space-y-6">
          {stories.map((story) => (
            <Card key={story.id} className="p-6 hover:shadow-lg transition-all duration-300 animate-fadeIn">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <img src={story.avatar} alt={story.author} />
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{story.author}</h3>
                  <p className="text-sm text-gray-500">{story.date}</p>
                </div>
              </div>

              <p className="mb-4 text-gray-700 dark:text-gray-300">{story.content}</p>

              <div className="flex items-center space-x-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(story.id)}
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>{story.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{story.comments.length}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                {story.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4 pl-8 pt-4 border-t">
                    <Avatar>
                      <img src={comment.avatar} alt={comment.author} />
                    </Avatar>
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <h4 className="font-semibold">{comment.author}</h4>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                ))}

                <div className="flex space-x-2 pl-8">
                  <Input
                    placeholder="Write a comment..."
                    value={commentText[story.id] || ""}
                    onChange={(e) => setCommentText({
                      ...commentText,
                      [story.id]: e.target.value,
                    })}
                  />
                  <Button onClick={() => handlePostComment(story.id)}>Comment</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
