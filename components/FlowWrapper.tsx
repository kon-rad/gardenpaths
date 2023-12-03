"use client";

import { Edge, Node, Position, ReactFlowProvider } from "reactflow";
import React, { useCallback, useState } from "react";
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

const nodeSize = {
  width: 100,
  height: 40,
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
  const fixedX = 200;

  const [latestY, setLatestY] = useState(0);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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

  const addTriNode = () => {
    const xOffset = 100; // Define an offset for the X coordinate

    for (let i = 0; i < 3; i++) {
      const y = latestY + 100;
      const x = fixedX + i * xOffset; // Add an offset to the X coordinate based on the index
      const newNode = {
        id: (nodes.length + i + 1).toString(),
        data: { label: `Node ${nodes.length + i + 1}` },
        position: { x, y },
        // Add any other properties you need for the node
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setLatestY(y); // Update the latest Y coordinate
    }
  };
  return (
    <div className="w-[580px] h-[560px]">
      <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
        <ReactFlow
          nodes={nodes}
          edges={edgesWithUpdatedTypes}
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
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWrapper;
