const userName = "Shahroz";
let selectedVoice = null;

// Load available voices and select a female voice
function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = voices.find(voice => voice.name.includes("Google UK English Female") || voice.name.includes("Google US English Female")) || voices[0];
}

// Event listener for voices changed
window.speechSynthesis.onvoiceschanged = loadVoices;

// Function to handle user input
function handleUserInput() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.getElementById('typing-indicator');

    if (!userInput) return;

    // Display user message
    appendMessage(userInput, 'user');

    // Show typing indicator
    typingIndicator.style.display = 'block';

    // Generate bot response after a short delay to mimic typing
    setTimeout(() => {
        typingIndicator.style.display = 'none'; // Hide typing indicator

        const botResponse = getBotResponse(userInput); // Get bot response
        appendMessage(botResponse, 'bot'); // Display bot message

        speak(botResponse); // Speak the bot response

        // Clear input field
        document.getElementById('user-input').value = '';

        // Scroll to the bottom of chat
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // Simulate a 1 second typing delay
}

// Function to append message to chat
function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
}

// Function to generate bot response
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("workout") || input.includes("exercise")) {
        return `Here's a workout plan for you, ${userName}:\n\n- Monday: Chest and Triceps\n- Tuesday: Back and Biceps\n- Wednesday: Shoulders and Abs\n- Thursday: Legs\n- Friday: Cardio and Abs\n- Saturday: Full Body Workout\n- Sunday: Rest`;
    } else if (input.includes("diet") || input.includes("meal plan")) {
        return `Here's a diet plan for you, ${userName}:\n\n- Breakfast: Oatmeal with fruits and nuts\n- Snack: Protein shake\n- Lunch: Grilled chicken with quinoa and vegetables\n- Snack: Greek yogurt with honey\n- Dinner: Salmon with brown rice and steamed broccoli\n- Pre-Bed: Cottage cheese with berries`;
    } else if (input.includes("hi") || input.includes("hello")) {
        return `Hello ${userName}! How can I help you today?`;
    } else if (input.includes("who are you")) {
        return `I'm Lucy, your virtual assistant here to help you, ${userName}`;
    } else if (input.includes("play antidote by karan aujla")) {
        window.open('https://www.youtube.com/watch?v=JgDnA28O4ho', '_blank');
        return "Playing 'Antidote' by Karan Aujla for you.";
    } else if (input.includes("current time")) {
        return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (input.includes("thanks")) {
        return `You're welcome, ${userName}!`;
    } else if (input.includes("date")) {
        return `Today's date is ${new Date().toLocaleDateString()}.`;
    } else {
        return "I didn't understand that. Can you try asking something else?";
    }
}

// Function to speak the bot response
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    window.speechSynthesis.speak(speech);
}

// Function to start listening via speech recognition
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user-input').value = transcript;
        handleUserInput(); // Automatically handle the input after speaking
    };

    nition.start();
}
