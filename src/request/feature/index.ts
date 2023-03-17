import { HeadersFeature } from './headers';
import { DataFeature } from './data';
import { FormFeature } from './form';
import { MethodFeature } from './method';
import { SignalFeature } from './signal';
import { Feature } from '..';

const features = [
    new HeadersFeature(),
    new DataFeature(),
    new FormFeature(),
    new MethodFeature(),
    new SignalFeature(),
];

export default async function requestFeature(fn: (feature: Feature) => Promise<void>) {
    for (const feature of features) {
        await fn(feature);
    }
}