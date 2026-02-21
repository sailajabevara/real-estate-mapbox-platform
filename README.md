# Real Estate Platform with Mapbox & Puppeteer Integration Tests

## Project Overview

This project is a full-featured real estate web application built with React and Mapbox GL JS. It includes advanced geospatial search functionality and a complete Puppeteer-based integration testing suite.

The application demonstrates:

- Interactive Mapbox maps
- Property listing and property detail pages
- Geospatial filtering (radius-based and boundary-based search)
- Nearby amenities distance calculation using the Haversine formula
- Saved search functionality
- Dockerized setup for one-command execution
- Automated integration testing using Puppeteer

---

## Features

### Properties Listing (/properties)

- Interactive Mapbox map
- Property list view
- View toggle button
- Location autocomplete input
- Radius search slider
- Minimum and maximum price filters
- Bedrooms filter
- Draw boundary button
- Apply filters button
- Results count display
- Map markers for each property

### Property Detail Page (/properties/:id)

- Property title
- Property price
- Full address
- Property coordinates
- Embedded Mapbox map with marker
- Nearby amenities section
- Accurate distance calculation using the Haversine formula

### Saved Searches (/saved-searches)

- Save current filter state
- Load saved search
- Delete saved search
- Empty state display when no searches exist

---

## 🗂️ Project Structure

```
real-estate-platform/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Properties.jsx
│   │   ├── PropertyDetail.jsx
│   │   └── SavedSearches.jsx
│   ├── data/
│   │   ├── properties.json
│   │   └── amenities.json
│   └── App.jsx
│
├── tests/
│   └── integration/
│       ├── map-initialization.test.js
│       ├── location-autocomplete.test.js
│       ├── geospatial-search.test.js
│       ├── map-interactions.test.js
│       ├── property-filtering.test.js
│       └── saved-search.test.js
│
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.test
├── .env.example
├── package.json
└── README.md
```

---

## Mock Data

The application includes a local mock dataset:

- At least 30 properties
- Distributed across:
  - San Francisco
  - Los Angeles
  - New York

Each property follows the required schema:

- id
- title
- price
- address
- city
- state
- zipcode
- latitude
- longitude
- bedrooms
- bathrooms
- sqft
- propertyType
- yearBuilt
- lotSize
- images
- description
- features

An amenities dataset is also included for distance calculation.

---

## Geospatial Calculations

Distance between a property and nearby amenities is calculated using the Haversine formula:

```
distance = R * 2 * atan2(√a, √(1−a))
```

Where:

- R = 6371 km (Earth radius)
- a = trigonometric calculation based on latitude and longitude

This ensures accurate real-world distance measurement.

---

## Integration Testing

Puppeteer is used to simulate real browser interactions and validate application behavior.

Test coverage includes:

- Map initialization
- Map loaded indicator
- Marker rendering
- Location autocomplete behavior
- Radius-based geospatial filtering
- Polygon boundary filtering
- Marker click interaction
- Property list rendering
- Saved search load and delete functionality
- Nearby amenities distance validation

Test result outputs are generated in:

```
/test-results/
```

Required files:

- integration-report.json
- geospatial-test-summary.json
- screenshots/ (if failures occur)

---

## Environment Configuration

Create a `.env` file for development:

```
VITE_MAPBOX_ACCESS_TOKEN=your_real_mapbox_token
```

For evaluation/testing, `.env.example` contains:

```
MAPBOX_ACCESS_TOKEN=pk.test.mock-token-for-testing-purposes
MAPBOX_STYLE=mapbox://styles/mapbox/streets-v11
```

---

## Local Development Setup

Install dependencies:

```
npm install
```

Build the application:

```
npm run build
```

Preview the production build:

```
npm run preview
```

Application runs at:

```
http://localhost:3006
```

---

## Docker Setup

Build and start services:

```
docker-compose up -d --build
```

Stop services:

```
docker-compose down
```

Run integration tests inside Docker:

```
docker logs puppeteer-tests
```

The application will be accessible at:

```
http://localhost:3006
```

---

## Technologies Used

- React
- Mapbox GL JS
- Puppeteer
- Jest
- Docker
- Docker Compose
- JavaScript (ES6+)

---

## Core Requirements Implemented

- Dockerized application and testing services
- Environment configuration file
- Mock dataset with required distribution
- Required data-testid attributes for automated testing
- Map initialization and markers
- Advanced search filter panel
- Property detail page with map
- Nearby amenities distance calculation
- Saved searches functionality
- Complete integration test suite
- Test result file generation

---

## Author

Real Estate Platform – Geospatial Integration Project  
Built as part of an advanced frontend and integration testing evaluation task.