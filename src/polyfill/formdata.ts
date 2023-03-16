import { FormData as FormDataPolyfill } from 'node-fetch';

const final = typeof FormData === 'undefined' ? FormDataPolyfill : FormData;

export default final;
