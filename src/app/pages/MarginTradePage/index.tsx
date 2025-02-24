/**
 *
 * MarginTradePage
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { translations } from 'locales/i18n';

import { reducer, sliceKey } from './slice';
import { selectMarginTradePage } from './selectors';
import { marginTradePageSaga } from './saga';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TradingPairDictionary } from '../../../utils/dictionaries/trading-pair-dictionary';

import { TradeForm } from './components/TradeForm';
import { Theme, TradingChart } from '../../components/TradingChart';
import { OpenPositionsTable } from './components/OpenPositionsTable';
import { useIsConnected } from '../../hooks/useAccount';
import { TradingHistory } from './components/TradingHistory';
import { NotificationForm } from '../../components/NotificationForm/NotificationFormContainer';

interface Props {}

export function MarginTradePage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: marginTradePageSaga });

  const { pairType } = useSelector(selectMarginTradePage);
  const { t } = useTranslation();

  const pair = TradingPairDictionary.get(pairType);

  const connected = useIsConnected();

  return (
    <>
      <Helmet>
        <title>{t(translations.marginTradePage.meta.title)}</title>
        <meta
          name="description"
          content={t(translations.marginTradePage.meta.description)}
        />
      </Helmet>
      <Header />
      <div className="tw-container tw-mt-9 tw-mx-auto tw-px-6">
        <div className="tw-flex tw-flex-col xl:tw-flex-row xl:tw-justify-between tw-max-w-full">
          <div
            className={
              'tw-flex-shrink tw-flex-grow tw-mb-12 tw-max-w-none xl:tw-pr-4 xl:tw-mb-0 xl:tw-max-w-68 2xl:tw-max-w-75 3xl:tw-max-w-80'
            }
          >
            <TradingChart symbol={pair.chartSymbol} theme={Theme.DARK} />
          </div>
          <TradeForm />
        </div>

        {connected && (
          <>
            <article className="tw-w-full tw-mt-10">
              <h1 className="tw-text-base tw-normal-case tw-font-normal tw-mb-2 tw-pl-5">
                {t(translations.marginTradePage.openPositions)}
                <NotificationForm className="tw-ml-2 tw-inline-block" />
              </h1>
              <div className="tw-px-5 tw-pb-5 tw-border tw-border-white tw-rounded-lg">
                <OpenPositionsTable />
              </div>
            </article>

            <article className="tw-w-full tw-mt-24 tw-px-5">
              <h1 className="tw-text-base tw-normal-case tw-font-normal tw-mb-2 tw-pl-5">
                {t(translations.marginTradePage.tradingHistory)}
              </h1>
              <TradingHistory />
            </article>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
