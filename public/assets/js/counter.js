// let bar = [];
// for (let i = 0; i <= 20; i++) {
//     bar.push(`hello ${i}`)
//     console.log(bar);
// }
const counters = document.querySelectorAll('.count');
const speed = 100;

counters.forEach((counter) => {

    const countUpdate = () => {
        const target = parseInt(counter.getAttribute("data-target"));
        const count = parseInt(counter.innerText);
        const increment = Math.trunc(target / speed + 1);

        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(countUpdate, 1);
        } else {
            count.innerText = target;
        }
    };
    countUpdate();
});

