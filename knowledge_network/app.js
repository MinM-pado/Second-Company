/**
 * Knowledge Network Live - Interactive Engine & Visualizer
 */

// Sample Knowledge Network Data representing Second-Company AI system
const knowledgeData = {
  nodes: [
    {
      id: "agent_youtube",
      title: "🤖 유튜브 채널 통합 분석 에이전트",
      category: "agent",
      icon: "🎥",
      subtitle: "트렌드 탐지 및 댓글 자동 수집",
      summary: [
        "유튜브 알고리즘 트렌드 키워드를 실시간 수집 및 스나이핑합니다.",
        "경쟁 채널의 댓글 반응과 시청자 피드백 심층 감성 분석을 수행합니다.",
        "자동 콘텐츠 기획 브리프 문서를 생성하여 작가 에이전트에 전달합니다."
      ],
      path: "_company/_agents/youtube/prompt.md",
      x: 350, y: 180
    },
    {
      id: "agent_secretary",
      title: "🤖 만능 일정/비서 에이전트",
      category: "agent",
      icon: "🗓️",
      subtitle: "일정 관리 및 텔레그램 연동",
      summary: [
        "구글 캘린더 일정 등록 및 업데이트를 자동으로 처리합니다.",
        "중요한 AI 워크플로우 이벤트 발생 시 텔레그램 알림을 발송합니다.",
        "에이전트 간 업무 전달 일정과 데드라인을 추적 및 모니터링합니다."
      ],
      path: "_company/_agents/secretary/prompt.md",
      x: 680, y: 150
    },
    {
      id: "agent_writer",
      title: "🤖 콘텐츠 스크립트 작가 에이전트",
      category: "agent",
      icon: "✍️",
      subtitle: "유튜브 대본 및 카드뉴스 생성",
      summary: [
        "리서치 자료를 바탕으로 고몰입 영상 스크립트 초안을 작성합니다.",
        "시청 이탈률을 줄이기 위한 초반 5초 후킹 요소를 자동 삽입합니다.",
        "SEO 최적화 제목 및 설명란 문구를 생성합니다."
      ],
      path: "_company/_agents/writer/prompt.md",
      x: 180, y: 340
    },
    {
      id: "agent_developer",
      title: "🤖 웹/PWA 시스템 개발자 에이전트",
      category: "agent",
      icon: "💻",
      subtitle: "웹 서비스 빌드 및 린트 검사",
      summary: [
        "Vite, PWA 등 현대적인 웹 프론트엔드 환경을 자동 구축합니다.",
        "코드 린트 검사 및 실시간 웹 프리뷰 환경을 가동합니다.",
        "자동화 패키지 적용 및 컴포넌트 라이브러리를 통합합니다."
      ],
      path: "_company/_agents/developer/prompt.md",
      x: 820, y: 380
    },
    {
      id: "doc_competitor",
      title: "📄 경쟁사 분석 프레임워크 v2",
      category: "doc",
      icon: "📊",
      subtitle: "AI Office 경쟁 채널 벤치마킹",
      summary: [
        "타겟 시장 상위 5개 경쟁사 핵심 지표와 전략 비교표 제공",
        "유튜브 조회수 급상승 패턴 및 후킹 키워드 표준 가이드",
        "AI 에이전트가 자동 참조하는 표준 프레임워크 문서"
      ],
      path: "_company/_agents/researcher/tools.md",
      x: 480, y: 300
    },
    {
      id: "doc_knowledge_base",
      title: "📄 30년 노하우 지식 베이스",
      category: "doc",
      icon: "📚",
      subtitle: "AI 회사 핵심 축적 자산",
      summary: [
        "회사 설립 및 수많은 프로젝트 성공 패턴의 템플릿 집합체",
        "에이전트 답변 생성 시 RAG 기반으로 연동되는 1차 참조 지식",
        "지식 활용 비율(Knowledge Utilization) 80% 이상 유지 기준"
      ],
      path: "_shared/goals.md",
      x: 520, y: 480
    },
    {
      id: "tool_trend_sniper",
      title: "⚡ 트렌드 스나이퍼 모듈",
      category: "tool",
      icon: "🎯",
      subtitle: "실시간 급상승 키워드 추출",
      summary: [
        "유튜브 및 SNS 실시간 인기 급상승 검색어 자동 캡처",
        "조회수 대비 구독자 급증 채널 알고리즘 탐지 툴",
        "유튜브 에이전트의 주력 수집 자동화 모듈"
      ],
      path: "_company/_agents/youtube/tools/trend_sniper.py",
      x: 140, y: 140
    },
    {
      id: "tool_comment_harvester",
      title: "⚡ 댓글 수집 & 감성 분석기",
      category: "tool",
      icon: "💬",
      subtitle: "시청자 피드백 자동 추출",
      summary: [
        "영상별 주요 댓글 1,000개 이상 자동 수집 및 분류",
        "긍정/부정/질문 요소를 AI 파서로 자동 구조화",
        "다음 콘텐츠 주제 아이디어 창출 데이터 제공"
      ],
      path: "_company/_agents/youtube/tools/comment_harvester.py",
      x: 420, y: 50
    },
    {
      id: "tool_google_calendar",
      title: "⚡ 구글 캘린더 자동 연동기",
      category: "tool",
      icon: "📅",
      subtitle: "일정 자동 쓰기 & 읽기 API",
      summary: [
        "Google Calendar API v3 연동 모듈",
        "비서 에이전트 요청 시 일정 자동 캘린더 할당",
        "알림 및 리마인더 푸시 전송"
      ],
      path: "_company/_agents/secretary/tools/google_calendar_write.py",
      x: 880, y: 180
    },
    {
      id: "framework_seo",
      title: "📊 SEO 스코어링 & 후킹 모델",
      category: "framework",
      icon: "📈",
      subtitle: "검색 노출 최적화 산출식",
      summary: [
        "알고리즘 노출 확률을 계산하는 점수 산출 알고리즘",
        "대본 작성 시 키워드 밀도 및 가독성 척도 자동 검증",
        "유튜브 & 포스팅 타이틀 스코어 매핑"
      ],
      path: "_company/_shared/agent_models.json",
      x: 280, y: 490
    },
    {
      id: "tool_pwa_setup",
      title: "⚡ PWA 자동 빌더 & 린터",
      category: "tool",
      icon: "🛠️",
      subtitle: "프론트엔드 자동화 도구",
      summary: [
        "웹 앱 템플릿 소스 자동 생성 및 아이콘 매니페스트 구축",
        "코드 오류 자동 점검(Lint) 및 프리뷰 웹 서버 구동",
        "개발자 에이전트 전용 빌드 툴킷"
      ],
      path: "_company/_agents/developer/tools/pwa_setup.py",
      x: 760, y: 520
    }
  ],
  edges: [
    { source: "tool_trend_sniper", target: "agent_youtube", label: "데이터 전송", type: "data" },
    { source: "tool_comment_harvester", target: "agent_youtube", label: "데이터 전송", type: "data" },
    { source: "agent_youtube", target: "doc_competitor", label: "참조 및 갱신", type: "reference" },
    { source: "agent_youtube", target: "agent_writer", label: "기획 브리프 전달", type: "dependency" },
    { source: "agent_writer", target: "framework_seo", label: "모델 참조", type: "reference" },
    { source: "agent_writer", target: "doc_knowledge_base", label: "지식 RAG 검색", type: "reference" },
    { source: "agent_secretary", target: "tool_google_calendar", label: "실행 제어", type: "dependency" },
    { source: "agent_youtube", target: "agent_secretary", label: "일정 등록 요청", type: "dependency" },
    { source: "agent_developer", target: "tool_pwa_setup", label: "툴킷 구동", type: "dependency" },
    { source: "agent_developer", target: "doc_knowledge_base", label: "표준 규칙 참조", type: "reference" }
  ]
};

