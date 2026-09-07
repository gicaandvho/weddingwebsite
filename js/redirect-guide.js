/* Preserve bookmarks from the former combined Guest Guide. */
(() => {
  const hash = location.hash;
  const faq = ['#faqs', '#gifts'].includes(hash);
  const outfits = ['#outfit', '#guests', '#entourage', '#men', '#women', '#party', '#colors'];
  const anchor = faq || outfits.includes(hash) ? hash : '';
  location.replace((faq ? 'faq-gifts.html' : 'outfit.html') + anchor);
})();
