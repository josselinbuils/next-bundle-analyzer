import { render } from 'preact';
import { Client } from './Client';
import './global.scss';
import { computeTreeData } from './utils/computeTreeData';

const data = computeTreeData((window as any).buildStats);

render(<Client data={data} />, document.body);
