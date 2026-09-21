export type TransactionType = "Doação" | "Venda" | "Empréstimo" | "Troca"
export type Condition = "Novo" | "Usado" | "Recondicionado"
export type ItemStatus = "Ativo" | "Concluído" | "Reservado" | "Expirado"
export type NeedStatus = "Procurando" | "Material encontrado" | "Em negociação" | "Resolvido"

export interface User {
  id: string
  name: string
  role: string
  department: string
  uvs: string
  avatar: string
  email: string
  phone: string
  itemsPosted: number
  exchangesCompleted: number
}

export interface Item {
  id: string
  name: string
  code: string
  reference: string
  category: string
  quantity: number
  unit: string
  condition: Condition
  uvs: string
  transactionType: TransactionType
  price?: number
  description: string
  image: string
  postedBy: User
  postedAt: string
  status: ItemStatus
  views: number
  interested: number
}

export interface Message {
  id: string
  from: User
  text: string
  timestamp: string
  isCurrentUser: boolean
}

export interface Conversation {
  id: string
  item: Item
  otherUser: User
  messages: Message[]
  lastMessage: string
  lastTime: string
  unread: number
}

export interface Notification {
  id: string
  type: "interest" | "message" | "published" | "match" | "reserved"
  title: string
  body: string
  time: string
  read: boolean
  itemId?: string
}

export interface Need {
  id: string
  name: string
  reference: string
  code: string
  category: string
  quantity: number
  uvs: string
  notes: string
  status: NeedStatus
  createdAt: string
  postedBy: User
}

export const UVS_LIST = [
  { code: "01.BA.01.000001", name: "Consórcio Salvador", full: "01.BA.01.000001 — Consórcio Salvador" },
  { code: "01.BA.02.000047", name: "UVS Itapoã", full: "01.BA.02.000047 — UVS Itapoã" },
  { code: "01.BA.03.000012", name: "UVS Pituba", full: "01.BA.03.000012 — UVS Pituba" },
  { code: "01.BA.04.000089", name: "UVS Lauro de Freitas", full: "01.BA.04.000089 — UVS Lauro de Freitas" },
  { code: "01.BA.05.000324", name: "Consórcio Camaçari", full: "01.BA.05.000324 — Consórcio Camaçari" },
  { code: "01.BA.06.000156", name: "UVS Simões Filho", full: "01.BA.06.000156 — UVS Simões Filho" },
  { code: "01.BA.07.000218", name: "Consórcio Litoral Norte", full: "01.BA.07.000218 — Consórcio Litoral Norte" },
]

export const CATEGORIES = [
  { id: "fixadores", label: "Fixadores", icon: "🔩" },
  { id: "ferramentas", label: "Ferramentas", icon: "🔧" },
  { id: "eletricos", label: "Elétricos", icon: "⚡" },
  { id: "rolamentos", label: "Rolamentos", icon: "⚙️" },
  { id: "cabos", label: "Cabos e Fios", icon: "🔌" },
  { id: "sensores", label: "Sensores", icon: "📡" },
  { id: "valvulas", label: "Válvulas", icon: "🔀" },
  { id: "motores", label: "Motores", icon: "🔄" },
  { id: "outros", label: "Outros", icon: "📦" },
]

