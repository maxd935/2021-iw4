function html(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}

export default {
  properties: {
    image: null,
    placeholder: null,
    content: {},
    idx: null
  },

  render() {
    if (!document.head.querySelector('link#card')) {
      const link = document.createElement('link');
      link.id = 'card';
      link.rel = 'stylesheet';
      link.href = '/components/card.css';
      link.onload = () => {
        document.dispatchEvent(new CustomEvent('card-mounted'));
      };
      document.head.appendChild(link);
    }
    console.log(this.properties);
    const template = document.createElement('div');
    template.innerHTML = html`
      <a class="card" href="/read/${this.properties.idx.toString()}">
        <article>
          <header>
            <figure>
              <div class="placeholder" style="background-image: url(${this.properties.placeholder})"></div>
              <img src="" alt="${this.properties.content.title}" data-src="${this.properties.image}">
            </figure>
          </header>
          <main>
            <h1>${this.properties.content.title}</h1>
            <p>${this.properties.content.description}</p>
          </main>
        </article>
      </a>
    `;
    const card = template.querySelector('.card');
    // card.querySelector('img').onload = function() {
    //   card.querySelector('.placeholder').classList.add('fade');
    // }
    return card;
  }
};
