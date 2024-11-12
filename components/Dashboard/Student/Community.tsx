'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp, Share2, Filter } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { useToast } from '@/components/ui/use-toast';

interface CommunityPost {
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  type: 'discussion' | 'question' | 'resource';
  tags: string[];
  likes: string[];
  comments: {
    author: string;
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

const Community: React.FC<{ userId: string }> = ({ userId }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "community"] | order(createdAt desc) {
            _id,
            title,
            description,
            author->{
              name,
              avatar
            },
            type,
            tags,
            likes,
            comments,
            createdAt
          }
        `);
        setPosts(result);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to load community posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handleLike = async (postId: string) => {
    try {
      await client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .append('likes', [userId])
        .commit();

      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: [...post.likes, userId] }
          : post
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Community</h2>
        <Button>Create Post</Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          Posted by {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {post.type}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post._id)}
                      className={post.likes.includes(userId) ? 'text-blue-600' : ''}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {post.likes.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {post.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Add other TabsContent components for different post types */}
      </Tabs>
    </div>
  );
};

export default Community; 