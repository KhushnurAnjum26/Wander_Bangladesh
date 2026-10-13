// Shared image links (same as the original team file)
export const images = {
  countryside: 'https://images.unsplash.com/photo-1577624060070-ca1afe89ddad?w=1600&h=900&fit=crop&auto=format',
  hills: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?w=1600&h=900&fit=crop&auto=format',
  coast: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1600&h=900&fit=crop&auto=format',
  heritage: 'https://images.unsplash.com/photo-1564034503-e7c9edcb420c?w=1600&h=900&fit=crop&auto=format',
  boats: 'https://images.unsplash.com/photo-1714418903796-addc2facacd3?w=1600&h=900&fit=crop&auto=format',
  wetlands: 'https://images.unsplash.com/photo-1599074914978-2946b69e5a4a?w=1600&h=900&fit=crop&auto=format',
  lake: 'https://images.unsplash.com/photo-1549300461-11c5b94e8855?w=1600&h=900&fit=crop&auto=format',
  dhaka: 'https://images.unsplash.com/photo-1706640254398-3b04782e8c76?w=1600&h=900&fit=crop&auto=format',
  mosque: 'https://images.unsplash.com/photo-1667069254957-bf6961fd3fb5?w=1600&h=900&fit=crop&auto=format',
  tea: 'https://images.unsplash.com/photo-1706444326115-6a659b5cfda5?w=1600&h=900&fit=crop&auto=format',
  forest: 'https://images.unsplash.com/photo-1781967204168-ec8e3d68c16f?w=1600&h=900&fit=crop&auto=format',
};

// Photos for the newer Khulna places.
// Each one reuses a shared photo above for now. To use a real photo of the place, replace the images.xxx value
// with its link (https://...) or with a file you put in the public folder (for example '/places/lalakhal.jpg').
Object.assign(images, {
  // Khulna
  hironpoint: images.forest,
  rabindra: images.heritage,
});