// Application State
const state = {
  currentView: 'network',
  currentCategory: 'all',
  searchQuery: '',
  selectedNodeId: null,
  nodes: [...knowledgeData.nodes],
  edges: [...knowledgeData.edges],
  zoom: 1,
  pan: { x: 0, y: 0 },
  isDraggingCanvas: false,
  dragStart: { x: 0, y: 0 },
  draggingNodeId: null
};

// DOM Elements
const elements = {
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  viewBtns: document.querySelectorAll('.view-btn'),
  pillBtns: document.querySelectorAll('.pill-btn'),
  viewPanels: document.querySelectorAll('.view-panel'),
  
  // SVG Elements
  svg: document.getElementById('network-svg'),
  viewport: document.getElementById('network-viewport'),
  linksGroup: document.getElementById('network-links-group'),
  labelsGroup: document.getElementById('network-labels-group'),
  nodesGroup: document.getElementById('network-nodes-group'),

  // Controls
  btnZoomIn: document.getElementById('btn-zoom-in'),
  btnZoomOut: document.getElementById('btn-zoom-out'),
  btnResetView: document.getElementById('btn-reset-view'),

  // Side Panel Elements
  sidePanel: document.getElementById('side-panel'),
  panelClose: document.getElementById('panel-close'),
  panelCategory: document.getElementById('panel-category'),
  panelIcon: document.getElementById('panel-icon'),
  panelTitle: document.getElementById('panel-title'),
  panelSummaryList: document.getElementById('panel-summary-list'),
  panelConnectionsList: document.getElementById('panel-connections-list'),
  panelConnCount: document.getElementById('panel-conn-count'),
  panelPath: document.getElementById('panel-path'),
  btnCopyPath: document.getElementById('btn-copy-path'),
  btnFocusNode: document.getElementById('btn-focus-node'),

  // Counter Elements
  countAll: document.getElementById('count-all'),
  countAgent: document.getElementById('count-agent'),
  countDoc: document.getElementById('count-doc'),
  countTool: document.getElementById('count-tool'),
  countFramework: document.getElementById('count-framework'),
  statEdges: document.getElementById('stat-edges'),

  // Containers
  mindmapTree: document.getElementById('mindmap-tree'),
  listBody: document.getElementById('list-body')
};

