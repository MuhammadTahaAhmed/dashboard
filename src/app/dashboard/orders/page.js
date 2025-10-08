"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
  const initialOrders = [
    {
      id: "ORD-1001",
      date: "2025-09-10",
      customer: "Alice Johnson",
      total: 129.99,
      status: "Shipped",
    },
    {
      id: "ORD-1002",
      date: "2025-09-12",
      customer: "Bob Smith",
      total: 58.5,
      status: "Processing",
    },
    {
      id: "ORD-1003",
      date: "2025-09-14",
      customer: "Charlie Rivera",
      total: 249.0,
      status: "Delivered",
    },
    {
      id: "ORD-1004",
      date: "2025-09-18",
      customer: "Dana Lee",
      total: 89.0,
      status: "Cancelled",
    },
    {
      id: "ORD-1005",
      date: "2025-09-20",
      customer: "Evan Chen",
      total: 42.75,
      status: "Processing",
    },
    {
      id: "ORD-1006",
      date: "2025-09-22",
      customer: "Finn Lee",
      total: 100.0,
      status: "Shipped",
    },
    {
      id: "ORD-1007",
      date: "2025-09-24",
      customer: "Gina Chen",
      total: 150.0,
      status: "Processing",
    },
  ];
  const [orders, setOrders] = useState(initialOrders);
  const [showExport, setShowExport] = useState(false);
  const [format, setFormat] = useState("csv");
  const allFields = ["id", "date", "customer", "total", "status"];
  const [fields, setFields] = useState(allFields);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

 
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders;


    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'date') {
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      } else if (sortConfig.key === 'total') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      } else {
        const comparison = String(aVal).localeCompare(String(bVal));
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortConfig]);

 
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const json = await res.json();
        if (!ignore && json?.ok && Array.isArray(json.orders)) {
          setOrders(json.orders);
        }
      } catch {}
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm(`Delete order ${id}? This cannot be undone.`)) return;
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json?.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        setSelectedOrders(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch {}
  }

  function handleSort(key) {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }

  function handleSelectOrder(id) {
    setSelectedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function handleSelectAll() {
    if (selectedOrders.size === paginatedOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(paginatedOrders.map(order => order.id)));
    }
  }

  function handleBulkDelete() {
    if (selectedOrders.size === 0) return;
    if (!window.confirm(`Delete ${selectedOrders.size} selected orders? This cannot be undone.`)) return;
    setOrders(prev => prev.filter(order => !selectedOrders.has(order.id)));
    setSelectedOrders(new Set());
  }

  function handleBulkStatusUpdate(newStatus) {
    if (selectedOrders.size === 0) return;
    setOrders(prev => prev.map(order => 
      selectedOrders.has(order.id) ? { ...order, status: newStatus } : order
    ));
    setSelectedOrders(new Set());
  }

  function toggleField(name) {
    setFields(prev => (prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]));
  }

  function selectAllFields() {
    setFields(allFields);
  }

  function clearAllFields() {
    setFields([]);
  }

  function formatDateISO(dateString) {
    try {
      const d = new Date(dateString);
      return Number.isNaN(d.getTime()) ? String(dateString) : d.toISOString();
    } catch {
      return String(dateString);
    }
  }

  function prepareRows() {
    return filteredAndSortedOrders.map(o => {
      const row = {};
      for (const f of fields) {
        if (f === "date") row[f] = formatDateISO(o.date);
        else if (f === "total") row[f] = Number(o.total).toFixed(2);
        else row[f] = o[f];
      }
      return row;
    });
  }

  function toCSV(rows) {
    if (!rows.length) return "";
    const header = fields.join(",");
    const body = rows
      .map(r => fields.map(k => {
        const val = r[k] ?? "";
        const s = String(val).replace(/"/g, '""');
        return /[",\n]/.test(s) ? `"${s}"` : s;
      }).join(","))
      .join("\n");
    return `${header}\n${body}`;
  }

  function download(content, mime, ext) {
    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `orders-${ts}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleExportDownload() {
    const rows = prepareRows();
    if (!rows.length) {
      alert("No data to export with current filter.");
      return;
    }
    if (!fields.length) {
      alert("Select at least one field to export.");
      return;
    }
    if (format === "csv") {
      const csv = toCSV(rows);
      download(csv, "text/csv", "csv");
    } else {
      download(JSON.stringify(rows, null, 2), "application/json", "json");
    }
  }

  const renderStatus = (status) => {
    const statusConfig = {
      "Delivered": { variant: "success", icon: "✓", className: "badge-success" },
      "Shipped": { variant: "info", icon: "🚚", className: "badge-info" },
      "Processing": { variant: "warning", icon: "⏳", className: "badge-warning" },
      "Cancelled": { variant: "danger", icon: "✕", className: "badge-danger" }
    };

    const config = statusConfig[status] || { variant: "default", icon: "?", className: "badge" };
    
    return (
      <span className={`badge ${config.className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <span>{config.icon}</span>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="card">
        <div className="card-header" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--surface) 0%, color-mix(in oklab, var(--primary) 4%, transparent) 100%)', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h1 className="hero-title" style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
                Orders Management
              </h1>
              <p className="hero-subtitle" style={{ fontSize: 16, marginBottom: 16 }}>
                {filteredAndSortedOrders.length} orders • {selectedOrders.size} selected
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/dashboard/orders/new" className="btn btn-primary btn-md" style={{ fontWeight: 600 }}>
                + New Order
              </Link>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 20, padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <Input 
                placeholder="Search orders by ID, customer, or status..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'var(--background)' }}
              />
            </div>
            <select 
              className="input" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ minWidth: '140px', background: 'var(--background)' }}
            >
              <option value="all">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Button size="sm" variant="ghost" onClick={() => setShowExport(v => !v)}>
              📊 Export
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.size > 0 && (
            <div style={{ marginTop: 16, padding: '12px 16px', background: 'color-mix(in oklab, var(--primary) 8%, transparent)', borderRadius: '8px', border: '1px solid color-mix(in oklab, var(--primary) 20%, transparent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>
                  {selectedOrders.size} orders selected
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button size="sm" variant="ghost" onClick={() => handleBulkStatusUpdate('Processing')}>
                    Set Processing
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleBulkStatusUpdate('Shipped')}>
                    Set Shipped
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleBulkStatusUpdate('Delivered')}>
                    Set Delivered
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleBulkDelete} style={{ color: '#ef4444' }}>
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExport && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header" style={{ padding: '20px', background: 'color-mix(in oklab, var(--primary) 6%, transparent)', borderRadius: '16px 16px 0 0' }}>
            <h3 className="card-title" style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>📊 Export Orders</h3>
          </div>
          <div style={{ padding: '20px' }}>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <p className="label" style={{ marginBottom: 8, fontWeight: 600 }}>Export Format</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <label className="label" style={{ display: "flex", alignItems: "center", gap: 8, cursor: 'pointer' }}>
                    <input type="radio" name="fmt" checked={format === "csv"} onChange={() => setFormat("csv")} />
                    📄 CSV
                  </label>
                  <label className="label" style={{ display: "flex", alignItems: "center", gap: 8, cursor: 'pointer' }}>
                    <input type="radio" name="fmt" checked={format === "json"} onChange={() => setFormat("json")} />
                    📋 JSON
                  </label>
                </div>
              </div>
              <div>
                <p className="label" style={{ marginBottom: 8, fontWeight: 600 }}>Include Fields</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {allFields.map(f => (
                    <label key={f} className="label" style={{ display: "flex", alignItems: "center", gap: 6, cursor: 'pointer' }}>
                      <input type="checkbox" checked={fields.includes(f)} onChange={() => toggleField(f)} />
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Button size="sm" variant="ghost" onClick={selectAllFields}>Select All</Button>
                  <Button size="sm" variant="ghost" onClick={clearAllFields}>Clear All</Button>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <Button onClick={handleExportDownload} style={{ background: 'var(--primary)', color: 'white' }}>
                📥 Download Export
              </Button>
              <Button variant="ghost" onClick={() => setShowExport(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="card">
        <div style={{ padding: '20px 20px 0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
              Orders List
            </h2>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>
              Showing {paginatedOrders.length} of {filteredAndSortedOrders.length} orders
            </span>
          </div>
        </div>

        {filteredAndSortedOrders.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No orders found</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Get started by creating your first order'}
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <Link href="/dashboard/orders/new" className="btn btn-primary btn-md">
                Create First Order
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: '40px', paddingLeft: '20px' }}>
                      <input
                        type="checkbox"
                        checked={selectedOrders.size === paginatedOrders.length && paginatedOrders.length > 0}
                        onChange={handleSelectAll}
                        style={{ cursor: 'pointer' }}
                      />
                    </TableHead>
                    <TableHead 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => handleSort('id')}
                    >
                      Order # {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => handleSort('date')}
                    >
                      Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => handleSort('customer')}
                    >
                      Customer {sortConfig.key === 'customer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => handleSort('total')}
                    >
                      Total {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => handleSort('status')}
                    >
                      Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead style={{ textAlign: "right", paddingRight: '20px' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id} style={{ background: selectedOrders.has(order.id) ? 'color-mix(in oklab, var(--primary) 4%, transparent)' : 'transparent' }}>
                      <TableCell style={{ paddingLeft: '20px' }}>
                        <input
                          type="checkbox"
                          checked={selectedOrders.has(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      <TableCell>
                        <span style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '13px' }}>
                          {order.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span style={{ color: 'var(--muted)' }}>
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span style={{ fontWeight: 500 }}>
                          {order.customer}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span style={{ fontWeight: 600, fontSize: '15px' }}>
                          ${order.total.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{renderStatus(order.status)}</TableCell>
                      <TableCell style={{ paddingRight: '20px' }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="btn btn-ghost btn-sm"
                            style={{ fontSize: '12px' }}
                          >
                            👁️ View
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{ 
                              background: 'color-mix(in oklab, #ef4444 10%, transparent)', 
                              color: '#ef4444',
                              border: '1px solid color-mix(in oklab, #ef4444 20%, transparent)',
                              fontSize: '12px'
                            }}
                            onClick={() => handleDelete(order.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="mobile-table-container">
              {paginatedOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="mobile-table-card"
                  style={{ 
                    background: selectedOrders.has(order.id) ? 'color-mix(in oklab, var(--primary) 4%, transparent)' : 'var(--surface)',
                    border: selectedOrders.has(order.id) ? '2px solid color-mix(in oklab, var(--primary) 40%, transparent)' : '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '14px' }}>
                        {order.id}
                      </span>
                    </div>
                    {renderStatus(order.status)}
                  </div>
                  
                  <div className="mobile-table-row">
                    <span className="mobile-table-label">Customer</span>
                    <span className="mobile-table-value" style={{ fontWeight: 500 }}>{order.customer}</span>
                  </div>
                  
                  <div className="mobile-table-row">
                    <span className="mobile-table-label">Date</span>
                    <span className="mobile-table-value" style={{ color: 'var(--muted)' }}>
                      {new Date(order.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="mobile-table-row">
                    <span className="mobile-table-label">Total</span>
                    <span className="mobile-table-value" style={{ fontWeight: 700, fontSize: '16px', color: 'var(--primary)' }}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="btn btn-ghost btn-sm"
                      style={{ flex: 1, fontSize: '12px', justifyContent: 'center' }}
                    >
                      👁️ View Details
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm"
                      style={{ 
                        background: 'color-mix(in oklab, #ef4444 10%, transparent)', 
                        color: '#ef4444',
                        border: '1px solid color-mix(in oklab, #ef4444 20%, transparent)',
                        fontSize: '12px',
                        padding: '6px 12px'
                      }}
                      onClick={() => handleDelete(order.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ padding: '20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </Button>
                  
                  {/* Page numbers */}
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          style={{
                            padding: '6px 12px',
                            border: currentPage === page ? '1px solid var(--primary)' : '1px solid var(--border)',
                            background: currentPage === page ? 'var(--primary)' : 'transparent',
                            color: currentPage === page ? 'white' : 'var(--foreground)',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
