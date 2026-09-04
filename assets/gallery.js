const reelProjects = [
  ['PG8WKKEPhNQ', 'https://youtube.com/shorts/PG8WKKEPhNQ?si=cBC2GqAzMcBsSo6I'],
  ['VMLtavG5mXU', 'https://youtube.com/shorts/VMLtavG5mXU?si=gBkZ33CQZXMVcfrD'],
  ['Mc6FhAX66EQ', 'https://youtube.com/shorts/Mc6FhAX66EQ?si=r7Iyx92esAp1TAEc'],
  ['JnCwyD_KBHc', 'https://youtube.com/shorts/JnCwyD_KBHc?si=IPBxy-UWPyPsALKq'],
  ['C4DKtWh1edQ', 'https://youtube.com/shorts/C4DKtWh1edQ?si=exYXr5vqNfu2S8oa'],
  ['1LkAkyrdFvM', 'https://www.youtube.com/shorts/1LkAkyrdFvM'],
  ['_cpspMHOo2I', 'https://www.youtube.com/shorts/_cpspMHOo2I'],
  ['OxNz9zCn9CA', 'https://youtube.com/shorts/OxNz9zCn9CA?si=qrqkYbpH8RxosQZz'],
  ['dFtq6QlcOJU', 'https://youtube.com/shorts/dFtq6QlcOJU?si=zwllMzV-jEULBlCu'],
  ['WZdLW5rU0Ak', 'https://youtube.com/shorts/WZdLW5rU0Ak?si=y2XYfP0O82fMpG8a'],
  ['moOnvPg2eQQ', 'https://youtube.com/shorts/moOnvPg2eQQ?si=vbT0B-WP8jUZezY-']
];

const longProjects = [
  ['XsXN_KSTZUE', 'https://youtu.be/XsXN_KSTZUE?si=34cjE6gZQpIakSXN'],
  ['PtGxCyKWoyc', 'https://youtu.be/PtGxCyKWoyc?si=m26o21nENQ-KLZYS'],
  ['jSwI1sLjiNo', 'https://youtu.be/jSwI1sLjiNo?si=yheXkYUG4ClDoerW'],
  ['rPrJmcNbTEM', 'https://youtu.be/rPrJmcNbTEM?si=DePfkgwg2VWUBhw2'],
  ['yKVrPG0KDGw', 'https://youtu.be/yKVrPG0KDGw?si=a6lWJonKV2PAM5wA'],
  ['gahXQxj15J0', 'https://youtu.be/gahXQxj15J0?si=BcasqmXfao0JhxX0'],
  ['EG3IRKcneBY', 'https://youtu.be/EG3IRKcneBY?si=l6DwGICiGRQKD9SO'],
  ['FGzgZiNWUQ0', 'https://youtu.be/FGzgZiNWUQ0?si=olg4FcNeQIOsiuzy'],
  ['BdfB0S0BeVU', 'https://youtu.be/BdfB0S0BeVU?si=yhYska1j2FXDFkjP'],
  ['SD7wUD7LDj4', 'https://youtu.be/SD7wUD7LDj4?si=ORUXK7NjqJj6FQu1'],
  ['liBGgbLym3s', 'https://youtu.be/liBGgbLym3s?si=aW0WNtft5LM1_bRu'],
  ['abVpswkdsSY', 'https://youtu.be/abVpswkdsSY?si=EoNo-HEerDQDK5OK'],
  ['OkBHqjN6rRM', 'https://youtu.be/OkBHqjN6rRM?si=SumeOHNERypmG1Uv'],
  ['1-fAV4KTVmg', 'https://youtu.be/1-fAV4KTVmg?si=Tx_X9JKYiJz4EkmJ'],
  ['pBv2bnPbAkQ', 'https://youtu.be/pBv2bnPbAkQ?si=lVswyDiq0fyAnBOv'],
  ['jv030EMj5HY', 'https://youtu.be/jv030EMj5HY?si=Au_pNASd3dW6tYXx'],
  ['W4i_ItCMOW4', 'https://youtu.be/W4i_ItCMOW4?si=3zdjwZ1nFHtqE_Eu'],
  ['pWtRfuCOuJ8', 'https://youtu.be/pWtRfuCOuJ8?si=a6ggtaJZXtUYIB5y'],
  ['hZdMTHQ2Ki4', 'https://youtu.be/hZdMTHQ2Ki4?si=WI6EztuXXf6GiqzV'],
  ['q62EvhFHC58', 'https://youtu.be/q62EvhFHC58?si=xpO9X5wfKSgDRGzw'],
  ['rRLf6JH_fR4', 'https://youtu.be/rRLf6JH_fR4?si=w9h8u7xN3mtl0CRW'],
  ['KBtUl9Sw_gE', 'https://youtu.be/KBtUl9Sw_gE?si=TXYTiBKea_3zDUEL']
];

function projectCard(project, index, format) {
  const [id, url] = project;
  const number = String(index + 1).padStart(2, '0');
  return `
    <article class="gallery-item reveal inline-video" data-video-url="${url}" tabindex="0" role="button" aria-label="Play ${format === 'SHORT' ? 'reel' : 'long format'} project ${number}">
      <div class="thumb">
        <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${format} project ${number} thumbnail" loading="lazy">
        <span class="play">▶</span><b>${format}</b>
      </div>
      <div class="meta"><h3>${format === 'SHORT' ? 'Reel' : 'Long Format'} ${number}</h3><span>›</span></div>
    </article>`;
}

const reelGrid = document.querySelector('#reels-grid');
const longGrid = document.querySelector('#long-grid');
if (reelGrid) reelGrid.innerHTML = reelProjects.map((item, index) => projectCard(item, index, 'SHORT')).join('');
if (longGrid) longGrid.innerHTML = longProjects.map((item, index) => projectCard(item, index, 'LONG')).join('');
