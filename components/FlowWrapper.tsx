"use client";

import { useKeyPress, useNodeId } from "reactflow";
import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
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
  width: 400,
  height: 80,
};

const nodeTypes = {};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log("flow loaded:", reactFlowInstance);

const FlowWrapper = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const fixedX = 200;
  const {
    paths,
    setPaths,
    doc,
    setDoc,
    setRefreshEditor,
    selectedNodes,
    setSelectedNodes,
    setActiveLayer,
  } = useGlobalState();

  const reactFlow = useReactFlow();

  const [latestX, setLatestX] = useState(0);
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
      updateNewLayer(nodes[nodes.length - 3]);
    }
  }, [cmdAndUPressed, nodes]);

  React.useEffect(() => {
    if (cmdAndJPressed) {
      setSelectedNode(nodes[nodes.length - 2].id);
      updateNewLayer(nodes[nodes.length - 2]);
    }
  }, [cmdAndJPressed, nodes]);

  React.useEffect(() => {
    if (cmdAndKPressed) {
      setSelectedNode(nodes[nodes.length - 1].id);
      updateNewLayer(nodes[nodes.length - 1]);
    }
  }, [cmdAndKPressed, nodes]);
  useEffect(() => {
    console.log("paths: ", paths);
    if (paths.length > 0) {
      addNewNodes(paths[paths.length - 1]);
    }
  }, [paths]);
  // useEffect(() => {
  //   recenterView();
  // }, [nodes]);

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

    // use active layer to replace or add on to nodes
    for (let i = 0; i < newPaths.length; i++) {
      // set correct coordinates
      const x = latestX + (!isSelected ? 0 : 500);
      const y = 100 + i * 100; // Add an offset to the X coordinate based on the index
      const newNodeId = (nodes.length + i + (!isSelected ? 0 : 1)).toString();
      const newNode = {
        id: newNodeId,
        data: { label: `${newPaths[i]}` },
        position: { x, y },
        sourcePosition: "right",
        targetPosition: "left",
        style: {
          width: nodeSize.width,
          height: nodeSize.height,
          radius: "8px",
          fontSize: "14px",
          // backgroundColor: selectedNodex[i] ? 'green' : 'transparent'
        },
      };
      setNodes((prevNodes: any) => {
        if (isSelected) {
          return [...prevNodes, newNode];
        }
        const currNodeIndex = prevNodes.length - 3 + i;
        const currNodes = [...prevNodes];
        currNodes[currNodeIndex] = newNode;
        return currNodes;
      });

      if (nodes.length > 0) {
        // Add an edge from the new node to the center node from the previous layer
        const newEdge = {
          id: "e" + newNodeId + "-" + prevCenterNodeId,
          source: prevCenterNodeId,
          target: newNodeId,
        };
        //
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
      setLatestX(x); // Update the latest Y coordinate
      setIsSelected(false);
      recenterView();
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
  const updateNewLayer = (node: any) => {
    console.log("Clicked node:", node.data.label);
    setDoc({
      content: doc.content + node.data.label,
    });
    // update the activeLayer
    //
    // setActiveLayer
    setIsSelected(true);
    console.log("Clicked event:", event);
    setRefreshEditor(`${Math.random() * 10000000}`);
  };
  console.log("render nodes: ", nodes);

  const recenterView = () => {
    if (nodes.length > 0) {
      const centerNode = nodes[nodes.length - 2];
      const x = centerNode.position.x;
      const y = centerNode.position.y;
      reactFlow.setCenter(x, y, { duration: 500 });
      reactFlow.zoomOut(1);
    }
  };

  return (
    <ReactFlow
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
  );
};

export default FlowWrapper;
