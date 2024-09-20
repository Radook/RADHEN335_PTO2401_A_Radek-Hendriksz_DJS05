const stateStore = {
    state: { count: 0 },

    getState() {
        return this.state; // Return the current state
    },

    dispatch(action) {
        switch (action.type) {
            case 'ADD':
                this.setState({ count: this.state.count + 1 });
                break;
            case 'SUBTRACT':
                // Prevent count from going below 0
                if (this.state.count > 0) {
                    this.setState({ count: this.state.count - 1 });
                }
                break;
            case 'RESET':
                this.setState({ count: 0 });
                break;
            default:
                break;
        }
        console.log(this.state); // Log the updated state to the console once
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify(); // Notify listeners after state change
    },

    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
    },

    notify() {
        this.listeners.forEach((listener) => listener(this.state));
    },
};

// Step 3: Update action functions to use dispatch
function addAction() {
    stateStore.dispatch({ type: 'ADD' });
}

function subtractAction() {
    stateStore.dispatch({ type: 'SUBTRACT' });
}

function resetAction() {
    stateStore.dispatch({ type: 'RESET' });
}

// Update the UI to reflect the current count
function updateCountDisplay() {
    document.getElementById("count").innerText = stateStore.getState().count;
}

// Subscribe to state changes to update the UI
stateStore.subscribe(updateCountDisplay);

document.getElementById("increment").addEventListener("click", addAction);
document.getElementById("decrement").addEventListener("click", subtractAction);
document.getElementById("reset").addEventListener("click", resetAction);