// ============================================
// JAVASCRIPT LEARNING: DOM, EVENTS & ASYNC/AWAIT
// ============================================

// ============================================
// PART 1: DOM MANIPULATION
// ============================================
/*
 * DOM (Document Object Model) is a tree-like representation of HTML elements
 * JavaScript can access and modify any element, attribute, or style
 * 
 * Common DOM Methods:
 * - getElementById() - Get element by ID
 * - querySelector() - Get first matching element
 * - querySelectorAll() - Get all matching elements
 * - createElement() - Create new HTML element
 * - appendChild() - Add element to parent
 * - removeChild() - Remove element from parent
 * - textContent / innerHTML - Change element content
 * - classList.add/remove/toggle - Modify CSS classes
 * - style.property - Change CSS styles
 */

// Wait for DOM to load before manipulating it
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Manipulation Examples ==========
    
    // Get references to elements
    const box1 = document.getElementById('box1');
    // console.log(box1);
    const app = document.getElementById('app');
    // console.log(app);
    const box2 = document.getElementById('box2');
    // console.log(box2[0].textContent);

    const box3 = document.getElementById('box3');


    const boxes = document.getElementsByClassName('box');
    console.log(boxes);

    
    
    // Change text content
    // document.getElementById('changeTextBtn').addEventListener('click', function() {
    //     // textContent is safer - only changes text, not HTML
    //     box1.textContent = 'Text changed! Current time: ' + new Date().toLocaleTimeString();
    //     console.log('Text changed using textContent');
    // });

    document.getElementById('changeTextBtn').addEventListener('click', () =>{
        for(let box of boxes){
            box.textContent = "Text changed!";
            box.style.color = 'red';
        }
        // boxes.style.color = 'red';
    })
    
    // Change color using style property
    document.getElementById('changeColorBtn').addEventListener('click', function() {
        // Generate random color
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
        // const randomColor = colors[Math.floor(Math.random() * colors.length)];
        box1.style.backgroundColor = '#4ecdc4';
        box1.style.color = 'white';
        console.log('Color changed to:', randomColor);
    });
    
    // Add CSS class
    document.getElementById('addClassBtn').addEventListener('click', function() {
        box1.classList.add('highlight');
        box2.classList.add('highlight');
        box3.classList.add('highlight');
        console.log('Added highlight class');
    });
    
    // Remove CSS class
    document.getElementById('removeClassBtn').addEventListener('click', function() {
        box1.classList.remove('highlight');
        box2.classList.remove('highlight');
        box3.classList.remove('highlight');
        console.log('Removed highlight class');
    });
    
    // Create new element dynamically
    let boxCounter = 4;
    document.getElementById('createElementBtn').addEventListener('click', function() {
        // Create new div element
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.id = `box${boxCounter}`;
        newBox.textContent = `Box ${boxCounter} - Created dynamically!`;
        
        // Add to parent element
        app.appendChild(newBox);
        boxCounter++;
        console.log('New box created and added to DOM');
    });
    
    // Remove element
    document.getElementById('removeElementBtn').addEventListener('click', function() {
        const boxes = document.querySelectorAll('.box');
        if (boxes.length > 0) {
            const lastBox = boxes[boxes.length - 1];
            app.removeChild(lastBox);
            console.log('Last box removed from DOM');
        } else {
            console.log('No boxes to remove');
        }
    });
    
    
    // ============================================
    // PART 2: EVENT HANDLING
    // ============================================
    /*
     * Events are user interactions or browser actions
     * Common events: click, input, keydown, keyup, mouseover, mouseout, etc.
     * 
     * Event Listener Syntax:
     * element.addEventListener('event', function() { ... })
     * 
     * Event Object:
     * - Contains information about the event
     * - event.target - element that triggered event
     * - event.type - type of event
     * - event.preventDefault() - prevent default behavior
     */
    
    // ========== Click Event ==========
    let clickCount = 0;
    const clickMeBtn = document.getElementById('clickMeBtn');
    const clickCountDisplay = document.getElementById('clickCount');
    const clickdec = document.getElementById('clickdec');
    
    clickMeBtn.addEventListener('click', function(event) {
        clickCount++;
        clickCountDisplay.textContent = `Click count: ${clickCount}`;
        console.log('Button clicked!', event);
        console.log('Event target:', event.target);
        console.log('Event type:', event.type);
    });

    clickdec.addEventListener('click', function(event) {
        clickCount--;
        clickCountDisplay.textContent = `Click count: ${clickCount}`;
        console.log('Button clicked!', event);
        console.log('Event target:', event.target);
        console.log('Event type:', event.type);
    });

    


    // ========== Input Event ==========
    const textInput = document.getElementById('textInput');
    const typedText = document.getElementById('typedText');
    
    // Listen to input changes (fires on every keystroke)
    textInput.addEventListener('input', function(event) {
        const value = event.target.value;
        console.log(value);
        typedText.textContent = value || 'Nothing yet';
        console.log('Input changed:', value);
    });
    
    // ========== Keydown Event ==========
    textInput.addEventListener('keydown', function(event) {
        // Check if Enter key was pressed
        if (event.key === 'Enter') {
            console.log('Enter key pressed!');
            alert('You pressed Enter!');
        }
    });
    
    // ========== Mouse Events ==========
    const mouseArea = document.getElementById('mouseArea');
    const mouseCoords = document.getElementById('mouseCoords');
    
    // Track mouse movement
    mouseArea.addEventListener('mousemove', function(event) {
        // event.clientX and event.clientY give mouse coordinates
        mouseCoords.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
    });
    
    // Mouse enter event
    mouseArea.addEventListener('mouseenter', function() {
        mouseArea.style.backgroundColor = '#d0d0d0';
        console.log('Mouse entered the area');
    });
    
    // Mouse leave event
    mouseArea.addEventListener('mouseleave', function() {
        mouseArea.style.backgroundColor = '#e9ecef';
        console.log('Mouse left the area');
    });
    
    // ========== Event Delegation Example ==========
    // Instead of adding listeners to each box, add one to parent
    app.addEventListener('click', function(event) {
        // Check if clicked element is a box
        if (event.target.classList.contains('box')) {
            console.log('Box clicked:', event.target.id);
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    
    // ============================================
    // PART 3: ASYNC/AWAIT
    // ============================================
    /*
     * Async/Await makes asynchronous code look like synchronous code
     * 
     * async function - Function that returns a Promise
     * await - Waits for Promise to resolve before continuing
     * 
     * Benefits:
     * - Cleaner code than .then() chains
     * - Easier error handling with try/catch
     * - More readable
     * 
     * Remember:
     * - await can only be used inside async functions
     * - async functions always return a Promise
     */
    
    // ========== Basic Async/Await Example ==========
    const statusElement = document.getElementById('status');
    const userList = document.getElementById('userList');
    
    // Simulate API call with delay
    async function simulateAPICall(delay = 1000) {
        // Promise that resolves after delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: 'Data fetched successfully!', timestamp: new Date() });
            }, delay);
        });
    }
    
    // Fetch users from JSONPlaceholder (free fake API)
    async function fetchUsers() {
        try {
            statusElement.textContent = 'Loading...';
            statusElement.className = 'loading';
            userList.innerHTML = ''; // Clear previous results
            
            // await pauses execution until fetch completes
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            // Check if response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // await pauses until JSON parsing completes
            const users = await response.json();
            
            // Update DOM with results
            statusElement.textContent = `Fetched ${users.length} users successfully!`;
            statusElement.className = '';
            
            for(let user of users){
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                userList.appendChild(li);
            }
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                userList.appendChild(li);
            });
            
            console.log('Users fetched:', users);
            return users;
            
        } catch (error) {
            // Handle errors gracefully
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = 'error';
            console.error('Fetch error:', error);
        }
    }
    
    // Button to fetch users
    document.getElementById('fetchUsersBtn').addEventListener('click', fetchUsers);
    
    // ========== Async with Delay Example ==========
    async function fetchWithDelay() {
        try {
            statusElement.textContent = 'Waiting 2 seconds...';
            statusElement.className = 'loading';
            userList.innerHTML = '';
            
            // Wait for delay
            await simulateAPICall(2000);
            
            // Then fetch data
            await fetchUsers();
            
        } catch (error) {
            statusElement.textContent = `Error: ${error.message} ${error.status}`;
            statusElement.className = 'error';
            console.error('Error:', error);
        }
    }
    
    document.getElementById('fetchWithDelayBtn').addEventListener('click', fetchWithDelay);
    
    // ========== Multiple Async Requests ==========
    async function fetchMultipleData() {
        try {
            statusElement.textContent = 'Fetching multiple resources...';
            statusElement.className = 'loading';
            userList.innerHTML = '';
            
            // Fetch multiple things in parallel using Promise.all
            // All requests happen at the same time (faster!)
            const [usersResponse, postsResponse, todosResponse] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'),
                fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
            ]);
            
            // Parse all responses
            const [users, posts, todos] = await Promise.all([
                usersResponse.json(),
                postsResponse.json(),
                todosResponse.json()
            ]);
            
            statusElement.textContent = `Fetched: ${users.length} users, ${posts.length} posts, ${todos.length} todos`;
            statusElement.className = '';
            
            // Display users
            users.slice(0, 3).forEach(user => {
                const li = document.createElement('li');
                li.textContent = `👤 ${user.name}`;
                userList.appendChild(li);
            });
            
            console.log('All data fetched:', { users, posts, todos });
            
        } catch (error) {
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = 'error';
            console.error('Error:', error);
        }
    }
    
    document.getElementById('multipleRequestsBtn').addEventListener('click', fetchMultipleData);
    
    // ========== Async Function with Error Handling ==========
    async function exampleWithErrorHandling() {
        try {
            // This will fail (invalid URL)
            const response = await fetch('https://invalid-url-that-does-not-exist.com');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            // Catch block handles any errors
            console.error('Caught error:', error.message);
            // You can show error to user, retry, or handle gracefully
        }
    }
    
    // ========== Async/Await vs Promises Comparison ==========
    /*
     * OLD WAY (Promises with .then()):
     * fetch('url')
     *   .then(response => response.json())
     *   .then(data => console.log(data))
     *   .catch(error => console.error(error));
     * 
     * NEW WAY (Async/Await):
     * try {
     *   const response = await fetch('url');
     *   const data = await response.json();
     *   console.log(data);
     * } catch (error) {
     *   console.error(error);
     * }
     * 
     * Both do the same thing, but async/await is cleaner!
     */
    
    console.log('✅ All event listeners attached!');
    console.log('📚 Ready to learn DOM, Events, and Async/Await!');
});

// ============================================
// KEY TAKEAWAYS FOR STUDENTS
// ============================================
/*
 * DOM MANIPULATION:
 * 1. Always wait for DOM to load (DOMContentLoaded)
 * 2. Use querySelector/getElementById to get elements
 * 3. Modify content with textContent or innerHTML
 * 4. Change styles with style.property
 * 5. Add/remove classes with classList
 * 6. Create elements with createElement()
 * 
 * EVENTS:
 * 1. Use addEventListener() to attach event handlers
 * 2. Event object contains useful information
 * 3. Common events: click, input, keydown, mousemove
 * 4. Event delegation: attach listener to parent, check event.target
 * 
 * ASYNC/AWAIT:
 * 1. async function returns a Promise
 * 2. await pauses execution until Promise resolves
 * 3. Use try/catch for error handling
 * 4. Promise.all() for parallel requests
 * 5. await only works inside async functions
 */