// Initialize Application
function init() {
  updateCounts();
  setupEventListeners();
  renderNetworkGraph();
  renderMindmap();
  renderListView();
  
  // Default select first node
  selectNode("agent_youtube");
}

// Update category count badges
function updateCounts() {
  const counts = { all: state.nodes.length, agent: 0, doc: 0, tool: 0, framework: 0 };
  state.nodes.forEach(n => {
    if (counts[n.category] !== undefined) counts[n.category]++;
  });

  elements.countAll.textContent = counts.all;
  elements.countAgent.textContent = counts.agent;
  elements.countDoc.textContent = counts.doc;
  elements.countTool.textContent = counts.tool;
  elements.countFramework.textContent = counts.framework;
  elements.statEdges.textContent = state.edges.length;
}

// Setup Event Listeners
function setupEventListeners() {
  // View Switcher
  elements.viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchView(view);
    });
  });

  // Category Filter Pills
  elements.pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Search Input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    if (state.searchQuery) {
      elements.searchClear.classList.remove('hidden');
    } else {
      elements.searchClear.classList.add('hidden');
    }
    applyFilters();
  });

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.add('hidden');
    applyFilters();
  });

  // Zoom & Pan Controls
  elements.btnZoomIn.addEventListener('click', () => zoom(1.2));
  elements.btnZoomOut.addEventListener('click', () => zoom(0.8));
  elements.btnResetView.addEventListener('click', resetView);

  // SVG Pan & Drag
  elements.svg.addEventListener('mousedown', onCanvasMouseDown);
  window.addEventListener('mousemove', onCanvasMouseMove);
  window.addEventListener('mouseup', onCanvasMouseUp);
  elements.svg.addEventListener('wheel', onCanvasWheel);

  // Side Panel Controls
  elements.panelClose.addEventListener('click', closeSidePanel);
  elements.btnCopyPath.addEventListener('click', copyFilePath);
  elements.btnFocusNode.addEventListener('click', () => {
    if (state.selectedNodeId) {
      const node = state.nodes.find(n => n.id === state.selectedNodeId);
      if (node) focusNodeLocation(node);
    }
  });
}

