import fetchPolyfill from 'node-fetch';

const final = typeof fetch === 'undefined' ? fetchPolyfill : fetch;

export default final;