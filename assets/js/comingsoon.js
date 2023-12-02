const countdown = () => {
    const countDate = new Date("Dec 25, 2023 00:00:00").getTime();
  
    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;
  
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
  
  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error fetching daily quote:', error);
      return 'Error fetching quote';
    }
  };
  
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  const updateDailyQuote = async () => {
    const currentDate = getCurrentDate();
    let storedDate = localStorage.getItem('quoteDate');
      if (!storedDate || currentDate !== storedDate) {
      const dailyQuote = await fetchRandomQuote();
      document.querySelector('.quote-container').innerText = dailyQuote;
  
      localStorage.setItem('dailyQuote', dailyQuote);
      localStorage.setItem('quoteDate', currentDate);
    } else {
      const storedQuote = localStorage.getItem('dailyQuote');
      if (storedQuote) {
        document.querySelector('.quote-container').innerText = storedQuote;
      } else {
        const newDailyQuote = await fetchRandomQuote();
        document.querySelector('.quote-container').innerText = newDailyQuote;
        localStorage.setItem('dailyQuote', newDailyQuote);
      }
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
  
  setInterval(updateDailyQuote, 24 * 60 * 60 * 1000); // 24 hours
  