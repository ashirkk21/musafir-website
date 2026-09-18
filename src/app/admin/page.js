"use client";

import { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { 
  IconLogOut, 
  IconTrash2, 
  IconPlus, 
  IconLayoutDashboard, 
  IconPackage,
  IconCheck,
  IconCross,
  IconMapPin,
  IconClock
} from "@/components/Icons";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [packages, setPackages] = useState([]);
  const [activePackage, setActivePackage] = useState(null);
  const [originalPackage, setOriginalPackage] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    fetchPackages(true);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchPackages();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Incorrect password");
      }
    } catch (err) {
      setLoginError("Failed to connect to server");
    }
  };

  const handleLogout = async () => {
    // In a real app, you'd want a logout endpoint to clear the HTTP-only cookie.
    // For now, we'll force reload which might keep them logged in if cookie is still valid,
    // but typically we should call a logout API or redirect.
    window.location.href = "/";
  };

  const fetchPackages = async (isInitial = false) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        if (isInitial) setCheckingAuth(false);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setPackages(data);
        setIsAuthenticated(true);
        if (data.length > 0) {
          const firstPkg = JSON.parse(JSON.stringify(data[0]));
          setActivePackage(firstPkg);
          setOriginalPackage(JSON.parse(JSON.stringify(data[0])));
          setIsDirty(false);
        } else {
          setActivePackage(null);
          setOriginalPackage(null);
          setIsDirty(false);
        }
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    if (isInitial) setCheckingAuth(false);
  };

  const handlePackageSelect = (pkg) => {
    if (isDirty) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to discard them?")) return;
    }
    const clonedPkg = JSON.parse(JSON.stringify(pkg));
    setActivePackage(clonedPkg);
    setOriginalPackage(JSON.parse(JSON.stringify(pkg)));
    setIsDirty(false);
    setSidebarOpen(false);
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePriceChange = (type, value) => {
    setIsDirty(true);
    setActivePackage(prev => ({
      ...prev,
      pricing: {
        ...(prev.pricing || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleDurationChange = (type, value) => {
    setIsDirty(true);
    setActivePackage(prev => ({
      ...prev,
      duration: {
        ...(prev.duration || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleRoutePlanChange = (index, field, value) => {
    setIsDirty(true);
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan[index] = { ...updatedPlan[index], [field]: value };
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const requestRemoveRouteDay = (index) => {
    setDialog({
      title: "Remove Day",
      message: `Are you sure you want to remove Day ${activePackage.routePlan[index].day} from the itinerary?`,
      onConfirm: () => {
        removeRouteDay(index);
        setDialog(null);
      }
    });
  };

  const removeRouteDay = (index) => {
    setIsDirty(true);
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan.splice(index, 1);
    updatedPlan.forEach((day, i) => { day.day = i + 1; });
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const addRouteDay = () => {
    setIsDirty(true);
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan.push({
      day: updatedPlan.length + 1,
      title: "New Day",
      description: ""
    });
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const handleSave = async () => {
    if (!activePackage) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/packages/${activePackage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pricing: activePackage.pricing,
          routePlan: activePackage.routePlan,
          duration: activePackage.duration
        })
      });
      if (res.ok) {
        setOriginalPackage(JSON.parse(JSON.stringify(activePackage)));
        setIsDirty(false);
        showToast(`Package "${activePackage.title}" updated successfully!`);
        // We only fetchPackages if we want to ensure server sync, but local state is fine
        // fetchPackages(); 
      } else {
        showToast("Failed to update package", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while saving", "error");
    }
    setSaving(false);
  };

  const handleCancel = () => {
    if (originalPackage) {
      setActivePackage(JSON.parse(JSON.stringify(originalPackage)));
    }
    setIsDirty(false);
  };

  if (checkingAuth) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Loading Musafir Admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginCard}>
          <h2>Admin Portal</h2>
          <p className={styles.loginSubtitle}>Sign in to manage packages & itineraries</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              className={styles.loginInput}
              placeholder="Enter Secure Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <button className={styles.loginBtn} type="submit">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      
      {/* Backdrop for Mobile Sidebar */}
      <div 
        className={`${styles.backdrop} ${sidebarOpen ? styles.backdropActive : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <IconLayoutDashboard size={18} color="#fff" />
            </div>
            <h2 className={styles.brandName}>Musafir Admin</h2>
          </div>
          <button 
            className={styles.sidebarCloseBtn} 
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <IconCross size={20} />
          </button>
        </div>

        <div className={styles.packageListHeader}>
          <span>Tour Packages</span>
          <span className={styles.packageCount}>{packages.length}</span>
        </div>

        <div className={styles.packageList}>
          {loading ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b" }}>
              <div className={styles.spinner} style={{ margin: "0 auto 0.5rem auto", width: 24, height: 24 }} />
              Loading...
            </div>
          ) : packages.length === 0 ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#ef4444" }}>
              No packages found.
            </div>
          ) : (
            packages.map(pkg => (
              <button 
                key={pkg.id} 
                className={`${styles.packageItem} ${activePackage?.id === pkg.id ? styles.packageItemActive : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <h4 className={styles.itemTitle}>{pkg.title}</h4>
                <p className={styles.itemMeta}>
                  <IconPackage size={12} /> {pkg.type} • {pkg.duration?.days || 0}D/{pkg.duration?.nights || 0}N
                </p>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.mobileMenuBtn} 
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div className={styles.headerBreadcrumb}>
              <span>Admin</span>
              <span>/</span>
              {isDirty ? (
                <strong style={{ color: '#fbbf24' }}>Unsaved Changes</strong>
              ) : (
                <strong>{activePackage ? activePackage.title : "Dashboard"}</strong>
              )}
            </div>
          </div>
          <div className={styles.headerRight}>
            {activePackage && isDirty && (
              <>
                <button 
                  className={styles.cancelBtn} 
                  onClick={handleCancel}
                  disabled={saving}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <IconCross size={20} /> <span className={styles.cancelBtnText}>Cancel</span>
                </button>
                <button 
                  className={styles.saveBtn} 
                  onClick={handleSave}
                  disabled={saving}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', boxShadow: 'none' }}
                >
                  <IconCheck size={16} /> <span className={styles.saveBtnText}>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </>
            )}
            {!isDirty && (
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <IconLogOut size={16} /> <span className={styles.logoutBtnText}>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* Editor Area */}
        <div className={styles.editorScrollArea}>
          {!activePackage ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <IconLayoutDashboard size={32} />
              </div>
              <h3>No Package Selected</h3>
              <p>Select a package from the sidebar to edit pricing and itineraries.</p>
            </div>
          ) : (
            <div>
              <div className={styles.editorHeader}>
                <div>
                  <h2 className={styles.editorTitle}>{activePackage.title}</h2>
                  <div className={styles.editorMeta}>
                    <span className={styles.badgeId}>ID: {activePackage.id}</span>
                    <span className={styles.badgeType}>{activePackage.type || "Tour"}</span>
                  </div>
                </div>
              </div>

              {/* Duration Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <IconClock size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>Trip Duration</h3>
                </div>
                <div className={styles.grid2}>
                  <div className={styles.formGroup}>
                    <label>Days</label>
                    <input 
                      type="number" 
                      className={styles.input}
                      value={activePackage.duration?.days || 0} 
                      onChange={(e) => handleDurationChange('days', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nights</label>
                    <input 
                      type="number" 
                      className={styles.input}
                      value={activePackage.duration?.nights || 0} 
                      onChange={(e) => handleDurationChange('nights', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Rs</span>
                  </div>
                  <h3 className={styles.cardTitle}>Package Pricing (PKR)</h3>
                </div>
                <div className={styles.grid3}>
                  <div className={styles.formGroup}>
                    <label>Standard</label>
                    <input 
                      type="number" 
                      className={styles.input}
                      value={activePackage.pricing?.standard || 0} 
                      onChange={(e) => handlePriceChange('standard', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Deluxe</label>
                    <input 
                      type="number" 
                      className={styles.input}
                      value={activePackage.pricing?.deluxe || 0} 
                      onChange={(e) => handlePriceChange('deluxe', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Executive</label>
                    <input 
                      type="number" 
                      className={styles.input}
                      value={activePackage.pricing?.executive || 0} 
                      onChange={(e) => handlePriceChange('executive', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Route Plan Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <IconMapPin size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>Itinerary / Route Plan</h3>
                </div>
                
                <div className={styles.routeBuilder}>
                  {activePackage.routePlan && activePackage.routePlan.length > 0 ? (
                    activePackage.routePlan.map((day, index) => (
                      <div key={index} className={styles.routeDayCard}>
                        <div className={styles.dayIndicator}>
                          <span className={styles.dayLabel}>Day</span>
                          <span className={styles.dayNumber}>{day.day}</span>
                        </div>
                        <div className={styles.dayContent}>
                          <button 
                            className={styles.removeDayBtn}
                            onClick={() => requestRemoveRouteDay(index)}
                            title="Remove Day"
                          >
                            <IconTrash2 size={16} />
                          </button>
                          
                          <div className={styles.formGroup}>
                            <label>Day Title / Location</label>
                            <input 
                              type="text" 
                              className={styles.input}
                              value={day.title} 
                              onChange={(e) => handleRoutePlanChange(index, 'title', e.target.value)}
                              placeholder="e.g. Arrival in Skardu"
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label>Day Description</label>
                            <textarea 
                              className={`${styles.input} ${styles.textarea}`}
                              value={day.description} 
                              onChange={(e) => handleRoutePlanChange(index, 'description', e.target.value)}
                              placeholder="Describe the activities for this day..."
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#94a3b8" }}>No route plan exists for this package.</p>
                  )}
                  
                  <button className={styles.addDayBtn} onClick={addRouteDay}>
                    <IconPlus size={20} /> Add Another Day
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'error' ? styles.error : ''}`}>
          {toast.type === 'error' ? <IconTrash2 size={16} /> : <IconCheck size={16} />} 
          {toast.message}
        </div>
      )}

      {/* Confirmation Dialog */}
      {dialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h3>{dialog.title}</h3>
            <p>{dialog.message}</p>
            <div className={styles.dialogActions}>
              <button className={`${styles.dialogBtn} ${styles.dialogCancel}`} onClick={() => setDialog(null)}>Cancel</button>
              <button className={`${styles.dialogBtn} ${styles.dialogConfirm}`} onClick={dialog.onConfirm}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