export const USERS: User[] = [
  {
    id: "u1",
    name: "Ana Ferreira",
    role: "Analista de Supply Chain",
    department: "Supply Chain",
    uvs: "01.BA.01.000001 — Consórcio Salvador",
    avatar: "AF",
    email: "ana.ferreira@soteroambiental.com.br",
    phone: "(71) 9 9874-2211",
    itemsPosted: 8,
    exchangesCompleted: 14,
  },
  {
    id: "u2",
    name: "Carlos Silva",
    role: "Técnico de Manutenção",
    department: "Manutenção",
    uvs: "01.BA.02.000047 — UVS Itapoã",
    avatar: "CS",
    email: "carlos.silva@soteroambiental.com.br",
    phone: "(11) 9 9645-3388",
    itemsPosted: 12,
    exchangesCompleted: 21,
  },
  {
    id: "u3",
    name: "Maria Santos",
    role: "Engenheira de Produção",
    department: "Engenharia",
    uvs: "01.BA.03.000012 — UVS Pituba",
    avatar: "MS",
    email: "maria.santos@soteroambiental.com.br",
    phone: "(81) 9 9312-7744",
    itemsPosted: 5,
    exchangesCompleted: 9,
  },
  {
    id: "u4",
    name: "João Oliveira",
    role: "Supervisor de Produção",
    department: "Produção",
    uvs: "01.BA.04.000089 — UVS Lauro de Freitas",
    avatar: "JO",
    email: "joao.oliveira@soteroambiental.com.br",
    phone: "(51) 9 9823-5511",
    itemsPosted: 3,
    exchangesCompleted: 7,
  },
  {
    id: "u5",
    name: "Pedro Costa",
    role: "Técnico Eletricista",
    department: "Manutenção",
    uvs: "01.BA.05.000324 — Consórcio Camaçari",
    avatar: "PC",
    email: "pedro.costa@soteroambiental.com.br",
    phone: "(85) 9 9416-8822",
    itemsPosted: 17,
    exchangesCompleted: 32,
  },
]

export const CURRENT_USER = USERS[0]

