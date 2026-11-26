# Software & Geospatial Data Portals Setup Guide

Welcome to **CE452: Geographic Information Systems (GIS) Laboratory**. Before starting your practical sessions, you must complete the software installation and register accounts on the official geospatial portals listed below.

---

## 💻 1. Core Desktop GIS Software Installation

### QGIS (Quantum GIS) — Desktop Workstation
We use **QGIS Long Term Release (LTR)** or **QGIS 3.x / 4.x**. QGIS is free, open-source, and cross-platform.

:::steps
1. **Download QGIS**:
   - Go to the official QGIS download page: [https://qgis.org/download/](https://qgis.org/download/)
   - For Windows users, choose the **QGIS Standalone Installer (64-bit)** or **OSGeo4W Network Installer**.
   - macOS and Linux users can install via official packages or Homebrew.
2. **Install with Default Options**:
   - Run the installer. Leave all default components selected (including GDAL, PROJ, and Python 3 bindings).
3. **Verify Installation**:
   - Launch QGIS from the start menu.
   - Expand **XYZ Tiles** in the Browser Panel and double-click **OpenStreetMap**.
   - If the global basemap renders smoothly, your environment is ready.
:::

---

## 🌐 2. Mandatory Geospatial Data Portals & Account Registrations

All students must register, create a login, and set a password on each of the following four primary portals. You will download real-world satellite imagery, elevation data, toposheets, and vector layers from these platforms throughout the semester.

### 🛰️ 1. Copernicus Data Space Ecosystem (CDSE)
- **Agency**: European Space Agency (ESA) / European Commission
- **Key Datasets**: Multispectral Sentinel-2 imagery (10 m visible and NIR bands), Sentinel-1 Synthetic Aperture Radar (SAR), Copernicus DEM (30 m global elevation model).
- **Direct Registration URL**:  
  👉 [https://identity.dataspace.copernicus.eu/auth/realms/CDSE/login-actions/registration?client_id=sh-5f8b630b-b083-49ed-b340-b8f01ecb81c4&tab_id=O11f_Rgkwh8&client_data=eyJydSI6Imh0dHBzOi8vYnJvd3Nlci5kYXRhc3BhY2UuY29wZXJuaWN1cy5ldS8_em9vbT03JmxhdD0xNy4zNDAxNSZsbmc9NzkuNzkzNyZ0aGVtZUlkPURFRkFVTFQtVEhFTUUmZGF0YXNldElkPVMyX0wyQV9DREFTJmRlbVNvdXJjZTNEPSUyMk1BUFpFTiUyMiZjbG91ZENvdmVyYWdlPTMwJmRhdGVNb2RlPVNJTkdMRSZwYW5lbD1sYXllcnMiLCJydCI6ImNvZGUiLCJybSI6ImZyYWdtZW50Iiwic3QiOiJmZTYxZWMxNC1kZTFjLTQ0OTItODUxMy0wODMwZTFhZmVjNjcifQ](https://identity.dataspace.copernicus.eu/auth/realms/CDSE/login-actions/registration?client_id=sh-5f8b630b-b083-49ed-b340-b8f01ecb81c4&tab_id=O11f_Rgkwh8&client_data=eyJydSI6Imh0dHBzOi8vYnJvd3Nlci5kYXRhc3BhY2UuY29wZXJuaWN1cy5ldS8_em9vbT03JmxhdD0xNy4zNDAxNSZsbmc9NzkuNzkzNyZ0aGVtZUlkPURFRkFVTFQtVEhFTUUmZGF0YXNldElkPVMyX0wyQV9DREFTJmRlbVNvdXJjZTNEPSUyMk1BUFpFTiUyMiZjbG91ZENvdmVyYWdlPTMwJmRhdGVNb2RlPVNJTkdMRSZwYW5lbD1sYXllcnMiLCJydCI6ImNvZGUiLCJybSI6ImZyYWdtZW50Iiwic3QiOiJmZTYxZWMxNC1kZTFjLTQ0OTItODUxMy0wODMwZTFhZmVjNjcifQ)
- **Student Action**: Complete registration with your institutional email ID. Verify via email confirmation. Bookmark the Copernicus Browser at `browser.dataspace.copernicus.eu`.

---

### 🇮🇳 2. ISRO Bhoonidhi Portal
- **Agency**: National Remote Sensing Centre (NRSC), Indian Space Research Organisation (ISRO)
- **Key Datasets**: Indian Remote Sensing (IRS) satellite data including Cartosat-1/2, Resourcesat-1/2 (AWiFS, LISS-III, LISS-IV), Oceansat, EOS-04 C-band SAR, and soil moisture products.
- **Direct Registration URL**:  
  👉 [https://bhoonidhi.nrsc.gov.in/bhoonidhi/registration.html](https://bhoonidhi.nrsc.gov.in/bhoonidhi/registration.html)
- **Student Action**: Fill in personal and institutional details. Note your username and password in your lab fieldbook.

---

### 🗺️ 3. Survey of India (SOI) Online Maps Portal
- **Agency**: Survey of India, Department of Science & Technology (DST), Govt. of India
- **Key Datasets**: Official Open Series Maps (OSM) toposheets at 1:50,000 scale and 1:25,000 scale as free PDF downloads across all Indian states and districts.
- **Direct Registration URL**:  
  👉 [https://onlinemaps.surveyofindia.gov.in/StepsForRegistration.aspx](https://onlinemaps.surveyofindia.gov.in/StepsForRegistration.aspx)
- **Toposheet Search & Download Page**:  
  👉 [https://onlinemaps.surveyofindia.gov.in/FreeMapSpecification.aspx](https://onlinemaps.surveyofindia.gov.in/FreeMapSpecification.aspx)
- **Student Action**: Register with mobile number and email OTP verification. Once logged in, you can download up to 3 toposheets per day free of cost.

---

### 🌐 4. OpenStreetMap (OSM)
- **Agency**: OpenStreetMap Foundation
- **Key Datasets**: Free, crowdsourced, editable geographic vector data across the globe (road networks, building footprints, waterways, administrative boundaries, points of interest).
- **Direct Registration URL**:  
  👉 [https://www.openstreetmap.org/user/new](https://www.openstreetmap.org/user/new)
- **Student Action**: Create your mapper account. This will be used in Lab 11 and Lab 15 with the `QuickOSM` plugin and Overpass API to query and extract vector GIS features directly into QGIS.

---

## 🌟 3. Supplementary Engineering Portals & Web-GIS Services

For hydrological modeling, terrain analysis, and civil engineering projects, register on these supplementary platforms:

| Portal | Host Organization | Purpose & Data Types | Access Link |
|---|---|---|---|
| **ISRO Bhuvan** | NRSC / ISRO | Download CartoDEM (30 m elevation model of India), LULC layers, and geoportal thematic WMS services. | [bhuvan.nrsc.gov.in](https://bhuvan.nrsc.gov.in/) |
| **USGS EarthExplorer** | United States Geological Survey (USGS) | Global SRTM 1 Arc-Second (30 m) DEM, Landsat 8/9 OLI/TIRS satellite imagery, ASTER GDEM. | [earthexplorer.usgs.gov](https://earthexplorer.usgs.gov/) |
| **NASA Earthdata & ASF Vertex** | NASA / Alaska Satellite Facility | High-resolution terrain-corrected SAR datasets (ALOS PALSAR, Sentinel-1 RTC). | [search.asf.alaska.edu](https://search.asf.alaska.edu/) |
| **India-WRIS** | Ministry of Jal Shakti / CWC | National watershed boundaries, river reaches, CWC gauge-discharge stations, dam locations, and reservoirs. | [indiawris.gov.in](https://indiawris.gov.in/) |

---

## 📂 4. Recommended Directory Organization for Lab Exercises

Create a dedicated folder on your local drive (e.g., `D:\CE452_GIS_Lab\` or `C:\Users\<Name>\GIS_Lab\`) with the following sub-structure:

```
GIS_Lab/
├── Toposheets/           # Scanned and downloaded SOI PDF toposheets
├── Rasters/              # Satellite images (Sentinel-2, Landsat), DEMs
├── Vectors/              # Shapefiles (.shp), GeoPackages (.gpkg), GeoJSONs
├── Georeferenced/        # Output rectified GeoTIFFs (.tif) and GCP reports
├── Layouts/              # Exported high-resolution map PDFs and PNGs
└── Projects/             # QGIS project files (.qgz)
```

> [!TIP] File Naming Convention
> Never use spaces or special characters in GIS file names or folder paths (e.g. use `G45E7_78A7_georef.tif` instead of `G45E7 78A7 georef (1).tif`). Some GDAL and GRASS tools fail when encountering spaces in directory paths.
