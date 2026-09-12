"use client";

import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [packages, setPackages] = useState([]);
  const [activePackage, setActivePackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPackages(true);
  }, []);

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
        // Automatically set the first package active if none selected
        setActivePackage(prev => prev || JSON.parse(JSON.stringify(data[0] || null)));
      } else {
        console.error("API returned error:", data);
        setPackages([]);
        alert("Failed to load packages from database. Please ensure your MongoDB credentials are correct and the server has been restarted.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    if (isInitial) setCheckingAuth(false);
  };

  const handlePackageSelect = (pkg) => {
    // Clone to avoid mutating original state before save
    setActivePackage(JSON.parse(JSON.stringify(pkg)));
    setSidebarOpen(false); // Close mobile drawer
    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePriceChange = (type, value) => {
    setActivePackage(prev => ({
      ...prev,
      pricing: {
        ...(prev.pricing || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleDurationChange = (type, value) => {
    setActivePackage(prev => ({
      ...prev,
      duration: {
        ...(prev.duration || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleRoutePlanChange = (index, field, value) => {
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan[index] = { ...updatedPlan[index], [field]: value };
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const removeRouteDay = (index) => {
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan.splice(index, 1);
    // Re-adjust day numbers
    updatedPlan.forEach((day, i) => { day.day = i + 1; });
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const addRouteDay = () => {
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
        alert(`Package "${activePackage.title}" updated successfully!`);
        fetchPackages(); // Refresh list
      } else {
        alert("Failed to update package");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving");
    }
    setSaving(false);
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
          <p className={styles.loginSubtitle}>Sign in to manage packages & pricing</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Secure Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <button type="submit">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Mobile Top Bar with Selected Package & Switch Button */}
      <div className={styles.mobileControlBar}>
        <div className={styles.mobileSelectedInfo}>
          <span className={styles.mobileSelectedLabel}>Editing Package</span>
          <span className={styles.mobileSelectedTitle}>
            {activePackage ? activePackage.title : "No Package Selected"}
          </span>
        </div>
        <button 
          className={styles.mobileToggleBtn} 
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Packages ({packages.length})
        </button>
      </div>

      {/* Backdrop for Mobile Slide-Out Drawer */}
      <div 
        className={`${styles.backdrop} ${sidebarOpen ? styles.backdropActive : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar List (Permanent on desktop, Drawer on mobile) */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 className={styles.sidebarTitle}>Tour Packages</h3>
            <span className={styles.sidebarCount}>{packages.length}</span>
          </div>
          <button 
            className={styles.closeSidebarBtn}
            onClick={() => setSidebarOpen(false)}
          >
            ✕ Close
          </button>
        </div>
        <div className={styles.packageList}>
          {loading ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b" }}>
              <div className={styles.spinner} style={{ margin: "0 auto 0.5rem auto", width: 24, height: 24 }} />
              Loading packages...
            </div>
          ) : packages.length === 0 ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#ef4444" }}>
              No packages found in database.
            </div>
          ) : (
            packages.map(pkg => (
              <button 
                key={pkg.id} 
                className={`${styles.packageItem} ${activePackage?.id === pkg.id ? styles.packageItemActive : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <h4 className={styles.itemTitle}>{pkg.title}</h4>
                <p className={styles.itemMeta}>{pkg.type} • {pkg.duration?.days || 0} Days / {pkg.duration?.nights || 0} Nights</p>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Editor Panel (Main Screen Update Form) */}
      <div className={styles.editorPanel}>
        {!activePackage ? (
          <div className={styles.emptyState}>
            Select a package from the list to edit its pricing and route plan.
          </div>
        ) : (
          <div>
            <div className={styles.editorHeader}>
              <div>
                <h2 className={styles.editorTitle}>{activePackage.title}</h2>
                <div className={styles.editorTagline}>
                  <span className={styles.tagBadge}>ID: {activePackage.id}</span>
                  <span>•</span>
                  <span>{activePackage.type || "Tour"}</span>
                </div>
              </div>
              <button 
                className={styles.saveBtn} 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "✓ Save Changes"}
              </button>
            </div>

            {/* Duration Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>⏱️ Duration</h3>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Days</label>
                  <input 
                    type="number" 
                    value={activePackage.duration?.days || 0} 
                    onChange={(e) => handleDurationChange('days', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nights</label>
                  <input 
                    type="number" 
                    value={activePackage.duration?.nights || 0} 
                    onChange={(e) => handleDurationChange('nights', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>💰 Package Pricing (PKR)</h3>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Solo / Per Person Rate (PKR)</label>
                  <input 
                    type="number" 
                    value={activePackage.pricing?.solo || 0} 
                    onChange={(e) => handlePriceChange('solo', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Couple Rate (PKR)</label>
                  <input 
                    type="number" 
                    value={activePackage.pricing?.couple || 0} 
                    onChange={(e) => handlePriceChange('couple', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Route Plan Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>🗺️ Route Plan (Itinerary)</h3>
              
              {(activePackage.routePlan || []).map((day, index) => (
                <div key={index} className={styles.routeDayCard}>
                  <div className={styles.dayHeader}>
                    <span className={styles.dayBadge}>Day {day.day}</span>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => removeRouteDay(index)}
                      type="button"
                    >
                      ✕ Remove Day
                    </button>
                  </div>
                  
                  <div className={styles.formGroup} style={{ marginBottom: '0.85rem' }}>
                    <label>Day Title</label>
                    <input 
                      type="text" 
                      value={day.title || ""} 
                      onChange={(e) => handleRoutePlanChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Day Description</label>
                    <textarea 
                      rows={3}
                      value={day.description || ""} 
                      onChange={(e) => handleRoutePlanChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              
              <button className={styles.addDayBtn} onClick={addRouteDay} type="button">
                + Add Another Day to Route Plan
              </button>
            </div>
            
            {/* Action Footer */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className={styles.saveBtn} 
                onClick={handleSave}
                disabled={saving}
                style={{ minWidth: '220px' }}
              >
                {saving ? "Saving Changes..." : "✓ Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