export const ITEMS: Item[] = [
  {
    id: "i1",
    name: "Parafuso Hexagonal Inox",
    code: "SC-00125",
    reference: "M8×40 DIN 933",
    category: "fixadores",
    quantity: 15,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.01.000001 — Consórcio Salvador",
    transactionType: "Doação",
    description:
      "Tenho 15 unidades de parafusos hexagonais inox M8×40 que sobrou de uma manutenção preventiva. Disponíveis para qualquer setor da empresa que necessite. Estão em embalagem original, nunca utilizados.",
    image:
      "https://images.unsplash.com/photo-1469289759076-d1484757abc3?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[0],
    postedAt: "2026-09-10",
    status: "Ativo",
    views: 34,
    interested: 3,
  },
  {
    id: "i2",
    name: "Chave de Fenda Phillips",
    code: "FD-00089",
    reference: "PH2 × 150mm",
    category: "ferramentas",
    quantity: 2,
    unit: "unidades",
    condition: "Usado",
    uvs: "01.BA.02.000047 — UVS Itapoã",
    transactionType: "Venda",
    price: 25,
    description:
      "Duas chaves de fenda Phillips em bom estado de uso. Substituídas por kit novo do setor. Vendo por R$25 cada. Ponta em bom estado, cabo sem trincas.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[1],
    postedAt: "2026-09-09",
    status: "Ativo",
    views: 18,
    interested: 1,
  },
  {
    id: "i3",
    name: "Capacitor Eletrolítico",
    code: "CA-00341",
    reference: "470µF 25V 105°C",
    category: "eletricos",
    quantity: 50,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.03.000012 — UVS Pituba",
    transactionType: "Troca",
    description:
      "Lote de 50 capacitores eletrolíticos 470µF 25V, série 105°C. Adquiridos em excesso no último pedido de compra. Aceito troca por relés de 24VDC ou fusíveis 10A NH.",
    image:
      "https://images.unsplash.com/photo-1644079446600-219068676743?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[2],
    postedAt: "2026-09-09",
    status: "Ativo",
    views: 52,
    interested: 6,
  },
  {
    id: "i4",
    name: "Rolamento de Esferas SKF",
    code: "RO-00078",
    reference: "6204-2RS1 C3",
    category: "rolamentos",
    quantity: 4,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.04.000089 — UVS Lauro de Freitas",
    transactionType: "Doação",
    description:
      "Quatro rolamentos SKF 6204-2RS1 C3, lacrados em embalagem original. Sobra de estoque da última manutenção da linha 3. Qualquer setor pode solicitar.",
    image:
      "https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[3],
    postedAt: "2026-09-08",
    status: "Ativo",
    views: 41,
    interested: 5,
  },
  {
    id: "i5",
    name: "Cabo PP Flexível",
    code: "CB-00215",
    reference: "3×2,5mm² 750V",
    category: "cabos",
    quantity: 30,
    unit: "metros",
    condition: "Usado",
    uvs: "01.BA.05.000324 — Consórcio Camaçari",
    transactionType: "Venda",
    price: 8,
    description:
      "Aproximadamente 30 metros de cabo PP flexível 3×2,5mm², 750V. Retirado de painel antigo durante modernização. Boas condições de isolamento. Vendo por R$8/metro.",
    image:
      "https://images.unsplash.com/photo-1684695749267-233af13276d0?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[4],
    postedAt: "2026-09-08",
    status: "Ativo",
    views: 27,
    interested: 2,
  },
  {
    id: "i6",
    name: "Chave Inglesa Ajustável",
    code: "CI-00033",
    reference: '12" / 300mm Gedore',
    category: "ferramentas",
    quantity: 1,
    unit: "unidade",
    condition: "Usado",
    uvs: "01.BA.01.000001 — Consórcio Salvador",
    transactionType: "Empréstimo",
    description:
      'Chave inglesa ajustável 12" marca Gedore. Disponível para empréstimo por até 30 dias. Setor de Manutenção pode retirar diretamente comigo. Devolver em bom estado.',
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[0],
    postedAt: "2026-09-07",
    status: "Ativo",
    views: 15,
    interested: 2,
  },
  {
    id: "i7",
    name: "Resistor 10kΩ 1/4W",
    code: "RE-00456",
    reference: "10k 1/4W 5% CFR",
    category: "eletricos",
    quantity: 200,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.03.000012 — UVS Pituba",
    transactionType: "Doação",
    description:
      "Lote de 200 resistores 10kΩ 1/4W 5%. Sobra de projeto de automação. Qualquer técnico eletrônico ou setor de manutenção pode solicitar.",
    image:
      "https://images.unsplash.com/photo-1644079446600-219068676743?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[2],
    postedAt: "2026-09-07",
    status: "Ativo",
    views: 63,
    interested: 8,
  },
  {
    id: "i8",
    name: "Motor DC 12V 150W",
    code: "MT-00102",
    reference: "WEG 12VCC 150W Eixo Ø14",
    category: "motores",
    quantity: 1,
    unit: "unidade",
    condition: "Recondicionado",
    uvs: "01.BA.02.000047 — UVS Itapoã",
    transactionType: "Venda",
    price: 320,
    description:
      "Motor DC 12V 150W WEG, recondicionado pelo setor de manutenção. Testado e funcionando. Saiu da linha após upgrade. Ideal para bancada de testes ou substituição rápida.",
    image:
      "https://images.unsplash.com/photo-1469289759076-d1484757abc3?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[1],
    postedAt: "2026-09-06",
    status: "Ativo",
    views: 88,
    interested: 4,
  },
  {
    id: "i9",
    name: "Correia Dentada HTD",
    code: "CR-00289",
    reference: "HTD 5M-600-15",
    category: "rolamentos",
    quantity: 3,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.04.000089 — UVS Lauro de Freitas",
    transactionType: "Troca",
    description:
      "3 correias dentadas HTD 5M-600-15, embalagem original Gates. Sobra de estoque. Aceito troca por polias HTD 5M de qualquer passo ou por tensionadores.",
    image:
      "https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[3],
    postedAt: "2026-09-05",
    status: "Ativo",
    views: 29,
    interested: 3,
  },
  {
    id: "i10",
    name: "Fusível NH Faca 10A",
    code: "FU-00067",
    reference: "NH00 10A gG 500V",
    category: "eletricos",
    quantity: 100,
    unit: "unidades",
    condition: "Novo",
    uvs: "01.BA.05.000324 — Consórcio Camaçari",
    transactionType: "Doação",
    description:
      "Cem fusíveis NH faca tipo 00, 10A, gG, 500V. Estoque duplicado identificado no almoxarifado. Doação para qualquer setor. Retirar com Pedro Costa.",
    image:
      "https://images.unsplash.com/photo-1684695749267-233af13276d0?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[4],
    postedAt: "2026-09-05",
    status: "Ativo",
    views: 44,
    interested: 7,
  },
  {
    id: "i11",
    name: "Sensor de Temperatura PT100",
    code: "SE-00178",
    reference: "PT100 Ø6×100mm 3 fios",
    category: "sensores",
    quantity: 2,
    unit: "unidades",
    condition: "Recondicionado",
    uvs: "01.BA.01.000001 — Consórcio Salvador",
    transactionType: "Venda",
    price: 180,
    description:
      "Dois sensores de temperatura PT100, diâmetro 6mm, comprimento 100mm, conexão 3 fios. Calibrados e testados pelo laboratório interno. Ideais para substituição emergencial.",
    image:
      "https://images.unsplash.com/photo-1469289759076-d1484757abc3?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[0],
    postedAt: "2026-09-04",
    status: "Ativo",
    views: 71,
    interested: 5,
  },
  {
    id: "i12",
    name: "Válvula Solenóide 24VDC",
    code: "VS-00094",
    reference: "Parker D1VW004CNJW 24VDC",
    category: "valvulas",
    quantity: 1,
    unit: "unidade",
    condition: "Usado",
    uvs: "01.BA.02.000047 — UVS Itapoã",
    transactionType: "Empréstimo",
    description:
      "Válvula solenóide Parker 24VDC 4/2 vias, disponível para empréstimo enquanto aguarda chegada de peça comprada. Prazo máximo de 60 dias.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format",
    postedBy: USERS[1],
    postedAt: "2026-09-04",
    status: "Ativo",
    views: 39,
    interested: 2,
  },
]

