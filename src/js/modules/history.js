export default function () {
  const video = document.querySelector(".video");
  const play = document.querySelector(".video__play");

  if (!video || !play) return;

  const videoId = video.dataset.id;
  const vimeoHash = "7e4b7653d3"; // статический hash

  play.addEventListener("click", () => {
    video.innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${videoId}?h=${vimeoHash}&autoplay=1&muted=1"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
    `;
  });
}