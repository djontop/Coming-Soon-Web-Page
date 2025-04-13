const countdown = () => {
    const countDate = new Date("May 1, 2025 00:00:00").getTime();
  
    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;
  
    if (gap <= 0) {
      document.querySelector('.countdown-container').innerText = "The website is live!";
      return;
    }
  
    const millisecond = 1;
    const second = millisecond * 1000;
    const minutes = second * 60;
    const hour = minutes * 60;
    const day = hour * 24;
  
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinutes = Math.floor((gap % hour) / minutes);
    const textSecond = Math.floor((gap % minutes) / second);
    document.querySelector('.day').innerText = textDay;
    document.querySelector('.hour').innerText = textHour;
    document.querySelector('.minutes').innerText = textMinutes;
    document.querySelector('.seconds').innerText = textSecond;
  };
  
  setInterval(countdown, 250);
  
  const fetchRandomQuote = () => {
    const localQuotes = [
      "The only way to do great work is to love what you do.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Innovation distinguishes between a leader and a follower.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "The best way to predict the future is to create it."
    ];
  
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    return localQuotes[randomIndex];
  };
  
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  const updateDailyQuote = () => {
    const quoteContainer = document.querySelector('.quote-container');
    if (!quoteContainer) {
      console.error('Quote container element not found');
      return;
    }
  
    try {
      const dailyQuote = fetchRandomQuote();
      quoteContainer.innerText = dailyQuote;
    } catch (error) {
      console.error('Error updating quote:', error);
      quoteContainer.innerText = "Wisdom is coming soon...";
    }
  };
  
  const toggleBulb = () => {
    const body = document.body;
    const bulbButton = document.getElementById('bulbButton');
  
    body.classList.toggle('bulb-on');
    const isBulbOn = body.classList.contains('bulb-on');
  
    bulbButton.innerText = isBulbOn ? '💡 OFF' : '💡 ON';
  
    localStorage.setItem('bulbState', isBulbOn ? 'on' : 'off');
  
    body.style.filter = isBulbOn ? 'brightness(1)' : 'brightness(0.5)';
  };
  
  
  
  const initializeBulbState = () => {
    const body = document.body;
    const bulbState = localStorage.getItem('bulbState');
  
    if (bulbState === 'on') {
      body.classList.add('bulb-on');
    } else {
      body.classList.add('bulb-off');
    }
  };
  
  
  initializeBulbState();
  updateDailyQuote();
  
  // Execute these when the window loads to ensure DOM is ready
  window.addEventListener('load', () => {
    updateDailyQuote();
  });
  
  setInterval(updateDailyQuote, 24 * 60 * 60 * 1000); // 24 hours
  