export const MY_ITEMS: Item[] = [
  { ...ITEMS[0], postedBy: CURRENT_USER },
  { ...ITEMS[5], postedBy: CURRENT_USER },
  { ...ITEMS[10], postedBy: CURRENT_USER },
  {
    ...ITEMS[2],
    id: "my4",
    status: "Concluído",
    postedBy: CURRENT_USER,
    name: "Óleo Lubrificante ISO 68",
    code: "OL-00044",
    reference: "ISO VG 68 / DIN 51517",
    transactionType: "Doação",
    postedAt: "2026-08-15",
  },
  {
    ...ITEMS[3],
    id: "my5",
    status: "Reservado",
    postedBy: CURRENT_USER,
    name: "Pino de Cisalhamento Ø10",
    code: "PI-00201",
    reference: "Ø10×40 DIN 1",
    transactionType: "Doação",
    postedAt: "2026-09-01",
  },
]

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    item: ITEMS[0],
    otherUser: USERS[1],
    lastMessage: "Sim, ainda tenho disponível. Pode retirar amanhã.",
    lastTime: "14:32",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: USERS[1],
        text: "Olá Ana! Vi que você tem os parafusos M8×40. Ainda estão disponíveis?",
        timestamp: "14:10",
        isCurrentUser: false,
      },
      {
        id: "m2",
        from: USERS[0],
        text: "Oi Carlos! Sim, ainda tenho 15 unidades. Você precisa de quantas?",
        timestamp: "14:15",
        isCurrentUser: true,
      },
      {
        id: "m3",
        from: USERS[1],
        text: "Preciso de umas 5 pra manutenção da linha 2. É possível?",
        timestamp: "14:20",
        isCurrentUser: false,
      },
      {
        id: "m4",
        from: USERS[0],
        text: "Claro! Pode pegar as 5. Fica à vontade.",
        timestamp: "14:25",
        isCurrentUser: true,
      },
      {
        id: "m5",
        from: USERS[1],
        text: "Ótimo! Onde posso te encontrar para retirar?",
        timestamp: "14:30",
        isCurrentUser: false,
      },
      {
        id: "m6",
        from: USERS[0],
        text: "Sim, ainda tenho disponível. Pode retirar amanhã.",
        timestamp: "14:32",
        isCurrentUser: true,
      },
    ],
  },
  {
    id: "c2",
    item: ITEMS[10],
    otherUser: USERS[2],
    lastMessage: "Perfeito, te aviso quando precisar.",
    lastTime: "11:04",
    unread: 0,
    messages: [
      {
        id: "m7",
        from: USERS[2],
        text: "Ana, os sensores PT100 ainda estão à venda?",
        timestamp: "10:50",
        isCurrentUser: false,
      },
      {
        id: "m8",
        from: USERS[0],
        text: "Sim Maria! Dois disponíveis, R$180 cada.",
        timestamp: "10:55",
        isCurrentUser: true,
      },
      {
        id: "m9",
        from: USERS[2],
        text: "Perfeito, te aviso quando precisar.",
        timestamp: "11:04",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "c3",
    item: ITEMS[5],
    otherUser: USERS[3],
    lastMessage: "Pode me emprestar por 2 semanas?",
    lastTime: "09:17",
    unread: 1,
    messages: [
      {
        id: "m10",
        from: USERS[3],
        text: "Boa tarde! Vi o anúncio da chave inglesa. Pode me emprestar por 2 semanas?",
        timestamp: "09:17",
        isCurrentUser: false,
      },
    ],
  },
]

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "interest",
    title: "Alguém se interessou pelo seu item",
    body: "João Oliveira demonstrou interesse nos seus Parafusos Hexagonais M8×40.",
    time: "há 20 min",
    read: false,
    itemId: "i1",
  },
  {
    id: "n2",
    type: "message",
    title: "Nova mensagem recebida",
    body: 'Carlos Silva: "Olá! Ainda estão disponíveis os parafusos?"',
    time: "há 1 hora",
    read: false,
    itemId: "i1",
  },
  {
    id: "n3",
    type: "published",
    title: "Anúncio publicado com sucesso",
    body: 'Seu anúncio "Sensor de Temperatura PT100" está ativo e visível para todos.',
    time: "há 2 dias",
    read: true,
    itemId: "i11",
  },
  {
    id: "n4",
    type: "match",
    title: "Item compatível com sua busca",
    body: 'Novo anúncio de "Fusível NH 10A" adicionado em Fortaleza — você buscou isso antes.',
    time: "há 3 dias",
    read: true,
    itemId: "i10",
  },
  {
    id: "n5",
    type: "reserved",
    title: "Item reservado",
    body: "Seu Pino de Cisalhamento Ø10 foi reservado por Maria Santos.",
    time: "há 5 dias",
    read: true,
    itemId: "my5",
  },
  {
    id: "n6",
    type: "interest",
    title: "Novo interesse no seu anúncio",
    body: "Pedro Costa demonstrou interesse na sua Chave Inglesa Ajustável.",
    time: "há 6 dias",
    read: true,
    itemId: "i6",
  },
]

