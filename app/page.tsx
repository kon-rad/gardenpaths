'use client';

import Image from "next/image";

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
import "tailwindcss/tailwind.css";

import { Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import styles from './page.module.css';
import Flow from '../components/Flow';

const nodeSize = {
  width: 100,
  height: 40,
};

const initialNodes: Node[] = [ ];
const initialEdges: Edge[] = [ ];
// this example uses some v12 features that are not released yet
// const initialNodes: Node[] = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Node 1' },
//     position: { x: 250, y: 5 },
//     size: nodeSize,
//     handles: [
//       {
//         type: 'source',
//         position: 'bottom' as Position,
//         x: nodeSize.width * 0.5,
//         y: nodeSize.height,
//         width: 1,
//         height: 1,
//       },
//     ],
//   },
//   {
//     id: '2',
//     data: { label: 'Node 2' },
//     position: { x: 100, y: 100 },
//     size: nodeSize,
//     handles: [
//       {
//         type: 'source',
//         position: 'bottom' as Position,
//         x: nodeSize.width * 0.5,
//         y: nodeSize.height,
//         width: 1,
//         height: 1,
//       },
//       {
//         type: 'target',
//         position: 'top' as Position,
//         x: nodeSize.width * 0.5,
//         y: 0,
//         width: 1,
//         height: 1,
//       },
//     ],
//   },
//   {
//     id: '3',
//     data: { label: 'Node 3' },
//     position: { x: 400, y: 100 },
//     size: nodeSize,
//     handles: [
//       {
//         type: 'source',
//         position: 'bottom' as Position,
//         x: nodeSize.width * 0.5,
//         y: nodeSize.height,
//         width: 1,
//         height: 1,
//       },
//       {
//         type: 'target',
//         position: 'top' as Position,
//         x: nodeSize.width * 0.5,
//         y: 0,
//         width: 1,
//         height: 1,
//       },
//     ],
//   },
// ];

// const initialEdges: Edge[] = [
//   { id: 'e1-2', source: '1', target: '2', animated: true },
//   { id: 'e1-3', source: '1', target: '3', animated: true },
// ];

async function fetchData(): Promise<{ nodes: Node[]; edges: Edge[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nodes: initialNodes, edges: initialEdges });
    }, 1000);
  });
}

const Home = () => {
  
  const { nodes, edges } = await fetchData();
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
                  <CardDescription>this is where the garden is</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                 
      <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
        <Flow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
                </CardContent>
                <CardFooter>
                  <Button>Generate Text</Button>
                </CardFooter>
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
