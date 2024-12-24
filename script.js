document.addEventListener("DOMContentLoaded", () => {
    // データ
    const nodes = [
      { id: "1", title: "ノード1", image: "./assets/4798157198.jpg", info: "追加情報1: 詳細A, 詳細B" },
      { id: "2", title: "ノード2", image: "./assets/4798157198.jpg", info: "追加情報2: 詳細X, 詳細Y" },
      { id: "3", title: "ノード3", image: "./assets/4798157198.jpg", info: "追加情報3: 詳細P, 詳細Q" }
    ];
    const edges = [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "3" }
    ];
  
    // Cytoscape初期化
    const cy = cytoscape({
      container: document.getElementById("graph-container"), // グラフを描画するコンテナ
      elements: [
        ...nodes.map(node => ({
          data: { id: node.id, label: node.title, image: node.image, info: node.info }
        })),
        ...edges.map(edge => ({
          data: { source: edge.source, target: edge.target }
        }))
      ],
      style: [
        {
          selector: "node",
          style: {
            "shape": "rectangle",
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