// ── localStorage helpers ──────────────────────────────────────────────────────

export function loadNeeds(): Need[] {
  try {
    return JSON.parse(localStorage.getItem("sotero_needs") || "[]") as Need[]
  } catch {
    return []
  }
}

export function saveNeeds(needs: Need[]): void {
  localStorage.setItem("sotero_needs", JSON.stringify(needs))
}

export function loadCustomItems(): Item[] {
  try {
    return JSON.parse(localStorage.getItem("sotero_items") || "[]") as Item[]
  } catch {
    return []
  }
}

export function saveCustomItems(items: Item[]): void {
  localStorage.setItem("sotero_items", JSON.stringify(items))
}

export function findMatchingNeeds(item: Item, needs: Need[]): Need[] {
  const iName = item.name.toLowerCase()
  const iRef = item.reference.toLowerCase()
  const iCode = item.code.toLowerCase()
  return needs.filter((need) => {
    if (need.status !== "Procurando") return false
    const nName = need.name.toLowerCase()
    const nRef = need.reference.toLowerCase()
    const nCode = need.code.toLowerCase()
    return (
      nName.includes(iName) ||
      iName.includes(nName) ||
      (nRef && iRef.includes(nRef)) ||
      (nCode && iCode.includes(nCode)) ||
      need.category === item.category
    )
  })
}
