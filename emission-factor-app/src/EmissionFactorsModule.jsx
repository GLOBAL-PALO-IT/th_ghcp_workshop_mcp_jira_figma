import { EmissionFactorsTable, EmissionFactorDialogs } from './components/EmissionFactorsTable'
import { useEmissionFactorsTable } from './hooks/useEmissionFactorsTable'

const SIDEBAR_ITEMS = [
  'Dashboard',
  'Emission Factors',
  'Data Query',
  'Currency',
  'Account Management',
  'Notifications',
  'Settings',
]

export function EmissionFactorsModule() {
  const table = useEmissionFactorsTable()

  return (
    <main className="ef-dashboard">
      <aside className="ef-sidebar" aria-label="Main navigation">
        <h1>Carbon Console</h1>
        <nav>
          <ul>
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className={item === 'Emission Factors' ? 'is-active' : ''}
                  aria-current={item === 'Emission Factors' ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section className="ef-content">
        <header className="ef-toolbar">
          <div>
            <p className="ef-kicker">Emission Factor Management</p>
            <h2>Emission Factor Table</h2>
          </div>
          <div className="ef-toolbar__actions">
            <button type="button" className="ef-btn">Import</button>
            <button type="button" className="ef-btn">Export</button>
            <button type="button" className="ef-btn ef-btn--primary">Save changes</button>
            <button type="button" className="ef-btn ef-btn--ghost">Logout</button>
          </div>
        </header>

        <EmissionFactorsTable
          rows={table.rows}
          totalRows={table.totalRows}
          page={table.page}
          totalPages={table.totalPages}
          isLoading={table.isLoading}
          error={table.error}
          query={table.query}
          statusFilter={table.statusFilter}
          actionMenuId={table.actionMenuId}
          onQueryChange={table.onQueryChange}
          onStatusFilterChange={table.onStatusFilterChange}
          onChangePage={table.onChangePage}
          onOpenSource={table.onOpenSource}
          onOpenUsage={table.onOpenUsage}
          onToggleActionMenu={table.onToggleActionMenu}
          onActionSelect={table.onActionSelect}
        />
      </section>

      <EmissionFactorDialogs
        selectedSource={table.selectedSource}
        selectedUsage={table.selectedUsage}
        onCloseSource={table.onCloseSource}
        onCloseUsage={table.onCloseUsage}
      />
    </main>
  )
}
