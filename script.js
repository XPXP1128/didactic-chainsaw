function enterSurprise() {
  document.getElementById('notification').classList.add('hidden');
  document.getElementById('surprise').classList.remove('hidden');

  // 播放背景音乐
  document.getElementById('bgm').play().catch(err => {
    console.log('播放失败：', err);
  });

  // 启动粒子动画
  document.getElementById('floatingHeartCanvas').style.display = 'block';
  startHeartAnimation();

  // 生成文字云
  generateWords();
}

function generateWords() {
  const words = [
    "520快乐宝宝","520快乐", "我爱你", "希望你天天开心", "对我好", "我的涵宝宝",
    "王艺涵", "爱你", "这是第二个520了呀", "照顾好自己", "少抽烟 好嘛", 
    "请照顾好自己", "我最爱的宝贝", "我的愿望很简单", "么幺", "对我好", "我爱你" , "mua"
  ];
  const container = document.getElementById('wordcloud');

  for (let i = 0; i < 80; i++) {
    const word = document.createElement('div');
    word.className = 'word';
    word.innerText = words[Math.floor(Math.random() * words.length)];
    word.style.left = Math.random() * 100 + 'vw';
    word.style.top = Math.random() * 100 + 'vh';
    word.style.animationDuration = 5 + Math.random() * 10 + 's';
    word.style.fontSize = 12 + Math.random() * 18 + 'px';
    container.appendChild(word);
  }
}

// 插入心形图案
document.addEventListener('DOMContentLoaded', () => {
  const surprise = document.getElementById('surprise');

  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.title = '点我让心跳加速';

  surprise.insertBefore(heart, surprise.firstChild);

  heart.addEventListener('click', () => {
    heart.style.animation = 'heartbeat 0.5s infinite';
    setTimeout(() => {
      heart.style.animation = 'heartbeat 1s infinite';
    }, 3000);
  });
});

// 粒子动画（示例简单实现）
function startHeartAnimation() {
  const canvas = document.getElementById('floatingHeartCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];

  for (let i = 0; i < 100; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: -Math.random() * 1 - 0.5,
      opacity: Math.random()
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "pink";
    ctx.beginPath();
    // 用心形公式绘制路径
    // 先移动到起点
    ctx.moveTo(x, y);
    // 画心形的左半边
    ctx.bezierCurveTo(
      x - size / 2, y - size / 2,  // 控制点1
      x - size, y + size / 3,      // 控制点2
      x, y + size                  // 终点
    );
    // 画心形的右半边
    ctx.bezierCurveTo(
      x + size, y + size / 3,
      x + size / 2, y - size / 2,
      x, y
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }  

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let heart of hearts) {
      heart.x += heart.dx;
      heart.y += heart.dy;

      if (heart.y < -10) {
        heart.y = canvas.height + 10;
        heart.x = Math.random() * canvas.width;
      }

      drawHeart(heart.x, heart.y, heart.r, heart.opacity);
    }

    requestAnimationFrame(animate);
  }

  animate();
}
