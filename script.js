document.addEventListener("DOMContentLoaded", async () => {
    // JSONデータを読み込む
    const response = await fetch('./graph.json');
    const data = await response.json();
  
    // Cytoscape初期化
    const cy = cytoscape({
      container: document.getElementById("graph-container"), // グラフを描画するコンテナ
      elements: [
        ...data.nodes.map(node => ({
          data: { id: node.id, label: node.title, state: node.state, image: node.image, info: node.info }
        })),
        ...data.edges.map(edge => ({
          data: { source: edge.source, target: edge.target, strength: edge.strength }
        }))
      ],
      style: [
        {
          selector: "node",
          style: {
            "shape": "rectangle",
            "width": "100",
            "height": "141",
            "background-image": "data(image)",
            "background-fit": "contain",
            "border-color": "#007acc",
            "border-width": 2,
            "label": "data(label)",
            "text-valign": "bottom",
            "text-halign": "center",
            "font-size": 12,
            "text-margin-y": -5
          }
        },
        // stateがunpurchasedの場合
        {
          selector: 'node[state="unpurchased"]',
          style: {
            'border-color': 'gray'
          }
        },
        // stateがunreadの場合
        {
          selector: 'node[state="unread"]',
          style: {
            'border-color': 'red'
          }
        },
        // stateがfinishedの場合
        {
          selector: 'node[state="finished"]',
          style: {
            'border-color': 'green'
          }
        },
        {
          selector: "edge",
          style: {
            "width": 2,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle"
          }
        }
      ],
      layout: {
        name: "cose", // 力学レイアウト
        edgeElasticity: function(edge) {
            return edge.data("strength") || 1; // strength属性で強さを調整
        },
        animate: true
      }
    });
  
    // ツールチップの表示
    const tooltip = document.getElementById("tooltip");
    cy.on("mouseover", "node", event => {
      const node = event.target;
      const info = node.data("info");
  
      tooltip.style.display = "block";
      tooltip.innerHTML = info;
    });
  
    cy.on("mousemove", event => {
      tooltip.style.top = `${event.renderedPosition.y + 10}px`;
      tooltip.style.left = `${event.renderedPosition.x + 10}px`;
    });
  
    cy.on("mouseout", "node", () => {
      tooltip.style.display = "none";
    });
  });