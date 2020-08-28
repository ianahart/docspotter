const cookieContainer = document.querySelector('.cookie-container');
const cookieButton = document.querySelector('.cookie-btn');

const addCookie = () => {
  cookieContainer.classList.remove('active');
  localStorage.setItem('cookieBannerDisplayed', true);
};

cookieButton.addEventListener('click', addCookie, { once: true });

setTimeout(() => {
  if (!localStorage.getItem('cookieBannerDisplayed')) {
    cookieContainer.classList.add('active');
  }
}, 2000);
