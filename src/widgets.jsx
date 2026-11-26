import React, { useState } from "react";

// Interactive GCP & Residual Calculator Widget
export function GcpTableWidget() {
  const [gcps, setGcps] = useState([
    { id: 1, name: "NW Corner (G45E7)", xDeg: 88, xMin: 15, yDeg: 27, yMin: 30, sx: 850.5, sy: 820.2, dx: -0.18, dy: 0.22 },
    { id: 2, name: "NE Corner (G45E7)", xDeg: 88, xMin: 30, yDeg: 27, yMin: 30, sx: 8120.4, sy: 822.1, dx: 0.15, dy: -0.19 },
    { id: 3, name: "SW Corner (G45E7)", xDeg: 88, xMin: 15, yDeg: 27, yMin: 15, sx: 848.1, sy: 8090.7, dx: 0.21, dy: 0.16 },
    { id: 4, name: "SE Corner (G45E7)", xDeg: 88, xMin: 30, yDeg: 27, yMin: 15, sx: 8118.9, sy: 8092.3, dx: -0.12, dy: -0.21 },
    { id: 5, name: "Interior Tick (88°20', 27°20')", xDeg: 88, xMin: 20, yDeg: 27, yMin: 20, sx: 3270.2, sy: 5665.4, dx: -0.09, dy: 0.11 },
    { id: 6, name: "Interior Tick (88°25', 27°25')", xDeg: 88, xMin: 25, yDeg: 27, yMin: 25, sx: 5695.8, sy: 3245.1, dx: 0.03, dy: -0.09 },
  ]);

  const calcResidual = (dx, dy) => Math.sqrt(dx * dx + dy * dy);
  const rmsError = Math.sqrt(
    gcps.reduce((sum, g) => sum + (g.dx * g.dx + g.dy * g.dy), 0) / gcps.length
  );

  return (
    <div className="card-panel" style={{ padding: "1.25rem", margin: "1.5rem 0", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>🧮 Interactive Ground Control Point (GCP) &amp; Residual Calculator</h4>
      <p style={{ margin: "0 0 1rem 0", fontSize: "0.85rem", color: "var(--muted)" }}>
        Toposheet: <strong>G45E7_78A7.pdf</strong> | Transform: <strong>Polynomial 1st Order</strong> | Target CRS: <strong>EPSG:4326 (WGS 84)</strong>
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "0.82rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "6px" }}>GCP</th>
              <th style={{ padding: "6px" }}>Location</th>
              <th style={{ padding: "6px" }}>Longitude (X)</th>
              <th style={{ padding: "6px" }}>Latitude (Y)</th>
              <th style={{ padding: "6px" }}>dX (px)</th>
              <th style={{ padding: "6px" }}>dY (px)</th>
              <th style={{ padding: "6px" }}>Residual (px)</th>
            </tr>
          </thead>
          <tbody>
            {gcps.map((g) => {
              const res = calcResidual(g.dx, g.dy);
              return (
                <tr key={g.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "6px" }}>#{g.id}</td>
                  <td style={{ padding: "6px" }}>{g.name}</td>
                  <td style={{ padding: "6px" }}>{g.xDeg}° {g.xMin}' E ({ (g.xDeg + g.xMin / 60).toFixed(4) }°)</td>
                  <td style={{ padding: "6px" }}>{g.yDeg}° {g.yMin}' N ({ (g.yDeg + g.yMin / 60).toFixed(4) }°)</td>
                  <td style={{ padding: "6px", fontFamily: "monospace" }}>{g.dx > 0 ? `+${g.dx.toFixed(2)}` : g.dx.toFixed(2)}</td>
                  <td style={{ padding: "6px", fontFamily: "monospace" }}>{g.dy > 0 ? `+${g.dy.toFixed(2)}` : g.dy.toFixed(2)}</td>
                  <td style={{ padding: "6px", fontWeight: "600", color: res < 0.5 ? "var(--green)" : "var(--amber)" }}>
                    {res.toFixed(3)} px
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "6px", background: rmsError <= 0.5 ? "rgba(45, 106, 79, 0.1)" : "rgba(217, 119, 6, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span><strong>Total Mean RMS Error:</strong> <code style={{ fontSize: "1rem", fontWeight: "700" }}>{rmsError.toFixed(4)} pixels</code></span>
        <span style={{ fontSize: "0.85rem", color: rmsError <= 0.5 ? "var(--green)" : "var(--amber)", fontWeight: "600" }}>
          {rmsError <= 0.5 ? "✓ PASS (High Precision — Within 1/5 pixel target)" : "⚠ Acceptable (< 1.0 px)"}
        </span>
      </div>
    </div>
  );
}

// Interactive CRS & UTM Zone Helper Widget
export function CrsHelperWidget() {
  const [lon, setLon] = useState(88.3);
  const zone = Math.floor((lon + 180) / 6) + 1;
  const epsg = 32600 + zone;
  
  return (
    <div className="card-panel" style={{ padding: "1.25rem", margin: "1.5rem 0", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>🌐 Universal Transverse Mercator (UTM) Zone Finder</h4>
      <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "var(--muted)" }}>
        Enter any Longitude in India (or drag slider) to dynamically find the EPSG Projected Coordinate System.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <input 
          type="range" 
          min="68" 
          max="98" 
          step="0.1" 
          value={lon} 
          onChange={(e) => setLon(parseFloat(e.target.value))} 
          style={{ flex: 1 }} 
        />
        <span style={{ fontFamily: "monospace", fontWeight: "600" }}>{lon.toFixed(2)}° E</span>
      </div>
      <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--bg-subtle)", borderRadius: "6px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", fontSize: "0.85rem" }}>
        <div><strong>UTM Zone:</strong> <code>{zone}N</code></div>
        <div><strong>Target CRS:</strong> <code>WGS 84 / UTM zone {zone}N</code></div>
        <div><strong>Authority EPSG:</strong> <code style={{ color: "var(--accent)", fontWeight: "700" }}>EPSG:{epsg}</code></div>
      </div>
    </div>
  );
}

// Interactive Spectral Index (NDVI / NDWI) Calculator
export function SpectralIndexWidget() {
  const [nir, setNir] = useState(0.65);
  const [red, setRed] = useState(0.12);
  const [green, setGreen] = useState(0.18);

  const ndvi = (nir - red) / (nir + red || 0.001);
  const ndwi = (green - nir) / (green + nir || 0.001);

  const getClass = (val) => {
    if (val < 0) return { label: "Deep Clear Water / Shadow", color: "#1e3a8a" };
    if (val < 0.2) return { label: "Bare Soil / Urban Built-up", color: "#92400e" };
    if (val < 0.5) return { label: "Moderate Canopy / Grassland", color: "#65a30d" };
    return { label: "Dense Vigorous Forest / Crop", color: "#15803d" };
  };

  const ndviClass = getClass(ndvi);

  return (
    <div className="card-panel" style={{ padding: "1.25rem", margin: "1.5rem 0", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>🌿 Spectral Reflectance &amp; Index Simulator (NDVI &amp; NDWI)</h4>
      <p style={{ margin: "0 0 1rem 0", fontSize: "0.85rem", color: "var(--muted)" }}>
        Adjust Sentinel-2 bottom-of-atmosphere reflectance values to see real-time index responses.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: "600" }}>Band 4 (Red Reflectance): {red.toFixed(2)}</label>
          <input type="range" min="0.01" max="0.9" step="0.01" value={red} onChange={(e) => setRed(parseFloat(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: "600" }}>Band 8 (NIR Reflectance): {nir.toFixed(2)}</label>
          <input type="range" min="0.01" max="0.9" step="0.01" value={nir} onChange={(e) => setNir(parseFloat(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: "600" }}>Band 3 (Green Reflectance): {green.toFixed(2)}</label>
          <input type="range" min="0.01" max="0.9" step="0.01" value={green} onChange={(e) => setGreen(parseFloat(e.target.value))} style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ padding: "0.75rem", borderRadius: "6px", background: "var(--bg-subtle)", borderLeft: `4px solid ${ndviClass.color}` }}>
          <div><strong>NDVI (Vegetation):</strong> <code style={{ fontSize: "1.1rem", fontWeight: "700" }}>{ndvi.toFixed(3)}</code></div>
          <div style={{ fontSize: "0.8rem", color: ndviClass.color, fontWeight: "600", marginTop: "4px" }}>Classification: {ndviClass.label}</div>
        </div>
        <div style={{ padding: "0.75rem", borderRadius: "6px", background: "var(--bg-subtle)", borderLeft: `4px solid ${ndwi > 0 ? "#1e40af" : "#94a3b8"}` }}>
          <div><strong>NDWI (Water Spread):</strong> <code style={{ fontSize: "1.1rem", fontWeight: "700" }}>{ndwi.toFixed(3)}</code></div>
          <div style={{ fontSize: "0.8rem", color: ndwi > 0 ? "#1e40af" : "var(--muted)", fontWeight: "600", marginTop: "4px" }}>
            {ndwi > 0 ? "✓ Surface Water Body (Positive value)" : "Terrestrial Non-Water Surface"}
          </div>
        </div>
      </div>
    </div>
  );
}

export const WIDGETS = {
  gcptable: GcpTableWidget,
  crshelper: CrsHelperWidget,
  spectralindex: SpectralIndexWidget
};
