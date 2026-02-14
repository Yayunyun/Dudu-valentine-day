const celebrateImages = [
    "gif/Screen Shot 2026-02-13 at 9.47.06 PM.png",  // First Yes click (before any tease)
    "gif/secondyes.jpg",  // Second Yes click (1st tease message)
    "gif/JPEG image-40F3-BABA-D8-0.jpg",  // Third Yes click (2nd tease message)
    "gif/JPEG image-440F-85B0-A8-0.jpg"   // Fourth+ Yes click (3rd+ tease messages)
]

let musicPlaying = false

window.addEventListener('load', () => {
    // Get the yes tease count from the URL
    const params = new URLSearchParams(window.location.search)
    let yesTease = parseInt(params.get('yesTease')) || 0

    // Clamp to available images (max is 3, so celebrateImages[3])
    yesTease = Math.min(yesTease, celebrateImages.length - 1)

    // Set the celebration image
    document.getElementById('cat-gif').src = celebrateImages[yesTease]

    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => { })
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}