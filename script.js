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

// Update scroll when content changes
scroll.update();

// Initialize Particles.js
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ff003c",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f0ff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// Initialize Typed.js
new Typed(".typed", {
  strings: [
    '"Chcę być jak Enzo Ferrari"',
    '"Tańcz mi w Ferrari"',
    '"Wysadzę chaina w brylantach"',
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: false,
});

// Initialize WaveSurfer.js
const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#00f0ff",
  progressColor: "#ff003c",
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
canvas.width = visualizer.offsetWidth;
canvas.height = visualizer.offsetHeight;
const ctx = canvas.getContext("2d");
visualizer.appendChild(canvas);

const drawVisualizer = () => {
  requestAnimationFrame(drawVisualizer);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#ff003c");
    gradient.addColorStop(1, "#00f0ff");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 2;
  }
};

audio.addEventListener("play", () => {
  audioContext.resume().then(() => {
    drawVisualizer();
  });
});

// Parallax effect for Ferrari in hero
scroll.on("scroll", (args) => {
  const ferrari = document.querySelector(".ferrari-3d");
  if (ferrari) {
    ferrari.style.transform = `translateX(${args.scroll.y * 0.3}px)`;
  }
});

// Resize events
window.addEventListener("resize", () => {
  scroll.update();
  canvas.width = visualizer.offsetWidth;
  canvas.height = visualizer.offsetHeight;
});