// Switch Active View
function switchView(viewName) {
  state.currentView = viewName;
  elements.viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === viewName));
  elements.viewPanels.forEach(p => p.classList.toggle('active', p.id === `view-${viewName}`));
}

// Filter Logic
function applyFilters() {
  const filteredNodes = state.nodes.filter(n => {
    const matchCategory = state.currentCategory === 'all' || n.category === state.currentCategory;
    const matchSearch = !state.searchQuery || 
      n.title.toLowerCase().includes(state.searchQuery) ||
      n.subtitle.toLowerCase().includes(state.searchQuery) ||
      n.summary.some(s => s.toLowerCase().includes(state.searchQuery));
    return matchCategory && matchSearch;
  });

  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

  // Update Network SVG Visibility
  document.querySelectorAll('.graph-node-group').forEach(group => {
    const nodeId = group.dataset.id;
    group.style.opacity = filteredNodeIds.has(nodeId) ? '1' : '0.15';
  });

  document.querySelectorAll('.graph-link').forEach(link => {
    const sourceId = link.dataset.source;
    const targetId = link.dataset.target;
    const visible = filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId);
    link.style.opacity = visible ? '0.6' : '0.05';
  });

  document.querySelectorAll('.link-label-group').forEach(label => {
    const sourceId = label.dataset.source;
    const targetId = label.dataset.target;
    const visible = filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId);
    label.style.opacity = visible ? '1' : '0.05';
  });

  // Re-render List View
  renderListView(filteredNodes);
}

// Render SVG Network Graph
function renderNetworkGraph() {
  elements.linksGroup.innerHTML = '';
  elements.labelsGroup.innerHTML = '';
  elements.nodesGroup.innerHTML = '';

  // Render Links
  state.edges.forEach(edge => {
    const sourceNode = state.nodes.find(n => n.id === edge.source);
    const targetNode = state.nodes.find(n => n.id === edge.target);

    if (!sourceNode || !targetNode) return;

    // Curved Path
    const dx = targetNode.x - sourceNode.x;
    const dy = targetNode.y - sourceNode.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${sourceNode.x} ${sourceNode.y} A ${dr} ${dr} 0 0 1 ${targetNode.x} ${targetNode.y}`);
    path.setAttribute("class", `graph-link link-${edge.type}`);
    path.setAttribute("stroke", getCategoryColor(sourceNode.category));
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("marker-end", `url(#arrow-${sourceNode.category})`);
    path.dataset.source = edge.source;
    path.dataset.target = edge.target;

    elements.linksGroup.appendChild(path);

    // Link Label Badge
    const midX = (sourceNode.x + targetNode.x) / 2;
    const midY = (sourceNode.y + targetNode.y) / 2 - 12;

    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    labelGroup.setAttribute("class", "link-label-group");
    labelGroup.dataset.source = edge.source;
    labelGroup.dataset.target = edge.target;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", midX - 35);
    rect.setAttribute("y", midY - 9);
    rect.setAttribute("width", "70");
    rect.setAttribute("height", "18");
    rect.setAttribute("class", "link-label-bg");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", midX);
    text.setAttribute("y", midY);
    text.setAttribute("class", "link-label-text");
    text.textContent = `[${edge.label}]`;

    labelGroup.appendChild(rect);
    labelGroup.appendChild(text);
    elements.labelsGroup.appendChild(labelGroup);
  });

  // Render Nodes as Cards
  state.nodes.forEach(node => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", `graph-node-group node-${node.category}`);
    g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
    g.dataset.id = node.id;

    // Node Container Rect (Width: 200, Height: 50, Centered offset -100, -25)
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "-100");
    rect.setAttribute("y", "-25");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "50");
    rect.setAttribute("class", "node-card-rect");

    // Icon Circle/Square
    const iconBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    iconBg.setAttribute("x", "-90");
    iconBg.setAttribute("y", "-18");
    iconBg.setAttribute("width", "36");
    iconBg.setAttribute("height", "36");
    iconBg.setAttribute("class", "node-icon-bg");

    const iconText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    iconText.setAttribute("x", "-72");
    iconText.setAttribute("y", "5");
    iconText.setAttribute("text-anchor", "middle");
    iconText.setAttribute("font-size", "18");
    iconText.textContent = node.icon;

    // Title Text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "-44");
    titleText.setAttribute("y", "-4");
    titleText.setAttribute("class", "node-text-title");
    titleText.textContent = truncateText(node.title.replace(/^[^\s]+\s/, ''), 14);

    // Subtitle Text
    const subText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    subText.setAttribute("x", "-44");
    subText.setAttribute("y", "14");
    subText.setAttribute("class", "node-text-sub");
    subText.textContent = truncateText(node.subtitle, 16);

    g.appendChild(rect);
    g.appendChild(iconBg);
    g.appendChild(iconText);
    g.appendChild(titleText);
    g.appendChild(subText);

    // Click Event
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      selectNode(node.id);
    });

    elements.nodesGroup.appendChild(g);
  });

  updateTransform();
}

