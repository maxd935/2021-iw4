import Card from './components/Card.js';

(async () => {
  const app = document.querySelector('#app');

  const skeleton = app.querySelector('.skeleton');
  const content = app.querySelector('.content');

  const result = await fetch('/data/spacex.json');
  const data = await result.json();

  document.addEventListener('card-mounted', () => {
    skeleton.hidden = true;
    content.hidden = false;
  }, { once: true });

  const cards = data.map(({ image, placeholder, content: { title, description } }) => {
    const card = Card;
    card.properties = {
      image: image,
      placeholder: placeholder,
      content: {
        title,
        description
      }
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
})();
