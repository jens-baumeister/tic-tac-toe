let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'cross';

function init() {
    document.getElementById('again-btn').classList.add('hidden');
    render();
}

function render() {
    let html = `
        <div id="player-display">
            <div id="player-cross" class="${currentPlayer === 'cross' ? 'active' : 'inactive'}">
                ${createCross()}
            </div>
            <div id="player-circle" class="${currentPlayer === 'circle' ? 'active' : 'inactive'}">
                ${createCircle()}
            </div>
        </div>
        <table>
    `;

    for (let i = 0; i < 3; i++) {
        html += '<tr>';

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            if (value === 'circle') {
                html += `<td>${createCircle()}</td>`;
            } else if (value === 'cross') {
                html += `<td>${createCross()}</td>`;
            } else {
                html += `<td onclick="handleClick(${index}, this)"></td>`;
            }
        }

        html += '</tr>';
    }

    html += '</table>';

    document.getElementById('content').innerHTML = html;
}

function createCircle() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle
                cx="35"
                cy="35"
                r="30"
                stroke="#00B0EF"
                stroke-width="6"
                fill="none"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4">
                <animate
                    attributeName="stroke-dashoffset"
                    from="188.4"
                    to="0"
                    dur="0.4s"
                    fill="freeze" />
            </circle>
        </svg>
    `;
}

function createCross() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <line x1="15" y1="15" x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="56.5"
                stroke-dashoffset="56.5">
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.5"
                    to="0"
                    dur="0.2s"
                    fill="freeze" />
            </line>
            <line x1="55" y1="15" x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="56.5"
                stroke-dashoffset="56.5">
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.5"
                    to="0"
                    dur="0.2s"
                    begin="0.2s"
                    fill="freeze" />
            </line>
        </svg>
    `;
}

function handleClick(index, element) {
    if (fields[index] !== null) return;

    fields[index] = currentPlayer;

    if (currentPlayer === 'cross') {
        element.innerHTML = createCross();
        currentPlayer = 'circle';
    } else {
        element.innerHTML = createCircle();
        currentPlayer = 'cross';
    }

    element.onclick = null;

    updatePlayerDisplay();

    checkWinner();
}

function updatePlayerDisplay() {
    let cross = document.getElementById('player-cross');
    let circle = document.getElementById('player-circle');

    if (currentPlayer === 'cross') {
        cross.classList.add('active');
        cross.classList.remove('inactive');

        circle.classList.add('inactive');
        circle.classList.remove('active');
    } else {
        circle.classList.add('active');
        circle.classList.remove('inactive');

        cross.classList.add('inactive');
        cross.classList.remove('active');
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinLine(pattern);
            return fields[a];
        }
    }

    return null;
}

function drawWinLine(pattern) {
    const container = document.getElementById('content');
    const cells = container.getElementsByTagName('td');

    const first = cells[pattern[0]];
    const last = cells[pattern[2]];

    const rect1 = first.getBoundingClientRect();
    const rect2 = last.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - parentRect.left;
    const y1 = rect1.top + rect1.height / 2 - parentRect.top;
    const x2 = rect2.left + rect2.width / 2 - parentRect.left;
    const y2 = rect2.top + rect2.height / 2 - parentRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.height = '5px';
    line.style.backgroundColor = 'white';
    line.style.transform = `rotate(${angle}deg) scaleX(0)`;
    line.style.transformOrigin = '0 0';
    line.style.transition = 'transform 0.8s ease';

    container.appendChild(line);

    requestAnimationFrame(() => {
        line.style.transform = `rotate(${angle}deg) scaleX(1)`;
    });

        document.getElementById('again-btn').classList.remove('hidden');
}

function again(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    currentPlayer = 'cross';

    init();
}