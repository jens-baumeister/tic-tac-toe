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

function init() {
    render();
}

function render() {
    let html = '<table>';

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
                html += '<td></td>';
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