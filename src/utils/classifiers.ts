import { TxType } from '../store/global/transactions-store/types';

export const chains = {
  mainnet: 30,
  testnet: 31,
};

export const currentNetwork =
  String(process.env.REACT_APP_NETWORK).toLowerCase() || 'mainnet';

export const currentChainId = chains[currentNetwork];

export const blockExplorers = {
  30: 'https://explorer.rsk.co',
  31: 'https://explorer.testnet.rsk.co',
  btc_30: 'https://live.blockcypher.com/btc',
  btc_31: 'https://live.blockcypher.com/btc-testnet',
};

export const readNodes = {
  30: 'wss://mainnet.sovryn.app/ws',
  31: 'wss://testnet.sovryn.app/ws',
};

export const fastBtcApis = {
  30: 'https://fastbtc.sovryn.app/',
  31: 'https://api.test.sovryn.app/fastbtc',
};

export const databaseRpcNodes = {
  30: 'https://backend.sovryn.app/rpc',
  31: 'https://api.test.sovryn.app/rpc',
};

export const backendUrl = {
  30: 'https://backend.sovryn.app',
  31: 'https://api.test.sovryn.app',
};

export const ethGenesisAddress = '0x0000000000000000000000000000000000000000';

export const sovAnalyticsCookie = { name: 'SovAnalytics', value: 'optout' };

export const chartStorageKey = 'sovryn.charts';

export const gasLimit = {
  [TxType.TRADE]: 1750000,
  [TxType.CLOSE_WITH_SWAP]: 1000000,
  [TxType.ADD_LIQUIDITY]: 500000,
  [TxType.REMOVE_LIQUIDITY]: 650000,
  [TxType.BORROW]: 1500000,
  [TxType.CONVERT_BY_PATH]: 750000,
  [TxType.LEND]: 300000,
  [TxType.UNLEND]: 350000,
  [TxType.SALE_BUY_SOV]: 260000,
  [TxType.SOV_REIMBURSE]: 100000,
  [TxType.SOV_CONVERT]: 2700000,
  [TxType.ESCROW_SOV_DEPOSIT]: 100000,
  [TxType.LM_DEPOSIT]: 150000,
  [TxType.LOCKED_SOV_CLAIM]: 3250000,
  [TxType.ORIGINS_SALE_BUY]: 300000,
  [TxType.CONVERT_RUSDT_TO_XUSD]: 150000,
};

export const discordInvite = 'https://discord.gg/kBTNx4zjRf'; //unlimited use, no-expiry invite