// Select Node & Update Side Detail Summary Panel
function selectNode(nodeId) {
  state.selectedNodeId = nodeId;
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;

  // Highlight Node in SVG
  document.querySelectorAll('.graph-node-group').forEach(group => {
    group.classList.toggle('selected', group.dataset.id === nodeId);
  });

  // Populate Side Panel
  elements.panelCategory.textContent = getCategoryName(node.category);
  elements.panelCategory.style.backgroundColor = getCategoryColor(node.category);
  elements.panelCategory.style.color = '#ffffff';

  elements.panelIcon.textContent = node.icon;
  elements.panelTitle.textContent = node.title;
  elements.panelPath.textContent = node.path;

  // Render 3-line summary
  elements.panelSummaryList.innerHTML = node.summary.map(s => `<li>${s}</li>`).join('');

  // Find Connections
  const connectedEdges = state.edges.filter(e => e.source === nodeId || e.target === nodeId);
  elements.panelConnCount.textContent = connectedEdges.length;

  elements.panelConnectionsList.innerHTML = connectedEdges.map(edge => {
    const isSource = edge.source === nodeId;
    const targetId = isSource ? edge.target : edge.source;
    const targetNode = state.nodes.find(n => n.id === targetId);
    if (!targetNode) return '';

    return `
      <div class="tag-item" onclick="selectNode('${targetNode.id}')">
        <span>${targetNode.icon} ${targetNode.title}</span>
        <span class="tag-relation">(${edge.label})</span>
      </div>
    `;
  }).join('');

  // Open Side Panel
  elements.sidePanel.classList.add('open');
}

function closeSidePanel() {
  elements.sidePanel.classList.remove('open');
}

