const MOCK_EMISSION_FACTORS = [
  {
    id: 'EF-001',
    name: 'การเดินทางโดยเครื่องบิน',
    category: 'Transportation',
    value: 0.245,
    unit: 'kgCO2e/km',
    source: {
      title: 'IPCC Guidelines',
      publisher: 'IPCC',
      version: '2021',
      url: 'https://www.ipcc.ch',
      note: 'ค่าเฉลี่ยสำหรับเส้นทางบินระยะสั้น',
    },
    lastUpdated: '2026-03-10',
    status: 'Active',
    usage: {
      count: 126,
      details: 'ถูกใช้งานในโมดูลคำนวณการเดินทางธุรกิจ',
      history: [
        { date: '2026-03-18', action: 'Applied to 42 records' },
        { date: '2026-03-12', action: 'Reviewed by Carbon Team' },
      ],
    },
  },
  {
    id: 'EF-002',
    name: 'ยานพาหนะดีเซล',
    category: 'Transportation',
    value: 0.171,
    unit: 'kgCO2e/km',
    source: {
      title: 'Thailand TGO Factor Library',
      publisher: 'TGO',
      version: '2025-Q4',
      url: 'https://ghgdata.tgo.or.th',
      note: 'ค่าสำหรับรถดีเซลเชิงพาณิชย์',
    },
    lastUpdated: '2026-03-04',
    status: 'Inactive',
    usage: {
      count: 24,
      details: 'สงวนไว้สำหรับข้อมูลย้อนหลังที่ปิดใช้งานแล้ว',
      history: [
        { date: '2026-02-20', action: 'Marked as Inactive' },
        { date: '2026-01-09', action: 'Applied to 24 records' },
      ],
    },
  },
  {
    id: 'EF-003',
    name: 'ไฟฟ้า',
    category: 'Energy',
    value: 0.498,
    unit: 'kgCO2e/kWh',
    source: {
      title: 'National Grid Emission Inventory',
      publisher: 'Energy Policy Office',
      version: '2025',
      url: 'https://www.eppo.go.th',
      note: 'ค่าเฉลี่ยไฟฟ้าสำหรับกริดประเทศ',
    },
    lastUpdated: '2026-03-15',
    status: 'Active',
    usage: {
      count: 310,
      details: 'ใช้ในหมวดการใช้พลังงานสำนักงานและโรงงาน',
      history: [
        { date: '2026-03-19', action: 'Applied to 180 records' },
        { date: '2026-03-11', action: 'Applied to 130 records' },
      ],
    },
  },
]

function normalizeFactor(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    value: Number(row.value),
    unit: row.unit,
    source: row.source,
    lastUpdated: row.lastUpdated,
    status: row.status,
    usage: row.usage,
  }
}

export async function getEmissionFactors() {
  try {
    const response = await fetch('/api/emission-factors')
    if (!response.ok) {
      return MOCK_EMISSION_FACTORS.map(normalizeFactor)
    }

    const payload = await response.json()
    if (!Array.isArray(payload)) {
      return MOCK_EMISSION_FACTORS.map(normalizeFactor)
    }

    return payload.map(normalizeFactor)
  } catch {
    return MOCK_EMISSION_FACTORS.map(normalizeFactor)
  }
}
