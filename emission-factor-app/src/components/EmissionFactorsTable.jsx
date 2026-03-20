function StatusBadge({ status }) {
    const statusClassName = status.toLowerCase() === 'active' ? 'ef-badge--active' : 'ef-badge--inactive'
    return <span className={`ef-badge ${statusClassName}`}>{status}</span>
}

function SourceModal({ row, onClose }) {
    if (!row) {
        return null
    }

    return (
        <div className="ef-overlay" role="dialog" aria-modal="true" aria-label="Source Details">
            <div className="ef-modal">
                <div className="ef-modal__header">
                    <h2>Source Details</h2>
                    <button type="button" onClick={onClose} className="ef-btn ef-btn--ghost">
                        Close
                    </button>
                </div>
                <dl className="ef-meta-grid">
                    <div>
                        <dt>Title</dt>
                        <dd>{row.source.title}</dd>
                    </div>
                    <div>
                        <dt>Publisher</dt>
                        <dd>{row.source.publisher}</dd>
                    </div>
                    <div>
                        <dt>Version</dt>
                        <dd>{row.source.version}</dd>
                    </div>
                    <div>
                        <dt>Reference URL</dt>
                        <dd>
                            <a href={row.source.url} target="_blank" rel="noreferrer">
                                {row.source.url}
                            </a>
                        </dd>
                    </div>
                    <div>
                        <dt>Note</dt>
                        <dd>{row.source.note}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

function UsageDialog({ row, onClose }) {
    if (!row) {
        return null
    }

    return (
        <div className="ef-overlay" role="dialog" aria-modal="true" aria-label="Usage Details">
            <div className="ef-modal">
                <div className="ef-modal__header">
                    <h2>Usage Details</h2>
                    <button type="button" onClick={onClose} className="ef-btn ef-btn--ghost">
                        Close
                    </button>
                </div>
                <p className="ef-usage-summary">
                    <strong>Total usage:</strong> {row.usage.count}
                </p>
                <p className="ef-usage-summary">{row.usage.details}</p>
                <h3>Usage History</h3>
                <ul className="ef-usage-history">
                    {row.usage.history.map((item) => (
                        <li key={`${item.date}-${item.action}`}>
                            <span>{item.date}</span>
                            <span>{item.action}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function ActionsMenu({ rowId, actionMenuId, onToggleActionMenu, onActionSelect }) {
    const isOpen = actionMenuId === rowId
    const options = ['Edit', 'Delete', 'View', 'Export']

    return (
        <div className="ef-actions">
            <button
                type="button"
                aria-label="Actions"
                aria-expanded={isOpen}
                className="ef-btn ef-btn--icon"
                onClick={() => onToggleActionMenu(rowId)}
            >
                ...
            </button>
            {isOpen ? (
                <ul className="ef-action-menu" role="menu" aria-label="Row Actions Menu">
                    {options.map((option) => (
                        <li key={option}>
                            <button type="button" role="menuitem" onClick={onActionSelect}>
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export function EmissionFactorsTable({
    rows,
    totalRows,
    page,
    totalPages,
    isLoading,
    error,
    query,
    statusFilter,
    actionMenuId,
    onQueryChange,
    onStatusFilterChange,
    onChangePage,
    onOpenSource,
    onOpenUsage,
    onToggleActionMenu,
    onActionSelect,
}) {
    if (isLoading) {
        return <p className="ef-state">กำลังโหลดข้อมูล Emission Factors...</p>
    }

    if (error) {
        return <p className="ef-state">{error}</p>
    }

    return (
        <section className="ef-table-section" aria-label="Emission Factors Table Section">
            <div className="ef-controls">
                <label>
                    <span>Search</span>
                    <input
                        type="search"
                        placeholder="ค้นหาด้วยรหัส, ชื่อ หรือหมวดหมู่"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                    />
                </label>
                <label>
                    <span>Status</span>
                    <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </label>
            </div>

            <div className="ef-table-wrap">
                <table className="ef-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Value</th>
                            <th>Unit</th>
                            <th>Source</th>
                            <th>Last Updated</th>
                            <th>Status</th>
                            <th>Usage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.category}</td>
                                <td>{row.value}</td>
                                <td>{row.unit}</td>
                                <td>
                                    <button type="button" className="ef-link-btn" onClick={() => onOpenSource(row)}>
                                        Source
                                    </button>
                                </td>
                                <td>{row.lastUpdated}</td>
                                <td>
                                    <StatusBadge status={row.status} />
                                </td>
                                <td>
                                    <button type="button" className="ef-link-btn" onClick={() => onOpenUsage(row)}>
                                        {row.usage.count}
                                    </button>
                                </td>
                                <td>
                                    <ActionsMenu
                                        rowId={row.id}
                                        actionMenuId={actionMenuId}
                                        onToggleActionMenu={onToggleActionMenu}
                                        onActionSelect={onActionSelect}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {rows.length === 0 ? <p className="ef-state">ไม่พบข้อมูลตามเงื่อนไขที่ค้นหา</p> : null}

            <div className="ef-pagination" aria-label="Pagination">
                <p>
                    แสดง {rows.length} จาก {totalRows} รายการ (Page {page}/{totalPages})
                </p>
                <div>
                    <button type="button" onClick={() => onChangePage(page - 1)} disabled={page <= 1}>
                        Previous
                    </button>
                    <button type="button" onClick={() => onChangePage(page + 1)} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}

export function EmissionFactorDialogs({ selectedSource, selectedUsage, onCloseSource, onCloseUsage }) {
    return (
        <>
            <SourceModal row={selectedSource} onClose={onCloseSource} />
            <UsageDialog row={selectedUsage} onClose={onCloseUsage} />
        </>
    )
}
