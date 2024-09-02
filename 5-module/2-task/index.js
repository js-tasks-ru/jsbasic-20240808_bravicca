function toggleText() {
  const button = document.querySelector ('.toggle-text-button');
  const textElement = document.getElementById ('text');
  button.addEventListener ('click', function () {
    if (textElement.hasAttribute ('hidden')) {
      textElement.removeAttribute ('hidden');
    } else {
      textElement.setAttribute ('hidden', true);
    }
  });// ваш код...
}
