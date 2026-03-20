import { useEffect, useMemo, useState } from 'react'
import { getEmissionFactors } from '../services/emissionFactorsService'

const DEFAULT_PAGE_SIZE = 5

export function useEmissionFactorsTable() {
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [query, setQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [page, setPage] = useState(1)

    const [selectedSource, setSelectedSource] = useState(null)
    const [selectedUsage, setSelectedUsage] = useState(null)
    const [actionMenuId, setActionMenuId] = useState(null)

    useEffect(() => {
        let isMounted = true

        async function loadRows() {
            setIsLoading(true)
            setError('')
            const data = await getEmissionFactors()

            if (!isMounted) {
                return
            }

            setRows(data)
            setIsLoading(false)
            if (data.length === 0) {
                setError('ไม่พบข้อมูล Emission Factors')
            }
        }

        loadRows()

        return () => {
            isMounted = false
        }
    }, [])

    const filteredRows = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        return rows.filter((row) => {
            const byStatus = statusFilter === 'all' || row.status.toLowerCase() === statusFilter
            const byQuery =
                normalizedQuery.length === 0 ||
                row.id.toLowerCase().includes(normalizedQuery) ||
                row.name.toLowerCase().includes(normalizedQuery) ||
                row.category.toLowerCase().includes(normalizedQuery)

            return byStatus && byQuery
        })
    }, [rows, query, statusFilter])

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / DEFAULT_PAGE_SIZE))

    const pagedRows = useMemo(() => {
        const nextPage = Math.min(page, totalPages)
        const start = (nextPage - 1) * DEFAULT_PAGE_SIZE
        const end = start + DEFAULT_PAGE_SIZE
        return filteredRows.slice(start, end)
    }, [filteredRows, page, totalPages])

    const onQueryChange = (value) => {
        setQuery(value)
        setPage(1)
    }

    const onStatusFilterChange = (value) => {
        setStatusFilter(value)
        setPage(1)
    }

    const onChangePage = (nextPage) => {
        setPage(Math.max(1, Math.min(nextPage, totalPages)))
    }

    const onOpenSource = (row) => {
        setSelectedSource(row)
    }

    const onCloseSource = () => {
        setSelectedSource(null)
    }

    const onOpenUsage = (row) => {
        setSelectedUsage(row)
    }

    const onCloseUsage = () => {
        setSelectedUsage(null)
    }

    const onToggleActionMenu = (rowId) => {
        setActionMenuId((currentId) => (currentId === rowId ? null : rowId))
    }

    const onActionSelect = () => {
        setActionMenuId(null)
    }

    return {
        rows: pagedRows,
        totalRows: filteredRows.length,
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages,
        isLoading,
        error,
        query,
        statusFilter,
        selectedSource,
        selectedUsage,
        actionMenuId,
        onQueryChange,
        onStatusFilterChange,
        onChangePage,
        onOpenSource,
        onCloseSource,
        onOpenUsage,
        onCloseUsage,
        onToggleActionMenu,
        onActionSelect,
    }
}
