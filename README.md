# Stickerbox

A Magic: The Gathering deckbox sticker designer tool.

## Running the project locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for production

```bash
npm run build
```

This will create a `dist` directory with the built application.

# Optimization Recommendations for Stickerbox

## Performance Optimizations

1. **Memoize Components and Functions**
   - Use `React.memo()` for components like `Sticker` and `ManaSymbolSelector` to prevent unnecessary re-renders
   - Use `useCallback()` for event handlers in App.tsx and StickerSheet.tsx
   - Use `useMemo()` for derived data like filtered or sorted stickers

2. **Optimize State Updates**
   - Batch state updates where possible
   - Consider using the function form of setState when the new state depends on the previous state

3. **Lazy Loading**
   - Implement lazy loading for components that aren't immediately visible
   - Consider code-splitting with React.lazy() and Suspense

4. **Image Optimization**
   - Optimize SVG and PNG files for faster loading
   - Consider using WebP format for better compression
   - Implement proper image sizing and responsive images

## Code Organization

1. **Folder Structure**
   - Organize components by feature or domain
   - Create separate folders for hooks, utils, types, and constants
   - Example structure:
     ```
     src/
     ├── components/
     │   ├── sticker/
     │   │   ├── Sticker.tsx
     │   │   ├── StickerSheet.tsx
     │   │   └── index.ts
     │   ├── editor/
     │   │   ├── Editor.tsx
     │   │   └── index.ts
     │   └── form/
     │       ├── ManaSymbolSelector.tsx
     │       ├── TextInput.tsx
     │       └── index.ts
     ├── hooks/
     │   ├── useStickers.ts
     │   └── usePrint.ts
     ├── utils/
     │   ├── manaSymbols.ts
     │   └── localStorage.ts
     ├── types/
     │   └── index.ts
     ├── constants/
     │   └── index.ts
     └── App.tsx
     ```

2. **Extract Custom Hooks**
   - Create a `useStickers` hook to manage sticker state and localStorage persistence
   - Create a `usePrint` hook to encapsulate printing functionality
   - Example:
     ```typescript
     // hooks/useStickers.ts
     export function useStickers() {
       const [stickers, setStickers] = useState<(StickerData | null)[]>(() => {
         // Load from localStorage logic
       });

       useEffect(() => {
         // Save to localStorage logic
       }, [stickers]);

       const updateSticker = (index: number, sticker: StickerData) => {
         // Update logic
       };

       const moveSticker = (fromIndex: number, toIndex: number) => {
         // Move logic
       };

       return { stickers, updateSticker, moveSticker };
     }
     ```

3. **Constants and Configuration**
   - Extract hardcoded values to constants
   - Create a configuration file for app settings
   - Example:
     ```typescript
     // constants/index.ts
     export const MANA_SYMBOLS = ['W', 'U', 'B', 'R', 'G', 'C'] as const;
     export const GUILD_NAMES = {
       WU: 'Azorius',
       WB: 'Orzhov',
       // ...
     };
     export const STICKER_DIMENSIONS = {
       width: '63.5mm',
       height: '38.1mm',
     };
     ```

## Type Safety Improvements

1. **Stricter TypeScript Configuration**
   - Enable stricter TypeScript checks in tsconfig.json
   - Add `"strict": true` and other strict flags

2. **Improve Type Definitions**
   - Use more specific types instead of generic ones
   - Add proper return types to all functions
   - Use discriminated unions for complex state

3. **Enum for Mana Symbols**
   - Replace string union type with enum for better type safety
   - Example:
     ```typescript
     export enum ManaSymbol {
       White = 'W',
       Blue = 'U',
       Black = 'B',
       Red = 'R',
       Green = 'G',
       Colorless = 'C',
     }
     ```

## Component Design Improvements

1. **Component Composition**
   - Break down larger components into smaller, reusable ones
   - Use composition over inheritance
   - Example: Split Sticker into StickerHeader, StickerContent, StickerFooter

2. **Prop Drilling Alternatives**
   - Use Context API for deeply nested components
   - Consider using a state management library for complex state

3. **Error Boundaries**
   - Implement error boundaries to catch and handle errors gracefully
   - Example:
     ```jsx
     // Simple error boundary example
     class ErrorBoundary extends React.Component {
       constructor(props) {
         super(props);
         this.state = { hasError: false };
       }

       static getDerivedStateFromError(error) {
         return { hasError: true };
       }

       render() {
         if (this.state.hasError) {
           return <div>Something went wrong.</div>;
         }
         return this.props.children;
       }
     }
     ```

## State Management Improvements

1. **Context API**
   - Implement React Context for global state
   - Example:
     ```jsx
     // context/StickersContext.jsx
     const StickersContext = React.createContext(undefined);

     export function StickersProvider({ children }) {
       const stickersState = useStickers();
       return (
         <StickersContext.Provider value={stickersState}>
           {children}
         </StickersContext.Provider>
       );
     }
     ```

2. **Reducer Pattern**
   - Use useReducer for complex state logic
   - Example:
     ```typescript
     type Action = 
       | { type: 'UPDATE_STICKER'; index: number; sticker: StickerData }
       | { type: 'MOVE_STICKER'; fromIndex: number; toIndex: number };

     function stickersReducer(state: (StickerData | null)[], action: Action) {
       switch (action.type) {
         case 'UPDATE_STICKER':
           // Update logic
         case 'MOVE_STICKER':
           // Move logic
       }
     }
     ```

3. **Immutable Updates**
   - Use immutable update patterns for better performance and predictability
   - Consider using a library like immer for complex state updates

## Code Quality Improvements

1. **Consistent Naming Conventions**
   - Use consistent naming for variables, functions, and components
   - Follow a style guide (e.g., Airbnb React/JSX Style Guide)

2. **Extract Repeated Logic**
   - DRY (Don't Repeat Yourself) principle
   - Extract repeated code into reusable functions or hooks

3. **Comments and Documentation**
   - Add JSDoc comments to functions and components
   - Document complex logic and business rules

4. **Unit Tests**
   - Add unit tests for components and utility functions
   - Consider using React Testing Library and Jest

## Accessibility Improvements

1. **Semantic HTML**
   - Use proper semantic HTML elements
   - Add ARIA attributes where necessary

2. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Add proper focus management

3. **Color Contrast**
   - Ensure sufficient color contrast for text
   - Don't rely solely on color to convey information

## Build and Deployment Optimizations

1. **Code Splitting**
   - Implement code splitting to reduce initial bundle size
   - Use dynamic imports for less frequently used components

2. **Tree Shaking**
   - Ensure unused code is eliminated during build
   - Use ES modules for better tree shaking

3. **Caching Strategy**
   - Implement proper caching for static assets
   - Use content hashing for cache busting

## Additional Features

1. **Undo/Redo Functionality**
   - Implement undo/redo for sticker edits
   - Use a command pattern or history state

2. **Sticker Templates**
   - Add predefined templates for common sticker types
   - Allow saving and loading custom templates

3. **Export/Import**
   - Add functionality to export stickers as JSON
   - Allow importing stickers from JSON

4. **Responsive Design**
   - Improve mobile experience
   - Add responsive breakpoints for different screen sizes
