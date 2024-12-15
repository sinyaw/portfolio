

function updateSquare() {
    const squares = document.getElementsByClassName('fit-within');
    // squares.forEach(square => {
    //     const parentWidth = square.clientWidth;
    //     square.style.height = `${parentWidth}px`; // 10% of parent's width
    // })


    for (let i = 0; i < squares.length; i++) {
        let ele = squares.item(i);
        const width = ele.parentElement.clientWidth;
        const height = ele.parentElement.clientHeight;
        console.log("check: "+ele.id);
        if (width <= height) {
            ele.style.width = `${width}px`;
            ele.style.height = `${width}px`;
        } else {
            ele.style.width = `${height}px`;
            ele.style.height = `${height}px`;
        }
    }
}

// Initial setup
// updateSquare();

// Update on resize
window.addEventListener('resize', updateSquare);