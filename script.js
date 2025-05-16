document.addEventListener("DOMContentLoaded", function () {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  // Create rain effect
  function createRain() {
    const rainContainer = document.getElementById("rain");
    const rainCount = 100;

    for (let i = 0; i < rainCount; i++) {
      const rainDrop = document.createElement("div");
      rainDrop.classList.add("rain-drop");

      // Random properties for each rain drop
      const left = Math.random() * 100;
      const height = Math.random() * 20 + 10;
      const animationDuration = Math.random() * 0.5 + 0.5;
      const animationDelay = Math.random() * 2;

      rainDrop.style.left = `${left}%`;
      rainDrop.style.height = `${height}px`;
      rainDrop.style.animationDuration = `${animationDuration}s`;
      rainDrop.style.animationDelay = `${animationDelay}s`;

      rainContainer.appendChild(rainDrop);
    }
  }

  // Create falling leaves
  function createLeaves() {
    const leafCount = 10;

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.classList.add("leaf");

      // Random properties for each leaf
      const left = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const animationDuration = Math.random() * 10 + 10;
      const animationDelay = Math.random() * 5;
      const rotation = Math.random() * 360;

      leaf.style.left = `${left}%`;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.animationDuration = `${animationDuration}s`;
      leaf.style.animationDelay = `${animationDelay}s`;
      leaf.style.transform = `rotate(${rotation}deg)`;

      document.body.appendChild(leaf);
    }
  }

  // Initialize Typed.js
  new Typed(".typed", {
    strings: [
      '"Zielone światła w deszczu"',
      '"Liście tańczą z wiatrem"',
      '"Natura i technologia"',
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: false,
  });

  // Initialize WaveSurfer.js
  const wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "rgba(78, 205, 196, 0.5)",
    progressColor: "rgba(138, 196, 161, 0.8)",
    cursorColor: "transparent",
    barWidth: 2,
    barRadius: 3,
    barGap: 2,
    height: 40,
    responsive: true,
  });

  wavesurfer.load("enzo.mp3");

  // Play button functionality
  const playBtn = document.querySelector(".play-btn");
  const audio = document.getElementById("audio-track");
  const timecode = document.querySelector(".timecode");

  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      wavesurfer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      wavesurfer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Update timecode
  audio.addEventListener("timeupdate", function () {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    timecode.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });

  // Lyrics highlighting
  const lyricsHighlights = document.querySelectorAll(".lyrics-highlight");
  const visualizer = document.getElementById("lyrics-visualizer");

  lyricsHighlights.forEach((highlight) => {
    highlight.addEventListener("click", function () {
      const time = parseFloat(this.getAttribute("data-time"));
      audio.currentTime = time;
      if (audio.paused) {
        audio.play();
        wavesurfer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }

      // Update active highlight
      lyricsHighlights.forEach((h) => h.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Animate stats counting
  const statValues = document.querySelectorAll(".stat-value");
  const statsSection = document.querySelector(".hero-stats");

  const animateStats = () => {
    statValues.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);

        if (current >= target) {
          stat.textContent = target.toLocaleString();
          clearInterval(timer);
        }
      }, 20);
    });
  };

  // Intersection Observer for stats animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);

  // Gear slider functionality
  const sliderTrack = document.querySelector(".slider-track");
  const sliderItems = document.querySelectorAll(".slider-item");
  const sliderPrev = document.querySelector(".slider-prev");
  const sliderNext = document.querySelector(".slider-next");
  const sliderDots = document.querySelector(".slider-dots");

  // Create dots
  sliderItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    sliderDots.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

  let currentSlide = 0;

  const goToSlide = (index) => {
    sliderTrack.scrollTo({
      left: sliderItems[index].offsetLeft,
      behavior: "smooth",
    });
    currentSlide = index;
    updateDots();
  };

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  };

  sliderPrev.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
    goToSlide(currentSlide);
  });

  sliderNext.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % sliderItems.length;
    goToSlide(currentSlide);
  });

  // Auto-play videos on hover
  const vibeCards = document.querySelectorAll(".vibe-card");

  vibeCards.forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // Audio visualizer
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  visualizer.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = visualizer.offsetWidth;
    canvas.height = visualizer.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const drawVisualizer = () => {
    requestAnimationFrame(drawVisualizer);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(78, 205, 196, 0.8)");
    gradient.addColorStop(0.5, "rgba(138, 196, 161, 0.6)");
    gradient.addColorStop(1, "rgba(85, 98, 112, 0.4)");

    ctx.fillStyle = gradient;

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

      // Draw bars with rounded tops
      ctx.beginPath();
      ctx.moveTo(x, canvas.height);
      ctx.lineTo(x, canvas.height - barHeight + 5);
      ctx.quadraticCurveTo(
        x + barWidth / 2,
        canvas.height - barHeight,
        x + barWidth,
        canvas.height - barHeight + 5
      );
      ctx.lineTo(x + barWidth, canvas.height);
      ctx.closePath();
      ctx.fill();

      x += barWidth + 2;
    }
  };

  audio.addEventListener("play", () => {
    audioContext.resume().then(() => {
      drawVisualizer();
    });
  });

  // Create rain and leaves when page loads
  createRain();
  createLeaves();

  // Update scroll when content changes
  scroll.update();
});
