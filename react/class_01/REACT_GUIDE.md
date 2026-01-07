# Complete React Learning Guide

## Table of Contents
1. [What is React?](#what-is-react)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Components](#components)
5. [Props](#props)
6. [State](#state)
7. [Event Handling](#event-handling)
8. [Conditional Rendering](#conditional-rendering)
9. [Lists and Keys](#lists-and-keys)
10. [Hooks](#hooks)
11. [Best Practices](#best-practices)

---

## What is React?

React is a JavaScript library for building user interfaces, especially web applications. It was created by Facebook (now Meta) and is one of the most popular frontend frameworks.

### Key Features:
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like, React handles the updates
- **Virtual DOM**: Efficient updates by comparing virtual representations
- **One-Way Data Flow**: Data flows down from parent to child components

---

## Getting Started

### Running the Project

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## Core Concepts

### 1. JSX (JavaScript XML)

JSX is a syntax extension that lets you write HTML-like code in JavaScript.

```jsx
// This is JSX
const element = <h1>Hello, World!</h1>;

// It gets compiled to:
const element = React.createElement('h1', null, 'Hello, World!');
```

**Rules:**
- Must return a single root element (or use Fragment `<>...</>`)
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Self-closing tags must have `/` (e.g., `<img />`)

### 2. Components

Components are reusable pieces of UI. There are two types:

#### Function Components (Modern - Recommended)

```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

#### Arrow Function Components

```jsx
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};
```

---

## Props

Props (properties) are how you pass data from parent to child components.

### Basic Props

```jsx
// Parent Component
function App() {
  return <Greeting name="John" age={25} />;
}

// Child Component
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

### Props with Default Values

```jsx
function Greeting({ name = "Guest", age = 0 }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Props Destructuring

```jsx
// Instead of:
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Use destructuring:
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

---

## State

State allows components to remember and update information over time.

### useState Hook

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### State Rules:
1. **Never mutate state directly**: `count++` ❌ → `setCount(count + 1)` ✅
2. **State updates are asynchronous**: Use functional updates for dependent state
3. **State is component-specific**: Each component has its own state

### Functional Updates

```jsx
// When new state depends on previous state
setCount(prevCount => prevCount + 1);
```

### Multiple State Variables

```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  // Or use an object:
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });
}
```

---

## Event Handling

React events are SyntheticEvents (wrappers around native events).

### Basic Event Handling

```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### Inline Event Handlers

```jsx
<button onClick={() => alert('Clicked!')}>Click Me</button>
```

### Event Parameters

```jsx
function Input() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  
  return <input onChange={handleChange} />;
}
```

### Common Events:
- `onClick` - Mouse clicks
- `onChange` - Input changes
- `onSubmit` - Form submission
- `onFocus` / `onBlur` - Focus events
- `onMouseEnter` / `onMouseLeave` - Mouse events

---

## Conditional Rendering

Show different UI based on conditions.

### if/else

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}
```

### Ternary Operator

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
    </div>
  );
}
```

### Logical AND (&&)

```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  );
}
```

---

## Lists and Keys

Render lists of items dynamically.

### Basic List

```jsx
function TodoList() {
  const todos = ['Learn React', 'Build App', 'Deploy'];
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

### Keys

Keys help React identify which items have changed. **Always use unique keys!**

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Key Rules:**
- Keys must be unique among siblings
- Don't use index as key if list can be reordered
- Keys don't get passed as props

---

## Hooks

Hooks are functions that let you "hook into" React features.

### useState (State Management)

```jsx
const [state, setState] = useState(initialValue);
```

### useEffect (Side Effects)

```jsx
import { useEffect } from 'react';

function Component() {
  useEffect(() => {
    // Runs after every render
    console.log('Component rendered');
    
    // Cleanup function (optional)
    return () => {
      console.log('Cleanup');
    };
  });
  
  useEffect(() => {
    // Runs only once on mount
  }, []);
  
  useEffect(() => {
    // Runs when dependency changes
  }, [dependency]);
}
```

### Common Use Cases:
- Fetching data
- Setting up subscriptions
- Manually changing the DOM
- Timers

### useContext (Context API)

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Component />
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
```

### Custom Hooks

Reusable logic can be extracted into custom hooks.

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## Best Practices

### 1. Component Structure

```jsx
// ✅ Good: Single responsibility
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad: Too much responsibility
function App() {
  // Don't put everything in one component
}
```

### 2. Naming Conventions

- Components: PascalCase (`UserCard`, `TodoList`)
- Functions: camelCase (`handleClick`, `getUserData`)
- Props: camelCase (`userName`, `isActive`)
- Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)

### 3. Props Validation

```jsx
import PropTypes from 'prop-types';

function Greeting({ name, age }) {
  return <h1>Hello, {name}! Age: {age}</h1>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};

Greeting.defaultProps = {
  age: 0
};
```

### 4. Performance Tips

- Use `React.memo()` for expensive components
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for function references
- Avoid creating objects/functions in render

### 5. Code Organization

```
src/
  components/
    Button/
      Button.jsx
      Button.css
    Card/
      Card.jsx
      Card.css
  hooks/
    useCounter.js
    useFetch.js
  utils/
    helpers.js
  App.jsx
  main.jsx
```

---

## Common Patterns

### Controlled Components

```jsx
function Input() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Lifting State Up

```jsx
// Share state between siblings by lifting to parent
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Display count={count} />
      <Controls setCount={setCount} />
    </div>
  );
}
```

### Composition vs Inheritance

```jsx
// ✅ Use composition
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h1>Title</h1>
      <p>Content</p>
    </Card>
  );
}
```

---

## Next Steps

1. **Practice**: Build small projects (Todo App, Calculator, etc.)
2. **Learn More**: React Router, State Management (Redux/Zustand)
3. **Advanced**: Performance optimization, Testing, TypeScript
4. **Resources**: 
   - [React Official Docs](https://react.dev)
   - [React Beta Docs](https://beta.react.dev)

---

## Quick Reference

### Component Template

```jsx
import { useState } from 'react';

function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  const handleEvent = () => {
    // Event handler logic
  };
  
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}

export default ComponentName;
```

### Common Patterns

```jsx
// Conditional class
<div className={`base-class ${isActive ? 'active' : ''}`}>

// Inline styles
<div style={{ color: 'red', fontSize: '20px' }}>

// Fragment
<>
  <Component1 />
  <Component2 />
</>
```

---

Happy Learning! 🚀

