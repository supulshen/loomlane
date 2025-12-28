/**
 * LOOM & LANE - INTELLIGENT CHATBOT
 * Rule-based chatbot for customer support
 */

class LoomLaneChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.init();
  }

  /**
   * Initialize chatbot
   */
  init() {
    this.createChatWidget();
    this.setupEventListeners();
    this.greet();
  }

  /**
   * Create chat widget HTML
   */
  createChatWidget() {
    const chatHTML = `
      <div id="chatbot-container" class="chatbot-container">
        <!-- Chat Toggle Button -->
        <button id="chatToggleBtn" class="chat-toggle-btn" aria-label="Toggle chat">
          <i class="fas fa-comment-dots"></i>
          <span class="chat-notification-badge" style="display: none;">1</span>
        </button>

        <!-- Chat Window -->
        <div id="chatWindow" class="chat-window" style="display: none;">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="d-flex align-items-center">
              <div class="chat-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="ms-2">
                <h6 class="mb-0">Loom & Lane Assistant</h6>
                <small class="text-white-50">Always here to help</small>
              </div>
            </div>
            <button class="chat-close-btn" onclick="chatbot.toggleChat()" aria-label="Close chat">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Chat Messages -->
          <div id="chatMessages" class="chat-messages"></div>

          <!-- Quick Actions -->
          <div id="quickActions" class="quick-actions">
            <button class="quick-action-btn" onclick="chatbot.handleQuickAction('shipping')">
              <i class="fas fa-shipping-fast"></i> Shipping Info
            </button>
            <button class="quick-action-btn" onclick="chatbot.handleQuickAction('branches')">
              <i class="fas fa-map-marker-alt"></i> Our Branches
            </button>
            <button class="quick-action-btn" onclick="chatbot.handleQuickAction('products')">
              <i class="fas fa-shopping-bag"></i> View Products
            </button>
            <button class="quick-action-btn" onclick="chatbot.handleQuickAction('contact')">
              <i class="fas fa-envelope"></i> Contact Us
            </button>
          </div>

          <!-- Chat Input -->
          <div class="chat-input-container">
            <input 
              type="text" 
              id="chatInput" 
              class="chat-input" 
              placeholder="Type your message..."
              aria-label="Chat message input">
            <button id="chatSendBtn" class="chat-send-btn" onclick="chatbot.sendMessage()" aria-label="Send message">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
    this.injectStyles();
  }

  /**
   * Inject chatbot styles
   */
  injectStyles() {
    const styles = `
      <style>
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9998;
          font-family: var(--font-body);
        }

        .chat-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), #E8B84D);
          color: white;
          border: none;
          box-shadow: 0 4px 20px rgba(200, 155, 60, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
          animation: pulse 2s infinite;
        }

        .chat-toggle-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(200, 155, 60, 0.6);
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(200, 155, 60, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(200, 155, 60, 0.7); }
        }

        .chat-notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #E74C3C;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce 0.5s ease;
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          max-width: calc(100vw - 40px);
          height: 550px;
          max-height: calc(100vh - 120px);
          background: var(--bg-secondary);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, var(--color-primary), #8B6F5F);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .chat-close-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: var(--bg-primary);
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: var(--bg-accent);
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: var(--color-accent);
          border-radius: 3px;
        }

        .chat-message {
          margin-bottom: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-message.bot {
          display: flex;
          gap: 0.5rem;
        }

        .chat-message.user {
          display: flex;
          justify-content: flex-end;
        }

        .bot-avatar {
          width: 32px;
          height: 32px;
          background: var(--color-accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .message-bubble {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          max-width: 75%;
          word-wrap: break-word;
        }

        .message-bubble.bot {
          background: var(--bg-secondary);
          color: var(--color-text);
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .message-bubble.user {
          background: var(--color-accent);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-time {
          font-size: 0.7rem;
          color: var(--color-text-light);
          margin-top: 0.25rem;
        }

        .quick-actions {
          padding: 0.75rem;
          background: var(--bg-accent);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          border-top: 1px solid var(--color-border);
        }

        .quick-action-btn {
          padding: 0.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          color: var(--color-text);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quick-action-btn:hover {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }

        .quick-action-btn i {
          font-size: 1rem;
        }

        .chat-input-container {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--color-border);
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: 24px;
          background: var(--bg-primary);
          color: var(--color-text);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input:focus {
          border-color: var(--color-accent);
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          background: var(--color-accent);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .chat-send-btn:hover {
          background: var(--color-primary);
          transform: scale(1.1);
        }

        .typing-indicator {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: var(--color-text-light);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }

        @media (max-width: 576px) {
          .chat-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
            bottom: 70px;
            right: 10px;
          }

          .chatbot-container {
            right: 10px;
            bottom: 10px;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Toggle button
    document.getElementById('chatToggleBtn').addEventListener('click', () => {
      this.toggleChat();
    });

    // Enter key to send
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  /**
   * Toggle chat window
   */
  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatWindow');
    const toggleBtn = document.getElementById('chatToggleBtn');
    const badge = document.querySelector('.chat-notification-badge');

    if (this.isOpen) {
      chatWindow.style.display = 'flex';
      toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
      if (badge) badge.style.display = 'none';
      document.getElementById('chatInput').focus();
    } else {
      chatWindow.style.display = 'none';
      toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    }
  }

  /**
   * Initial greeting
   */
  greet() {
    setTimeout(() => {
      this.addBotMessage("Hello! 👋 Welcome to Loom & Lane. I'm here to help you with any questions about our products, shipping, or store locations. How can I assist you today?");
    }, 1000);
  }

  /**
   * Add bot message
   */
  addBotMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const messageHTML = `
      <div class="chat-message bot">
        <div class="bot-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div>
          <div class="message-bubble bot">${message}</div>
          <div class="message-time">${time}</div>
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
    this.conversationHistory.push({ role: 'bot', message, time });
  }

  /**
   * Add user message
   */
  addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const messageHTML = `
      <div class="chat-message user">
        <div>
          <div class="message-bubble user">${message}</div>
          <div class="message-time text-end">${time}</div>
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
    this.conversationHistory.push({ role: 'user', message, time });
  }

  /**
   * Show typing indicator
   */
  showTyping() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingHTML = `
      <div class="chat-message bot typing-message">
        <div class="bot-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-bubble bot">
          <div class="typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    this.scrollToBottom();
  }

  /**
   * Hide typing indicator
   */
  hideTyping() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) typingMessage.remove();
  }

  /**
   * Scroll to bottom
   */
  scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Send message
   */
  sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addUserMessage(message);
    input.value = '';

    // Show typing
    this.showTyping();

    // Get bot response
    setTimeout(() => {
      this.hideTyping();
      const response = this.getResponse(message);
      this.addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  }

  /**
   * Handle quick actions
   */
  handleQuickAction(action) {
    let message = '';
    
    switch(action) {
      case 'shipping':
        message = 'Tell me about shipping';
        break;
      case 'branches':
        message = 'Where are your branches?';
        break;
      case 'products':
        message = 'Show me products';
        break;
      case 'contact':
        message = 'How do I contact you?';
        break;
    }

    document.getElementById('chatInput').value = message;
    this.sendMessage();
  }

  /**
   * Get bot response (rule-based)
   */
  getResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Shipping queries
    if (msg.includes('ship') || msg.includes('deliver') || msg.includes('delivery')) {
      return "🚚 We offer FREE shipping on orders over LKR 5,000! Standard delivery takes 2-5 business days within Sri Lanka. Orders are processed within 1-2 business days.";
    }

    // Branch/location queries
    if (msg.includes('branch') || msg.includes('location') || msg.includes('store') || msg.includes('where')) {
      return "📍 We have branches in:<br>• Colombo - 123 Galle Road<br>• Galle - 45 Lighthouse Street<br>• Kandy - 78 Peradeniya Road<br>• Kalutara - 56 Main Street<br>• Anuradhapura - 89 Sacred City Road<br><br>All branches are open 9 AM - 7 PM daily!";
    }

    // Product queries
    if (msg.includes('product') || msg.includes('item') || msg.includes('sell') || msg.includes('buy')) {
      return "🛍️ We offer authentic Sri Lankan handcrafted products including:<br>• Traditional Wear<br>• Home & Living<br>• Accessories<br>• Footwear<br>• Casual Wear<br><br>Would you like to <a href='products.html' style='color: var(--color-accent); text-decoration: underline;'>browse our collection</a>?";
    }

    // Return/refund queries
    if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
      return "🔄 We have a 30-day return policy! Items must be unused and in original packaging. Contact us within 30 days of delivery to initiate a return or exchange.";
    }

    // Payment queries
    if (msg.includes('payment') || msg.includes('pay') || msg.includes('cash') || msg.includes('card')) {
      return "💳 We currently accept Cash on Delivery (COD). Online payment options coming soon! Pay securely when your order arrives at your doorstep.";
    }

    // Contact queries
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('call')) {
      return "📞 You can reach us at:<br>• Email: hello@loomandlane.lk<br>• Phone: +94 11 234 5678<br>• WhatsApp: +94 77 123 4567<br><br>We respond within 24 hours!";
    }

    // Price queries
    if (msg.includes('price') || msg.includes('cost') || msg.includes('expensive') || msg.includes('cheap')) {
      return "💰 Our products range from LKR 2,000 to LKR 15,000. All items are handcrafted by local artisans and fairly priced. Check out our products page for detailed pricing!";
    }

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! 😊 How can I help you today? Feel free to ask about our products, shipping, branches, or anything else!";
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! 🙏 Is there anything else I can help you with?";
    }

    // Help
    if (msg.includes('help')) {
      return "I can help you with:<br>• Product information<br>• Shipping & delivery<br>• Our branch locations<br>• Returns & refunds<br>• Payment methods<br>• Contact information<br><br>What would you like to know?";
    }

    // Default response
    return "I understand you're asking about: \"" + userMessage + "\". Could you please rephrase or ask about:<br>• Products & categories<br>• Shipping information<br>• Branch locations<br>• Returns & refunds<br>• Payment methods<br><br>Or use the quick action buttons below!";
  }
}

// Initialize chatbot when DOM is ready
let chatbot;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    chatbot = new LoomLaneChatbot();
  });
} else {
  chatbot = new LoomLaneChatbot();
}
