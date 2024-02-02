const toggleFontStyle = () => {
  const body = document.body;

  // Toggle between 'Arial' and 'SansSerif' for the body
  body.classList.toggle('Arial');
  const isArialEnabled = body.classList.contains('Arial');

  // Apply the font class to the p and all header elements
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((p) => p.classList.toggle('Arial', isArialEnabled));
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headers.forEach((header) => header.classList.toggle('Arial', isArialEnabled));

  // Trigger an event or execute a callback to inform
  // other parts of your application about the font change
  // For simplicity, let's use a custom event
  document.dispatchEvent(new CustomEvent(
      'fontToggled', {detail: isArialEnabled ? 'Arial' : 'SansSerif'}),
  );
};

const getCurrentFontStyle = () => {
  const body = document.body;
  return body.classList.contains('Arial') ? 'Arial' : 'SansSerif';
};

export {toggleFontStyle, getCurrentFontStyle};
