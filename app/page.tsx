"use client";

import React from "react";
import EditorWrapper from "@/components/EditorWrapper";
import EditorMenu from "@/components/EditorMenu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FlowWrapper from "@/components/FlowWrapper";
import "tailwindcss/tailwind.css";

const Home = () => {
  return (
    <div className="flex flex-col h-screen items-center mb-10">
      <div className="w-full max-w-screen-lg mt-12">
        <h1 className="text-4xl font-extrabold lg:text-5xl">Garden Paths</h1>
        <p className="mt-6 mb-12">
          Tool for non-linear exploration of thoughts for story writing.
        </p>
      </div>
      <div className="flex justify-center items-center mb-20 w-full  max-w-screen-xl">
        <div className="w-1/2 h-full m-4">
          <EditorMenu />
          <EditorWrapper />
        </div>
        <div className="w-1/2 h-full m-4">
          <Tabs defaultValue="account" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="garden">Garden</TabsTrigger>
              <TabsTrigger value="ai-chat">Ai Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="garden" className=" h-full">
              <Card className=" h-full">
                <CardHeader>
                  <CardTitle>Garden</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FlowWrapper />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai-chat">
              <Card className=" h-full">
                <CardHeader>
                  <CardTitle>Ai Chat</CardTitle>
                  <CardDescription>
                    Here is a group of Ai review.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  This is the content
                </CardContent>
                <CardFooter>
                  <Button>chat n ow</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
