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
    content: {}  
  },

  render() {
    if (!document.head.querySelector('link#read')) {
      const link = document.createElement('link');
      link.id = 'read';
      link.rel = 'stylesheet';
      link.href = '/assets/css/read.css';
      link.onload = () => {
        document.dispatchEvent(new CustomEvent('read-mounted'));
      };
      document.head.appendChild(link);
    }

    const template = document.createElement('div');
    template.innerHTML = html`
      <article>
        <figure>
          <img src="${this.properties.image}" alt="${this.properties.content.title}">
        </figure>
        <main>
          <h1>${this.properties.content.title}</h1>
          <p class="description">${this.properties.content.description}</p>
          <p class="content">${this.properties.content.text}</p>
        </main>
      </article>
    `;

    return template.querySelector('article');
  }
};
