import page from 'page';

(async () => {
  const app = document.querySelector('#app');

  const homePage = app.querySelector('[data-page="home"]');
  const detailPage = app.querySelector('[data-page="detail"]');

  // Home page
  const skeleton = homePage.querySelector('.skeleton');
  const content = homePage.querySelector('.content');

  page('*', (ctx, next) => {
    homePage.hidden = true;
    detailPage.hidden = true;
    next();
  });

  page('/', async (ctx) => {
    const cardModule = await import('./components/Card.js');
    const { default: Card } = cardModule;

    const result = await fetch('/data/spacex.json');
    const data = await result.json();
  
    document.addEventListener('card-mounted', () => {
      skeleton.hidden = true;
      content.hidden = false;
    }, { once: true });
  
    content.innerHTML = '';

    const cards = data.map(({ image, placeholder, content: { title, description } }, idx) => {
      const card = Card;
      card.properties = {
        image: image,
        placeholder: placeholder,
        content: {
          title,
          description
        },
        idx
      };
  
      const renderedCard = card.render();
  
      content.appendChild(renderedCard);
      return renderedCard;
    });
  
    
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const placeholder = img.parentNode.querySelector('.placeholder');
          
          img.src = img.dataset.src;
          img.onload = () => {
            placeholder.classList.add('fade');
            observer.unobserve(entry.target);
          }
        }
      })
    };
    
    const io = new IntersectionObserver(callback);
  
    cards.forEach((card) => {
      const img = card.querySelector('img');
      io.observe(img);
    });

    // Display page
    homePage.hidden = false;
  });

  page('/read/:id', async ({ params: { id } }) => {
    const Read = (await import('./views/Read.js')).default;

    const read = Read;
    const result = await fetch('/data/spacex.json');
    const data = await result.json();
    
    const article = data[id];

    const { image, placeholder, content: { title, description } } = article;

    read.properties = {
      image: image,
      placeholder: placeholder,
      content: {
        title,
        description
      }
    };

    const renderedView = read.render();
    detailPage.innerHTML = '';
    detailPage.appendChild(renderedView);

    // Display page
    detailPage.hidden = false;
  });

  page();
})();