// Render Mindmap View
function renderMindmap() {
  const categories = [
    { id: 'agent', name: '🤖 AI 에이전트', color: 'var(--cat-agent)' },
    { id: 'doc', name: '📄 지식 문서', color: 'var(--cat-doc)' },
    { id: 'tool', name: '⚡ 자동화 툴', color: 'var(--cat-tool)' },
    { id: 'framework', name: '📊 분석 프레임워크', color: 'var(--cat-framework)' }
  ];

  let html = `
    <div class="tree-root">
      <div class="tree-node-card root-card" style="border-color: #6366f1; background: rgba(99, 102, 241, 0.2);">
        <span style="font-size: 1.5rem;">🏢</span>
        <div>
          <h2 style="font-size: 1.1rem; font-weight: 700;">Second-Company 지식 생태계</h2>
          <span style="font-size: 0.78rem; color: #94a3b8;">통합 지식 그래프 시스템</span>
        </div>
      </div>

      <div class="tree-branches">
  `;

  categories.forEach(cat => {
    const catNodes = state.nodes.filter(n => n.category === cat.id);
    html += `
      <div class="tree-branch-col">
        <div class="branch-title" style="background: ${cat.color}22; color: ${cat.color}; border: 1px solid ${cat.color};">
          ${cat.name} (${catNodes.length})
        </div>
        ${catNodes.map(node => `
          <div class="tree-node-card" onclick="selectNode('${node.id}'); switchView('network'); focusNodeLocationById('${node.id}');">
            <span style="font-size: 1.3rem;">${node.icon}</span>
            <div>
              <div style="font-weight: 600; font-size: 0.88rem;">${node.title}</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">${node.subtitle}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  });

  html += `</div></div>`;
  elements.mindmapTree.innerHTML = html;
}

// Render Structured List View
function renderListView(nodesToRender = state.nodes) {
  elements.listBody.innerHTML = nodesToRender.map(node => {
    const connCount = state.edges.filter(e => e.source === node.id || e.target === node.id).length;
    return `
      <div class="list-row" onclick="selectNode('${node.id}')">
        <div class="col-title">
          <span>${node.icon}</span>
          <span>${node.title}</span>
        </div>
        <div class="col-category">
          <span class="panel-category-badge" style="background: ${getCategoryColor(node.category)}; color: #fff;">
            ${getCategoryName(node.category)}
          </span>
        </div>
        <div class="col-summary">
          • ${node.summary[0]}
        </div>
        <div class="col-connections">
          <strong>${connCount}</strong>개 연결
        </div>
        <div class="col-action">
          <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;">요약 카드</button>
        </div>
      </div>
    `;
  }).join('');
}

// Pan & Zoom Mechanics
function zoom(factor) {
  state.zoom *= factor;
  state.zoom = Math.max(0.4, Math.min(2.5, state.zoom));
  updateTransform();
}

function resetView() {
  state.zoom = 1;
  state.pan = { x: 0, y: 0 };
  updateTransform();
}

function updateTransform() {
  elements.viewport.setAttribute("transform", `translate(${state.pan.x}, ${state.pan.y}) scale(${state.zoom})`);
}

function onCanvasMouseDown(e) {
  if (e.target.closest('.graph-node-group')) return;
  state.isDraggingCanvas = true;
  state.dragStart = { x: e.clientX - state.pan.x, y: e.clientY - state.pan.y };
}

function onCanvasMouseMove(e) {
  if (state.isDraggingCanvas) {
    state.pan.x = e.clientX - state.dragStart.x;
    state.pan.y = e.clientY - state.dragStart.y;
    updateTransform();
  }
}

function onCanvasMouseUp() {
  state.isDraggingCanvas = false;
}

function onCanvasWheel(e) {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
  zoom(zoomFactor);
}

function focusNodeLocation(node) {
  switchView('network');
  state.pan.x = (window.innerWidth / 2) - node.x * state.zoom;
  state.pan.y = (window.innerHeight / 2) - node.y * state.zoom;
  updateTransform();
}

window.focusNodeLocationById = function(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (node) focusNodeLocation(node);
};

// Utilities
function getCategoryName(cat) {
  const map = { agent: 'AI 에이전트', doc: '지식 문서', tool: '자동화 툴', framework: '분석 프레임워크' };
  return map[cat] || cat;
}

function getCategoryColor(cat) {
  const map = { agent: '#8b5cf6', doc: '#10b981', tool: '#f59e0b', framework: '#06b6d4' };
  return map[cat] || '#64748b';
}

function truncateText(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}

function copyFilePath() {
  const path = elements.panelPath.textContent;
  navigator.clipboard.writeText(path).then(() => {
    alert("파일 경로가 클립보드에 복사되었습니다:\n" + path);
  });
}

// Launch on DOM ready
document.addEventListener('DOMContentLoaded', init);
