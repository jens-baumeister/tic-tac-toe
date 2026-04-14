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