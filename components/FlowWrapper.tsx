"use client";

import {
  Edge,
  Node,
  Position,
  ReactFlowProvider,
  useKeyPress,
  useNodeId,
} from "reactflow";
import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import "reactflow/dist/style.css";
import { space } from "postcss/lib/list";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/lib/contexts/GlobalState";

const nodeSize = {
  width: 300,
  height: 80,
};

const nodeTypes = {};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const FlowWrapper = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const fixedX = 200;
  const { paths, setPaths, doc, setDoc, setRefreshEditor } = useGlobalState();

  const [latestY, setLatestY] = useState(0);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const cmdAndUPressed = useKeyPress(["Meta+u", "Strg+u"]);
  const cmdAndJPressed = useKeyPress(["Meta+j", "Strg+j"]);
  const cmdAndKPressed = useKeyPress(["Meta+k", "Strg+k"]);

  React.useEffect(() => {
    if (cmdAndUPressed) {
      setSelectedNode(nodes[nodes.length - 3].id);
    }
  }, [cmdAndUPressed, nodes]);

  React.useEffect(() => {
    if (cmdAndJPressed) {
      setSelectedNode(nodes[nodes.length - 2].id);
    }
  }, [cmdAndJPressed, nodes]);

  React.useEffect(() => {
    if (cmdAndKPressed) {
      setSelectedNode(nodes[nodes.length - 1].id);
    }
  }, [cmdAndKPressed, nodes]);
  useEffect(() => {
    console.log("paths: ", paths);
    if (paths.length > 0) {
      addNewNodes(paths[paths.length - 1]);
    }
  }, [paths]);

  // const cmdAndUPressed = useKeyPress(["Meta+u", "Strg+u"]);
  // const cmdAndJPressed = useKeyPress(["Meta+j", "Strg+j"]);
  // const cmdAndKPressed = useKeyPress(["Meta+k", "Strg+k"]);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  const getPrevCenterNodeId = () => {
    if (nodes.length < 2) {
      // If there are less than 2 nodes, return null or a default value
      return null;
    }

    // Get the center node from the previous layer
    // const prevCenterNode = nodes[nodes.length - 2];

    // return prevCenterNode.id;
    return selectedNode;
  };

  const addNewNodes = (newPaths: string[]) => {
    console.log("addNewNodes: ", newPaths);

    if (!newPaths || newPaths.length === 0) return;
    const xOffset = 100; // Define an offset for the X coordinate
    const prevCenterNodeId = getPrevCenterNodeId(); // Function to get the ID of the center node from the previous layer

    for (let i = 0; i < newPaths.length; i++) {
      const y = latestY + 100;
      const x = 100 + i * 400; // Add an offset to the X coordinate based on the index
      const newNodeId = (nodes.length + i + 1).toString();
      const newNode = {
        id: newNodeId,
        data: { label: `${newPaths[i]}` },
        position: { x, y },
        style: { width: nodeSize.width, height: nodeSize.height },
        // Add any other properties you need for the node
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);

      if (nodes.length > 0) {
        // Add an edge from the new node to the center node from the previous layer
        const newEdge = {
          id: "e" + newNodeId + "-" + prevCenterNodeId,
          source: prevCenterNodeId,
          target: newNodeId,
          // sourceHandle: 'bottom', // The edge starts from the bottom of the source node
          // targetHandle: 'top', // The edge ends at the top of the target node
          // Add any other properties you need for the edge
        };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
      setLatestY(y); // Update the latest Y coordinate
    }
  };
  const addTriNode = () => {
    const xOffset = 100; // Define an offset for the X coordinate
    const prevCenterNodeId = getPrevCenterNodeId(); // Function to get the ID of the center node from the previous layer

    for (let i = 0; i < 3; i++) {
      const y = latestY + 200;
      const x = 100 + i * 400; // Add an offset to the X coordinate based on the index
      const newNodeId = (nodes.length + i + 1).toString();
      const newNode = {
        id: newNodeId,
        data: { label: `Node ${nodes.length + i + 1}` },
        position: { x, y },
        style: { width: nodeSize.width, height: nodeSize.height },
        // Add any other properties you need for the node
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);

      if (nodes.length > 0) {
        // Add an edge from the new node to the center node from the previous layer
        const newEdge = {
          id: "e" + newNodeId + "-" + prevCenterNodeId,
          source: prevCenterNodeId,
          target: newNodeId,
          // sourceHandle: 'bottom', // The edge starts from the bottom of the source node
          // targetHandle: 'top', // The edge ends at the top of the target node
          // Add any other properties you need for the edge
        };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
      setLatestY(y); // Update the latest Y coordinate
    }
  };

  // Define the function to handle node click events
  const onNodeClick: OnNodeClickFunc = (event, node) => {
    console.log("Clicked node:", node.data.label);
    setDoc({
      content: doc.content + node.data.label,
    });
    console.log("Clicked event:", event);
    setRefreshEditor(`${Math.random() * 10000000}`);
    // You can handle the click event here, such as updating state or triggering actions
  };

  return (
    <div className="w-[580px] h-[560px]">
      <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
        <ReactFlow
          // nodes={nodes}
          nodes={nodes.map((node) => ({
            ...node,
            style:
              node.id === selectedNode
                ? { ...node.style, background: "green" }
                : node.style,
          }))}
          edges={edgesWithUpdatedTypes}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
        >
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <button onClick={addTriNode}>Add Tri Node</button>
        <div>
          {cmdAndUPressed && <p>{nodes[nodes.length - 3].id}</p>}
          {cmdAndJPressed && <p>{nodes[nodes.length - 2].id}</p>}
          {cmdAndKPressed && <p>{nodes[nodes.length - 1].id}</p>}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWrapper;
