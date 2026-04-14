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
                html += '<td>o</td>';
            } else if (value === 'cross') {
                html += '<td>x</td>';
            } else {
                html += '<td></td>';
            }
        }

        html += '</tr>';
    }

    html += '</table>';

    document.getElementById('content').innerHTML = html;
}