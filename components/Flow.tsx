'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow';

import 'reactflow/dist/style.css';

export default function App({
  nodes: initNodes,
  edges: initEdges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const [nodes, setNodes] = useState<Node[]>(initNodes);
  const [edges, setEdges] = useState<Edge[]>(initEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes((nds) => applyNodeChanges(chs, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      setEdges((eds) => applyEdgeChanges(chs, eds));
    },
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      // Add any other properties you need for the node
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ width: '500px', height: '500px', border: 'solid 1px black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
      <button onClick={addNode}>Add Node</button>
    </div>
  );
}
