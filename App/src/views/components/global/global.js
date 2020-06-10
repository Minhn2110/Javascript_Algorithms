import LazyLoad from 'vanilla-lazyload';

const Global = {
  lazyLoad: (thresDistance) => {
    const distance = thresDistance || 0;
    const myLazyLoad = new LazyLoad({
      elements_selector: '.lazy',
      threshold: distance,
      callback_enter: (element) => {
        element.classList.add('loaded');
      },
    });
    myLazyLoad.update();
  },

  fixBodyScrollWhenOpenModal: () => {
    document.querySelector('body').classList.add('modal-open');
  },

  removefixBodyScrollWhenCloseModal: () => {
    document.querySelector('body').classList.remove('modal-open');
  },

  isDeviceMobile: () => {
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || window.innerWidth <= 992
    ) {
      return true;
    }
    return false;
  },
};

export default Global;
