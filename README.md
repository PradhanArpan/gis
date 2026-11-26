# CE452 — Geographic Information Systems (GIS) Laboratory
[![GitHub Pages](https://img.shields.io/badge/Live_Portal-GitHub_Pages-blue.svg)](https://pradhanarpan.github.io/gis/)
[![Course](https://img.shields.io/badge/Course-CE452_GIS_Laboratory-gold.svg)](https://pradhanarpan.github.io/gis/)
[![Credits](https://img.shields.io/badge/Credits-0--0--2_(2)-green.svg)](https://pradhanarpan.github.io/gis/)

Official course delivery portal and computational repository for **CE452: Geographic Information Systems Laboratory**, offered in the Civil Engineering curriculum at the School of Engineering and Technology, Christ University, Bengaluru. Instructor: **Dr Sirisha Uppaluri**, Co-Instructor: **Dr Arpan Pradhan**.

---

## 🌐 Live Interactive Portal
Access the student course portal directly on GitHub Pages:  
👉 **[https://pradhanarpan.github.io/gis/](https://pradhanarpan.github.io/gis/)**

---

## 📚 Course Overview
- **Course Code:** CE452
- **Course Title:** Geographic Information Systems Laboratory
- **Department:** Department of Civil Engineering, Christ University
- **Credits:** 2 (L: 0, T: 0, P: 2)
- **Contact Hours:** 30 Practical Laboratory Hours
- **Evaluation Scheme:** Continuous Internal Assessment (CIA: 70 Marks) | End Semester Examination (ESE: 30 Marks) | Total: 100 Marks

### Course Outcomes (COs)
- **CO1:** Georeference scanned topographical mapsheets and spatial rasters to standard geodetic datums (WGS 84) and projected coordinate systems (UTM). *(L3 - Apply)*
- **CO2:** Digitize, edit, and maintain topological integrity of spatial vector datasets in QGIS and OGC GeoPackage formats. *(L3 - Apply)*
- **CO3:** Perform vector and raster spatial geoprocessing, attribute querying, and multi-criteria decision overlay analysis (AHP-GIS). *(L4 - Analyze)*
- **CO4:** Process digital elevation models (DEM) for hydrological catchment delineation, stream network extraction, and terrain morphometry. *(L4, L5 - Evaluate)*
- **CO5:** Ingest, pre-process, and classify multispectral satellite imagery (Sentinel-2 / Landsat) and extract spectral indices (NDVI, NDWI, NDBI). *(L4, L5 - Create)*

---

## 🗺️ Hands-on 15-Week Laboratory Syllabus

| Week | Lab ID | Exercise Title & Practical Focus | Core Software / Plugin | Primary Dataset |
|:---:|:---:|:---|:---|:---|
| **W1** | **[L01](labs/L01.md)** | **Georeferencing Survey of India Toposheets in QGIS**<br>Neatline coordinate registration, 1st order polynomial rectification, GCP residual minimization, GeoTIFF creation. | QGIS Georeferencer | `G45E7_78A7.pdf` (1:50k SOI Toposheet) |
| **W2** | **[L02](labs/L02.md)** | **QGIS Environment Setup & Web Basemap Integration**<br>XYZ Tiles, QuickMapServices, OpenStreetMap, Google Hybrid, and ESRI World Imagery. | QGIS Desktop, QuickMapServices | Global XYZ Tile Services |
| **W3** | **[L03](labs/L03.md)** | **Vector Data Creation, Digitization & Snapping Rules**<br>Point, Line, Polygon GeoPackage creation, snapping tolerances, vertex editing, topology. | QGIS Vector Editor | `campus_infrastructure.gpkg` |
| **W4** | **[L04](labs/L04.md)** | **Attribute Table Operations & Field Calculator**<br>Geometric calculations (`$area`, `$length`), conditional SQL expressions, and table joins. | QGIS Field Calculator | Vector Attribute Tables |
| **W5** | **[L05](labs/L05.md)** | **Coordinate Reference Systems & Projection Transformation**<br>Geographic 2D (EPSG:4326) to Projected UTM (EPSG:32643 / 32645), on-the-fly CRS. | GDAL Warp / Reproject | Reprojected rasters and vectors |
| **W6** | **[L06](labs/L06.md)** | **Vector Spatial Analysis: Buffer, Overlay & Geoprocessing**<br>River setback buffers, spatial intersection, dissolve, clip, and Voronoi/Thiessen polygons. | QGIS Geoprocessing | Infrastructure & hazard vectors |
| **W7** | **[L07](labs/L07.md)** | **Thematic Cartography, Symbology & Print Layout Design**<br>Categorized & graduated choropleth styling, Print Layout composer, dynamic scale bar, north arrow, grid. | QGIS Print Layout Composer | District thematic vectors |
| **W8** | **[L08](labs/L08.md)** | **DEM Processing: Slope, Aspect, Hillshade & Contours**<br>Terrain morphometry, 3D relief hillshading, slope in % and degrees, 10 m contour extraction. | GDAL DEM Analysis | CartoDEM 30m / SRTM 1 Arc-Second |
| **W9** | **[L09](labs/L09.md)** | **Hydrological Watershed & Drainage Network Delineation**<br>Sink filling (Wang & Liu), D8 flow direction, flow accumulation, stream order, catchment boundary. | SAGA / GRASS Hydrology | Hydro-conditioned DEM raster |
| **W10** | **[L10](labs/L10.md)** | **Multispectral Satellite Data Pre-processing & Band Compositing**<br>Copernicus Sentinel-2 L2A band stacking (B02, B03, B04, B08), True Color (4-3-2), False Color (8-4-3). | GDAL Build Virtual Raster | Copernicus Sentinel-2 L2A |
| **W11** | **[L11](labs/L11.md)** | **Spectral Indices Computation: NDVI, NDWI & NDBI**<br>Raster calculator normalized ratios, crop vigor mapping, lake water spread extraction, thresholding. | QGIS Raster Calculator | Sentinel-2 Spectral Bands |
| **W12** | **[L12](labs/L12.md)** | **Supervised & Unsupervised Satellite Image Classification**<br>Semi-Automatic Classification Plugin (SCP), training ROIs, Maximum Likelihood, confusion matrix, Kappa. | QGIS SCP Plugin | Sentinel-2 Multispectral Stack |
| **W13** | **[L13](labs/L13.md)** | **Spatial Interpolation: IDW, Spline & Ordinary Kriging**<br>Point rainfall/groundwater interpolation, continuous surface modeling, RMSE cross-validation. | QGIS / SAGA Interpolation | Observation stations CSV |
| **W14** | **[L14](labs/L14.md)** | **Multi-Criteria Decision Analysis (AHP-GIS) for Siting**<br>Analytical Hierarchy Process (AHP), pairwise comparison matrix, standardized raster weighted overlay. | QGIS Raster Overlay | Environmental & engineering rasters |
| **W15** | **[L15](labs/L15.md)** | **Web GIS, OpenStreetMap Extraction & Capstone GeoPackage**<br>QuickOSM Overpass API queries, compiling portable OGC GeoPackages, GeoJSON export. | QuickOSM, OGC GeoPackage | OpenStreetMap Vector Features |

---

## 🛠️ Automated Verification & Build Suite

To build the client-side bundle and verify the integrity of all course files:

1. **Build the Portal Bundle**:
   ```bash
   node tools/build.js
   ```
2. **Run the Full Verification Suite**:
   ```bash
   python tools/verify_all.py
   ```
3. Ensure zero errors and zero warnings are reported.

---

## 🌐 Official Portals for Course Data Downloads
All students must maintain active credentials on these portals:
- **Copernicus Data Space Ecosystem (CDSE)**: [dataspace.copernicus.eu](https://dataspace.copernicus.eu/)
- **ISRO Bhoonidhi**: [bhoonidhi.nrsc.gov.in](https://bhoonidhi.nrsc.gov.in/)
- **Survey of India Online Maps**: [onlinemaps.surveyofindia.gov.in](https://onlinemaps.surveyofindia.gov.in/)
- **OpenStreetMap**: [www.openstreetmap.org](https://www.openstreetmap.org/)
- **ISRO Bhuvan**: [bhuvan.nrsc.gov.in](https://bhuvan.nrsc.gov.in/)
- **USGS EarthExplorer**: [earthexplorer.usgs.gov](https://earthexplorer.usgs.gov/)
