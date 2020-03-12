import test from 'ava';
import {getPNGInfo} from './getPNGInfo';
import {base64} from './base64';

const png8x6 = base64.decode('iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURQAAAJkvWcxyr4QuUbl2rbROgaxEdrVbmq5PhrNWkXwlPKZEd5pDWqg+aFYxOrlamKA9a5YzYJ1DgpdRiZAmUGE9S7Zhhq1Wd29cwz8AAAABdFJOUwBA5thmAAAANklEQVQI1xXGWwKAIAgEwFVBIFLLR93/puV8DdhLwBZN/Tx2xJRzBbo0U13AfcnvTZhhENGTPiK+AYD2ttbOAAAAAElFTkSuQmCC');

test('Load an 8x6 png image', (t) => {
    const result = getPNGInfo(png8x6);
    t.deepEqual(
        result,
        {
            width: 8,
            height: 6,
            bitDepth: 8,
            colorType: 3,
            compressionMethod: 0,
            filterMethod: 0,
            interlaceMethod: 0,
        },
    );
});
