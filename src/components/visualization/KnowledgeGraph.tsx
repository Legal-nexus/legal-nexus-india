
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as d3 from "d3";
import { LegalCase } from "@/lib/mockData";

interface KnowledgeGraphProps {
  caseData: LegalCase;
}

// Define interfaces with proper d3 simulation compatibility
interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  group: string;
  radius?: number;
  // These properties are added by d3 during simulation
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  type: string;
}

const KnowledgeGraph = ({ caseData }: KnowledgeGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Create nodes and links for the graph
    const nodes: Node[] = [
      { id: caseData.id, label: caseData.title, group: "case", radius: 25 }
    ];
    
    const links: Link[] = [];
    
    // Add statute nodes and links
    caseData.statutes.forEach((statute, index) => {
      const id = `statute-${index}`;
      nodes.push({ id, label: statute, group: "statute", radius: 15 });
      links.push({ source: caseData.id, target: id, type: "cites" });
    });
    
    // Add precedent nodes and links
    caseData.precedents.forEach((precedent, index) => {
      const id = `precedent-${index}`;
      nodes.push({ id, label: precedent, group: "precedent", radius: 20 });
      links.push({ source: caseData.id, target: id, type: "follows" });
    });
    
    // Add principle nodes and links
    caseData.principles.forEach((principle, index) => {
      const id = `principle-${index}`;
      nodes.push({ id, label: principle, group: "principle", radius: 17 });
      links.push({ source: caseData.id, target: id, type: "establishes" });
    });
    
    // Add judge nodes and links
    caseData.judges.forEach((judge, index) => {
      const id = `judge-${index}`;
      nodes.push({ id, label: judge, group: "judge", radius: 18 });
      links.push({ source: caseData.id, target: id, type: "decided_by" });
    });
    
    // Set up the SVG and force simulation
    const width = svgRef.current.clientWidth;
    const height = 400;
    
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);
    
    // Define color scale for different node types
    const color = d3.scaleOrdinal<string>()
      .domain(["case", "statute", "precedent", "principle", "judge"])
      .range(["#1e3a8a", "#047857", "#7e22ce", "#b7953f", "#be123c"]);
    
    // Create force simulation
    const simulation = d3.forceSimulation<Node>()
      .nodes(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody<Node>().strength(-300))
      .force("center", d3.forceCenter<Node>(width / 2, height / 2))
      .force("collide", d3.forceCollide<Node>().radius(d => (d.radius || 10) + 5));
    
    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", d => d.type === "cites" ? "5,5" : null);
    
    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseover", function() {
        d3.select(this).select("circle").transition()
          .duration(300)
          .attr("stroke-width", 2);
      })
      .on("mouseout", function() {
        d3.select(this).select("circle").transition()
          .duration(300)
          .attr("stroke-width", 1);
      });
    
    // Add circles to nodes
    node.append("circle")
      .attr("r", d => d.radius || 10)
      .attr("fill", d => color(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);
    
    // Add labels to nodes
    node.append("text")
      .attr("dx", d => (d.radius || 10) + 4)
      .attr("dy", ".35em")
      .attr("font-size", "10px")
      .text(d => {
        const maxLength = 25;
        return d.label.length > maxLength ? d.label.slice(0, maxLength) + "..." : d.label;
      })
      .style("pointer-events", "none")
      .each(function(d) {
        const bbox = (this as SVGTextElement).getBBox();
        node.filter(n => n === d).insert("rect", "text")
          .attr("x", bbox.x - 2)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 4)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("fill-opacity", 0.7);
      });
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(20, 20)`);
    
    const legendEntries = [
      { group: "case", label: "Case" },
      { group: "statute", label: "Statute" },
      { group: "precedent", label: "Precedent" },
      { group: "principle", label: "Principle" },
      { group: "judge", label: "Judge" }
    ];
    
    legendEntries.forEach((entry, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`);
      
      legendRow.append("circle")
        .attr("r", 6)
        .attr("fill", color(entry.group));
      
      legendRow.append("text")
        .attr("x", 12)
        .attr("y", 4)
        .attr("font-size", "10px")
        .text(entry.label);
    });
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x || 0)
        .attr("y1", d => (d.source as Node).y || 0)
        .attr("x2", d => (d.target as Node).x || 0)
        .attr("y2", d => (d.target as Node).y || 0);
      
      node.attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`);
    });
    
    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
  }, [caseData]);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Knowledge Graph Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Interactive visualization showing connections between the case, statutes, precedents, principles, and judges.
          Drag nodes to explore relationships.
        </p>
        <div className="border rounded-md bg-gray-50 p-2">
          <svg ref={svgRef} className="w-full"></svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeGraph;
