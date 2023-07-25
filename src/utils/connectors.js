// connectors.js

import { Phantom } from 'web3-react-phantom';
import { initializeConnector } from '@web3-react/core';

const phantom = initializeConnector((actions) => new Phantom({ actions }));

const connectors = [phantom];

export default connectors;
