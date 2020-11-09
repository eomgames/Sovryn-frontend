/**
 *
 * SwapTradeForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@blueprintjs/core';
import { FieldGroup } from '../../components/FieldGroup';
import { FormSelect } from '../../components/FormSelect';
import { AmountField } from '../AmountField';
import { weiTo18, weiToFixed } from '../../../utils/blockchain/math-helpers';
import { TradeButton } from '../../components/TradeButton';
import { Asset } from '../../../types/asset';
import { useWeiAmount } from '../../hooks/useWeiAmount';
import { useIsConnected } from '../../hooks/useAccount';
import { translations } from 'locales/i18n';
import { DummyField } from '../../components/DummyField';
import { LoadableValue } from '../../components/LoadableValue';
import { useCacheCallWithValue } from '../../hooks/useCacheCallWithValue';
import { AssetsDictionary } from '../../../utils/blockchain/assets-dictionary';
import { useSwapNetwork_conversionPath } from '../../hooks/swap-network/useSwapNetwork_conversionPath';
import { useSwapNetwork_rateByPath } from '../../hooks/swap-network/useSwapNetwork_rateByPath';
import { useSwapNetwork_approveAndConvertByPath } from '../../hooks/swap-network/useSwapNetwork_approveAndConvertByPath';
import { SendTxProgress } from '../../components/SendTxProgress';
import { AssetWalletBalance } from '../../components/AssetWalletBalance';
import { useAssetBalanceOf } from '../../hooks/useAssetBalanceOf';

const s = translations.swapTradeForm;

function tokenAddress(asset: Asset) {
  return AssetsDictionary.get(asset).getTokenContractAddress();
}

interface Props {}

const color = 'var(--teal)';

export function SwapTradeForm(props: Props) {
  const { t } = useTranslation();
  const isConnected = useIsConnected();

  const [amount, setAmount] = useState('');
  const [sourceToken, setSourceToken] = useState(Asset.DOC);
  const [targetToken, setTargetToken] = useState(Asset.BTC);
  const [sourceOptions, setSourceOptions] = useState<any[]>([]);
  const [targetOptions, setTargetOptions] = useState<any[]>([]);

  const weiAmount = useWeiAmount(amount);

  const { value: tokens } = useCacheCallWithValue(
    'converterRegistry',
    'getConvertibleTokens',
    [],
  );

  useEffect(() => {
    const newOptions = tokens.map(item => {
      const asset = AssetsDictionary.getByTokenContractAddress(item);
      return {
        key: asset.asset,
        label: asset.symbol,
      };
    });
    setSourceOptions(newOptions);

    if (
      !newOptions.find(item => item.key === sourceToken) &&
      newOptions.length
    ) {
      setSourceToken(newOptions[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, targetToken]);

  useEffect(() => {
    const newOptions = tokens.map(item => {
      const asset = AssetsDictionary.getByTokenContractAddress(item);
      return {
        key: asset.asset,
        label: asset.symbol,
      };
    });
    setTargetOptions(newOptions);

    if (
      !newOptions.find(item => item.key === targetToken) &&
      newOptions.length
    ) {
      setTargetToken(newOptions[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, sourceToken]);

  const { value: path } = useSwapNetwork_conversionPath(
    tokenAddress(sourceToken),
    tokenAddress(targetToken),
  );

  const { value: rateByPath, loading } = useSwapNetwork_rateByPath(
    path,
    weiAmount,
  );

  const { send, ...tx } = useSwapNetwork_approveAndConvertByPath(
    path,
    weiAmount,
    rateByPath,
  );

  const { value: tokenBalance } = useAssetBalanceOf(sourceToken);

  return (
    <>
      <FieldGroup label={t(s.fields.send)} labelColor={color}>
        <div className="row">
          <div className="col-8">
            <AmountField
              onChange={value => setAmount(value)}
              onMaxClicked={() => setAmount(weiTo18(tokenBalance))}
              value={amount}
            />
          </div>
          <div className="col-4">
            <FormSelect
              onChange={value => setSourceToken(value.key)}
              placeholder={t(s.fields.currency_placeholder)}
              value={sourceToken}
              items={sourceOptions}
            />
          </div>
        </div>
      </FieldGroup>

      <div className="d-flex justify-content-center align-items-center py-2">
        <Icon icon="arrow-down" />
      </div>

      <FieldGroup label={t(s.fields.receive)} labelColor={color}>
        <div className="row">
          <div className="col-8">
            <DummyField>
              <LoadableValue
                value={<>{weiToFixed(rateByPath, 8)}</>}
                loading={loading}
              />
            </DummyField>
          </div>
          <div className="col-4">
            <FormSelect
              onChange={value => setTargetToken(value.key)}
              placeholder={t(s.fields.currency_placeholder)}
              value={targetToken}
              items={targetOptions}
            />
          </div>
        </div>
      </FieldGroup>

      <SendTxProgress {...tx} displayAbsolute={false} />

      <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">
        <div className="mb-3 mb-lg-0">
          <AssetWalletBalance asset={sourceToken} />
        </div>
        <TradeButton
          text={t(s.buttons.submit)}
          onClick={() => send()}
          disabled={
            !isConnected || tx.loading || amount <= '0' || rateByPath <= '0'
          }
          loading={tx.loading}
          textColor={color}
        />
      </div>
    </>
  );
}
