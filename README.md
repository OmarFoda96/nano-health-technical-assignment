# Advanced Product Management Dashboard

A responsive, multi-language web application built with Angular 20, TypeScript, and NgRx, integrating with the Fake Store API for a comprehensive product management experience.

## 🚀 Features

### Core Functionality
- **Product Listing**: Responsive grid layout with advanced filtering, searching, and sorting
- **Product Details**: Comprehensive product information with interactive features
- **Shopping Cart**: Full cart management with quantity controls and persistence
- **Favorites**: Save and manage favorite products with localStorage persistence
- **Multi-language Support**: English and Spanish with dynamic language switching

### Advanced Features
- **State Management**: NgRx with actions, reducers, selectors, and effects
- **Performance Optimizations**: OnPush change detection, trackBy functions, and efficient rendering
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Loading States**: Skeleton loaders and progress indicators
- **Responsive Design**: Mobile-first approach with Material Design components
- **API Integration**: Fake Store API with caching and retry mechanisms

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── models/             # TypeScript interfaces and models
│   │   ├── services/           # API services and business logic
│   │   ├── interceptors/       # HTTP interceptors for logging and error handling
│   │   └── store/              # NgRx store implementation
│   │       ├── products/       # Product state management
│   │       ├── cart/           # Cart state management
│   │       └── favorites/      # Favorites state management
│   ├── shared/                 # Reusable components and utilities
│   │   └── components/         # Shared UI components
│   ├── features/               # Feature modules
│   │   ├── products/           # Product listing and detail pages
│   │   ├── cart/               # Shopping cart functionality
│   │   └── favorites/          # Favorites management
│   └── assets/i18n/            # Internationalization files
└── environments/               # Environment configurations
```

### State Management (NgRx)

#### Products Store
- **Actions**: Load products, categories, product details, filtering, sorting
- **Reducers**: Handle state updates for products, categories, filters, pagination
- **Selectors**: Computed selectors for filtered products, pagination, loading states
- **Effects**: API calls with retry logic and error handling

#### Cart Store
- **Actions**: Add/remove items, update quantities, clear cart
- **Reducers**: Manage cart items, totals, and item counts
- **Selectors**: Cart state selectors for UI components
- **Effects**: localStorage persistence for cart data

#### Favorites Store
- **Actions**: Add/remove favorites, toggle favorite status
- **Reducers**: Manage favorite product IDs
- **Selectors**: Favorite status and count selectors
- **Effects**: localStorage persistence for favorites

### Component Architecture

#### Shared Components
- **HeaderComponent**: Navigation with language switcher and cart/favorites counters
- **ProductCardComponent**: Reusable product display with actions
- **SearchBarComponent**: Debounced search input with clear functionality
- **SortDropdownComponent**: Sorting options with direction control
- **CategoryFilterComponent**: Category selection with chip-based UI
- **PaginationComponent**: Advanced pagination with page info
- **LoadingSpinnerComponent**: Configurable loading indicators
- **ErrorMessageComponent**: Error display with retry functionality

#### Feature Components
- **ProductListPageComponent**: Main product listing with filters and pagination
- **ProductDetailPageComponent**: Detailed product view with actions
- **CartPageComponent**: Shopping cart management interface
- **FavoritesPageComponent**: Favorites collection display

## 🛠️ Technology Stack

### Frontend
- **Angular 20**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development with strict mode
- **Angular Material**: Material Design components and theming
- **NgRx**: State management with effects and devtools
- **RxJS**: Reactive programming with observables
- **SCSS**: Advanced CSS with variables and mixins

### Development Tools
- **Angular CLI**: Project scaffolding and build tools
- **Karma & Jasmine**: Unit testing framework
- **Protractor**: E2E testing (configured)
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting

### External APIs
- **Fake Store API**: Product data and categories
  - Products: `GET https://fakestoreapi.com/products`
  - Categories: `GET https://fakestoreapi.com/products/categories`
  - Product Detail: `GET https://fakestoreapi.com/products/{id}`
  - Products by Category: `GET https://fakestoreapi.com/products/category/{name}`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v20 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nano-health-technical-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm run watch`: Build and watch for changes
- `npm test`: Run unit tests
- `npm run e2e`: Run end-to-end tests

## 🌐 Internationalization (i18n)

The application supports two languages:
- **English** (default)
- **Spanish**

### Language Files
- `src/assets/i18n/en.json`: English translations
- `src/assets/i18n/es.json`: Spanish translations

### Adding New Languages
1. Create a new JSON file in `src/assets/i18n/`
2. Add the language configuration to `app.config.ts`
3. Update the language switcher component

## 🎨 Styling and Theming

### Material Design
- Custom theme with primary, accent, and warn colors
- Responsive breakpoints for mobile, tablet, and desktop
- Consistent spacing and typography

### SCSS Architecture
- Global styles in `app.scss`
- Component-specific styles with BEM methodology
- CSS Grid and Flexbox for layouts
- Mobile-first responsive design

## 🔧 Performance Optimizations

### Angular Optimizations
- **OnPush Change Detection**: Reduces unnecessary change detection cycles
- **TrackBy Functions**: Optimizes *ngFor loops for better performance
- **Lazy Loading**: Feature modules loaded on demand
- **Standalone Components**: Reduced bundle size and faster loading

### State Management Optimizations
- **Memoized Selectors**: Prevent unnecessary recalculations
- **Immutable Updates**: Efficient state updates with NgRx
- **Effect Optimization**: Proper effect cleanup and subscription management

### API Optimizations
- **Caching**: In-memory caching with TTL for API responses
- **Retry Logic**: Automatic retry with exponential backoff
- **Error Handling**: Graceful error recovery and user feedback

## 🧪 Testing

### Unit Tests
- Component testing with Angular Testing Utilities
- Service testing with mocked dependencies
- Store testing with NgRx Testing utilities
- Selector testing for state management

### E2E Tests
- Protractor configuration for end-to-end testing
- User journey testing for critical paths
- Cross-browser compatibility testing

### Test Coverage
- Aim for 80%+ code coverage
- Focus on critical business logic
- Test error scenarios and edge cases

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly interface elements
- Optimized grid layouts for small screens
- Reduced data usage with efficient API calls
- Fast loading with optimized images

## 🔒 Security Considerations

### Data Protection
- No sensitive data stored in localStorage
- Input validation and sanitization
- XSS protection with Angular's built-in security

### API Security
- HTTPS-only API calls
- Error message sanitization
- Rate limiting considerations

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
- `environment.ts`: Development configuration
- `environment.prod.ts`: Production configuration

### Build Optimization
- Tree shaking for unused code elimination
- Minification and compression
- Asset optimization
- Bundle analysis

## 🔮 Future Improvements

### Planned Features
- **User Authentication**: Login/logout functionality
- **Order Management**: Complete checkout process
- **Product Reviews**: User review system
- **Advanced Search**: Elasticsearch integration
- **Real-time Updates**: WebSocket integration
- **PWA Support**: Progressive Web App features

### Performance Enhancements
- **Virtual Scrolling**: For large product lists
- **Image Optimization**: WebP format and lazy loading
- **Service Worker**: Offline functionality
- **CDN Integration**: Global content delivery

### Developer Experience
- **Storybook**: Component documentation
- **Automated Testing**: CI/CD pipeline
- **Code Quality**: Automated linting and formatting
- **Performance Monitoring**: Real-time performance tracking

## 📚 API Documentation

### Fake Store API Endpoints

#### Get All Products
```http
GET https://fakestoreapi.com/products
```

#### Get Product by ID
```http
GET https://fakestoreapi.com/products/{id}
```

#### Get Categories
```http
GET https://fakestoreapi.com/products/categories
```

#### Get Products by Category
```http
GET https://fakestoreapi.com/products/category/{category}
```

### Error Handling
- HTTP status code handling
- Network error recovery
- User-friendly error messages
- Retry mechanisms for failed requests

## 🤝 Contributing

### Development Guidelines
1. Follow Angular style guide
2. Use TypeScript strict mode
3. Write comprehensive tests
4. Document complex functions
5. Follow Git commit conventions

### Code Review Process
1. Create feature branch
2. Implement changes with tests
3. Submit pull request
4. Address review feedback
5. Merge after approval

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Developer**: Advanced Angular development with 7+ years experience
- **Architecture**: Scalable and maintainable code structure
- **Performance**: Optimized for speed and user experience
- **Testing**: Comprehensive test coverage and quality assurance

---

**Built with ❤️ using Angular 20, TypeScript, and modern web technologies**