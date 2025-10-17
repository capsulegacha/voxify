document.addEventListener('DOMContentLoaded', () => {
    // === ELEMEN DOM ===
    const micBtn = document.getElementById('mic-btn');
    const statusLogo = document.getElementById('status-logo');
    const statusTitle = document.getElementById('status-title');
    const statusSubtitle = document.getElementById('status-subtitle');
    const bpmValue = document.getElementById('bpm-value');
    const canvas = document.getElementById('waveformCanvas');
    const ctx = canvas.getContext('2d');

    // === STATE APLIKASI ===
    let isRecording = false;
    let timerInterval = null;
    let secondsElapsed = 0;
    const TOTAL_SECONDS = 10;
    let animationFrameId = null;

    // === LOGIKA WAVEFORM (PULSE) ===
    let time = 0;
    function drawWaveform() {
        // Atur ukuran canvas sesuai display
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const centerY = canvas.height / 2;
        
        if (isRecording) {
            // Gambar gelombang sinus yang bergerak
            for (let x = 0; x < canvas.width; x++) {
                const angle = (x / 50) + time;
                const y = centerY + Math.sin(angle) * 20 * (Math.random() * 0.5 + 0.5); // Amplitudo acak
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            time += 0.1; // Kecepatan gelombang
        } else {
            // Gambar garis lurus
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
        }
        
        ctx.stroke();
        animationFrameId = requestAnimationFrame(drawWaveform);
    }

    // === FUNGSI UTAMA ===
    function startRecording() {
        isRecording = true;
        secondsElapsed = 0;

        // Update UI
        micBtn.classList.add('active');
        // statusLogo.classList.add('active');
        statusTitle.textContent = `Measuring... (${secondsElapsed}/${TOTAL_SECONDS}s)`;
        statusSubtitle.textContent = "Breathe normally. Cough if you feel the urge.";

        // Mulai timer
        timerInterval = setInterval(() => {
            secondsElapsed++;
            statusTitle.textContent = `Measuring... (${secondsElapsed}/${TOTAL_SECONDS}s)`;

            if (secondsElapsed >= TOTAL_SECONDS) {
                stopRecording(true); // Hentikan dan redirect
            }
        }, 1000);
    }

    function stopRecording(isFinished = false) {
        isRecording = false;
        clearInterval(timerInterval);

        // Reset UI
        micBtn.classList.remove('active');
        statusLogo.classList.remove('active');
        statusTitle.textContent = 'Tap the mic to start';
        statusSubtitle.textContent = "Hold your device close to the source of breathing sound";
        bpmValue.textContent = '--';

        if (isFinished) {
            alert('Measurement complete! Redirecting to report...');
            // Arahkan ke halaman report
            window.location.href = '/report';
        }
    }

    // === EVENT LISTENER (DIPERBARUI) ===
    micBtn.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            // --- PERUBAHAN DI SINI ---
            // 1. Hentikan timer segera
            clearInterval(timerInterval);

            // 2. Buat pesan konfirmasi
            const confirmMessage = `Recording stopped after ${secondsElapsed} second(s).\n\nProcess this recording or try again?\n\n(OK = Process, Cancel = Try Again)`;

            // 3. Tampilkan dialog konfirmasi
            if (confirm(confirmMessage)) {
                // Jika pengguna klik "OK" (Lanjut Proses)
                alert('Processing your recording...');
                window.location.href = '/report';
            } else {
                // Jika pengguna klik "Cancel" (Ulang)
                // Panggil stopRecording(false) untuk mereset UI
                stopRecording(false);
            }
            // -------------------------
        }
    });
    
    // Mulai animasi (awalnya garis lurus)
    drawWaveform();
});