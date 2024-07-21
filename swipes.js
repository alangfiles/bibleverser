
function startSwipe(event) {
    let card = event.currentTarget;
    let startX = event.clientX || event.touches[0].clientX;
    let startY = event.clientY || event.touches[0].clientY;

    function onSwipe(event) {
        let currentX = event.clientX || event.touches[0].clientX;
        let currentY = event.clientY || event.touches[0].clientY;
        let diffX = currentX - startX;
        let diffY = currentY - startY;

        card.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${diffX / 10}deg)`;
    }

    function endSwipe() {
        let diffX = parseInt(card.style.transform.match(/translate\((.*)px/)[1]);
        if (Math.abs(diffX) > 100) {
            card.style.transition = 'transform 0.3s, opacity 0.3s';
            card.style.transform += ` translateX(${diffX > 0 ? 500 : -500}px)`;
            card.style.opacity = '0';
            card.removeEventListener('mousemove', onSwipe);
            card.removeEventListener('touchmove', onSwipe);
            card.removeEventListener('mouseup', endSwipe);
            card.removeEventListener('touchend', endSwipe);

            showRandomSentence();
              card.style.transition = 'transform 0.3s';
              card.style.transform = 'translate(0, 0) rotate(0)';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 300);
        } else {
            card.style.transition = 'transform 0.3s';
            card.style.transform = 'translate(0, 0) rotate(0)';
        }
    }

    card.addEventListener('mousemove', onSwipe);
    card.addEventListener('touchmove', onSwipe);
    card.addEventListener('mouseup', endSwipe);
    card.addEventListener('touchend', endSwipe);
}
